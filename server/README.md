# CloudPic Server

Express.js backend for CloudPic AI Image Generation Platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=8080
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Start server:
```bash
npm start
```

## API Routes

- `GET /api/v1/post` - Get all posts
- `POST /api/v1/post` - Create post
- `POST /api/v1/dalle` - Generate image

