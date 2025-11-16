import express from 'express';
import { generateImage } from '../controllers/dalleController.js';

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(generateImage);

export default router;