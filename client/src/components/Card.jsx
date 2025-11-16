import React from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => (
  <div className="rounded-xl group relative shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
    <img
      className="w-full h-auto object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
      src={photo}
      alt={prompt}
    />
    <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent m-2 p-4 rounded-lg backdrop-blur-sm">
      <p className="text-white text-sm overflow-y-auto prompt mb-3 line-clamp-3">{prompt}</p>

      <div className="mt-3 flex justify-between items-center gap-2 pt-3 border-t border-white/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center text-white text-sm font-bold shadow-lg">
            {name[0].toUpperCase()}
          </div>
          <p className="text-white text-sm font-medium">{name}</p>
        </div>
        <button 
          type="button" 
          onClick={() => downloadImage(_id, photo)} 
          className="outline-none bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors backdrop-blur-sm"
          title="Download image"
        >
          <img src={download} alt="download" className="w-5 h-5 object-contain invert" />
        </button>
      </div>
    </div>
  </div>
);

export default Card;