import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CloudPic
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400 text-sm">AI-Powered Image Generation</span>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CloudPic. Built with DALL-E AI
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

