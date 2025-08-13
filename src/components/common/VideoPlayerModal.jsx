
import React from 'react';
import { X } from 'lucide-react';

const VideoPlayerModal = ({ videoUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-background p-4 rounded-lg max-w-3xl w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-white">
          <X className="h-6 w-6" />
        </button>
        <video className="w-full h-full rounded-lg" src={videoUrl} controls autoPlay />
      </div>
    </div>
  );
};

export default VideoPlayerModal;
