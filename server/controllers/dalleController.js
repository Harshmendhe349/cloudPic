import OpenAI from 'openai';

// Lazy initialization - only create client when needed
let openai = null;

const getOpenAIClient = () => {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not configured in environment variables');
    }
    openai = new OpenAI({
      apiKey: apiKey,
    });
  }
  return openai;
};

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }

    // Get OpenAI client (will initialize if needed)
    const client = getOpenAIClient();
    
    const aiResponse = await client.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = aiResponse.data[0].b64_json;
    res.status(200).json({ success: true, photo: image });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Handle missing API key error
    if (error.message && error.message.includes('OPENAI_API_KEY')) {
      return res.status(500).json({ 
        success: false, 
        message: 'OpenAI API key is not configured. Please set OPENAI_API_KEY in your .env file.' 
      });
    }
    
    const errorMessage = error?.response?.data?.error?.message || error?.message || 'Something went wrong';
    res.status(500).json({ success: false, message: errorMessage });
  }
};

