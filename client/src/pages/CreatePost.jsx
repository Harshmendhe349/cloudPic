import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { generateImage as generateImageAPI, createPost } from '../utils/api';
import { FormField, Loader, ImageEditor } from '../components';
import { useToast } from '../context/ToastContext';

const CreatePost = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (!form.prompt.trim()) {
      showToast('Please provide a prompt', 'error');
      return;
    }

    setGeneratingImg(true);
    const result = await generateImageAPI(form.prompt);
    
    if (result.success) {
      setForm({ ...form, photo: `data:image/jpeg;base64,${result.photo}` });
      showToast('Image generated successfully! You can now edit it if needed.', 'success');
    } else {
      showToast(result.error || 'Failed to generate image', 'error');
    }
    
    setGeneratingImg(false);
  };

  const handleEditorSave = (editedImageUrl) => {
    setForm({ ...form, photo: editedImageUrl });
    setShowEditor(false);
    showToast('Image edited successfully!', 'success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.prompt.trim() || !form.photo) {
      showToast('Please fill in all fields and generate an image', 'error');
      return;
    }

    setLoading(true);
    const result = await createPost(form);
    
    if (result.success) {
      showToast('Post shared successfully!', 'success');
      navigate('/');
    } else {
      showToast(result.error || 'Failed to share post', 'error');
    }
    
    setLoading(false);
  };

  return (
    <>
      {showEditor && form.photo && (
        <ImageEditor
          imageUrl={form.photo}
          onSave={handleEditorSave}
          onClose={() => setShowEditor(false)}
        />
      )}
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-4xl">
            Create
          </h1>
          <p className="mt-2 text-gray-600 text-base max-w-[500px]">
            Generate an imaginative image through DALL-E AI and share it with the community
          </p>
        </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-4 w-full max-w-md h-96 flex justify-center items-center overflow-hidden group hover:border-blue-400 transition-colors">
            {form.photo ? (
              <>
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowEditor(true)}
                  className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-700 shadow-lg"
                >
                  Edit Image
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={preview}
                  alt="preview"
                  className="w-32 h-32 object-contain opacity-40"
                />
                <p className="mt-4 text-gray-400 text-sm">Your generated image will appear here</p>
              </div>
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-center bg-black/60 rounded-lg backdrop-blur-sm">
                <Loader />
                <p className="mt-4 text-white font-medium">Generating your image...</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={generateImage}
            disabled={generatingImg}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg text-base w-full sm:w-auto hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generatingImg ? (
              <span className="flex items-center gap-2">
                <Loader />
                Generating...
              </span>
            ) : (
              '✨ Generate Image'
            )}
          </button>
          {form.photo && (
            <button
              type="button"
              onClick={() => setShowEditor(true)}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg text-base w-full sm:w-auto hover:shadow-lg transition-all duration-200"
            >
              🎨 Edit Image
            </button>
          )}
        </div>

        <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <p className="text-gray-700 text-sm mb-4">
            💡 <strong>Tip:</strong> Once you have created and edited the image you want, you can share it with others in the community
          </p>
          <button
            type="submit"
            disabled={loading || !form.photo}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-base w-full sm:w-auto hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader />
                Sharing...
              </span>
            ) : (
              '🚀 Share with the Community'
            )}
          </button>
        </div>
      </form>
    </section>
    </>
  );
};

export default CreatePost;