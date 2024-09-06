import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDb from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.get('/', (req, res) => {
    res.send("Hello World");
});
const startServer = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        console.log("Connecting to MongoDB with URI:", mongoUri); // Log the URI to verify
        await connectDb(mongoUri);
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
    } catch (error) {
        console.error('Failed to connect to the database or start the server:', error);
        process.exit(1); // Exit process with failure
    }
};

startServer();
