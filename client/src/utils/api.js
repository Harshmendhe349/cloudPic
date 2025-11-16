import { API_ENDPOINTS } from '../config';

/**
 * Fetch posts from the API
 */
export const fetchPosts = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.POSTS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Generate an image using DALL-E
 */
export const generateImage = async (prompt) => {
  try {
    const response = await fetch(API_ENDPOINTS.DALLE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, photo: data.photo };
  } catch (error) {
    console.error('Error generating image:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Create a new post
 */
export const createPost = async (postData) => {
  try {
    const response = await fetch(API_ENDPOINTS.POSTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data: data.data };
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, error: error.message };
  }
};

