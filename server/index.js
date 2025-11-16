import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDb from "./config/database.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://cloud-pic.vercel.app/',
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
    res.json({ message: "CloudPic API is running!" });
});

const startServer = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        await connectDb(mongoUri);
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`🚀 Server started on http://localhost:${PORT}`);
            console.log(`📡 API endpoints available at http://localhost:${PORT}/api/v1`);
        });
    } catch (error) {
        console.error('❌ Failed to connect to the database or start the server:', error);
        process.exit(1);
    }
};

startServer();

