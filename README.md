# CloudPic - AI Image Generation Platform

Live Demo: https://cloud-pic.vercel.app/

A modern full-stack application for generating AI-powered images using DALL-E, with an integrated image editor and community gallery.

## Features

- 🎨 **AI Image Generation** - Generate stunning images using DALL-E AI
- ✏️ **Image Editor** - Add text overlays, customize fonts, colors, and positions using Konva.js
- 🖼️ **Community Gallery** - Browse and share generated images
- 💾 **Cloud Storage** - Images stored on Cloudinary
- 🎯 **Modern UI** - Beautiful gradient theme with smooth animations
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

## Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- React Router
- Konva.js / React-Konva (Image Editor)
- File Saver

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- OpenAI API (DALL-E)
- Cloudinary

## Project Structure

```
cloudPic/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── config/        # Configuration files
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   └── package.json
│
└── server/                # Express backend
    ├── config/           # Configuration (database, cloudinary)
    ├── controllers/      # Route controllers
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database (local or Atlas)
- OpenAI API key
- Cloudinary account

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server/` directory:
```env
PORT=8080
CLIENT_URL=http://localhost:5173

MONGODB_URI=your_mongodb_connection_string_here

OPENAI_API_KEY=your_openai_api_key_here

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the server:
```bash
npm start
```

The server will run on `http://localhost:8080`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `client/` directory:
```env
VITE_API_BASE_URL=http://localhost:8080
```

4. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:5173`

## Environment Variables

### Server (.env)
- `PORT` - Server port (default: 8080)
- `CLIENT_URL` - Frontend URL for CORS
- `MONGODB_URI` - MongoDB connection string
- `OPENAI_API_KEY` - OpenAI API key for DALL-E
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### Client (.env)
- `VITE_API_BASE_URL` - Backend API base URL

## API Endpoints

### Posts
- `GET /api/v1/post` - Get all posts
- `POST /api/v1/post` - Create a new post

### DALL-E
- `GET /api/v1/dalle` - Health check
- `POST /api/v1/dalle` - Generate image from prompt

## Usage

1. **Generate Image**: Enter a prompt and click "Generate Image"
2. **Edit Image**: After generation, click "Edit Image" to add text overlays
3. **Share**: Fill in your name and share the image with the community
4. **Browse**: View all shared images in the gallery

## Image Editor Features

- Add text overlays
- Drag and position text
- Resize and rotate text
- Change text color
- Adjust font size
- Choose from multiple font families
- Export edited image as PNG

## Development

### Running in Development Mode

**Backend:**
```bash
cd server
npm start  # Uses nodemon for auto-reload
```

**Frontend:**
```bash
cd client
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd client
npm run build
```

The built files will be in `client/dist/`

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure `CLIENT_URL` in server `.env` matches your frontend URL
2. **MongoDB Connection**: Verify your `MONGODB_URI` is correct
3. **OpenAI API Errors**: Check that your API key is valid and has credits
4. **Image Upload Failures**: Verify Cloudinary credentials are correct

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

