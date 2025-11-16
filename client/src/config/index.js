// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://cloudpic-bjw8.onrender.com/';

export const API_ENDPOINTS = {
  POSTS: `${API_BASE_URL}/api/v1/post`,
  DALLE: `${API_BASE_URL}/api/v1/dalle`,
};

