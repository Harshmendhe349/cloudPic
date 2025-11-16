import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost } from './pages';
import { Toast } from './components';
import Footer from './components/Footer';
import { ToastProvider, useToast } from './context/ToastContext';

const AppContent = () => {
  const { toast, hideToast } = useToast();

  return (
    <>
      <header className="w-full flex justify-between items-center bg-white/80 backdrop-blur-sm sm:px-8 px-4 py-4 border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-28 object-contain" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
            CloudPic
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link 
            to="/" 
            className="font-inter font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Gallery
          </Link>
          <Link 
            to="/create-post" 
            className="font-inter font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
          >
            Create
          </Link>
        </nav>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
      <Footer />
      <Toast toast={toast} onClose={hideToast} />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  </BrowserRouter>
);

export default App;