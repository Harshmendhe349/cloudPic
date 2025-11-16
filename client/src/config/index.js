// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  POSTS: `${API_BASE_URL}/api/v1/post`,
  DALLE: `${API_BASE_URL}/api/v1/dalle`,
};

