"use client";

import React from 'react';

const ProgressBar = ({ progress, label = "Téléchargement..." }) => {
  if (progress === 0 || progress === 100) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-purple-100 flex flex-col items-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 transition-all duration-500 scale-110">
          <svg className="w-8 h-8 text-purple-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a1 1 0 001 1h14a1 1 0 001-1v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
          </svg>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1">{label}</h3>
        <p className="text-sm text-gray-500 mb-6 font-medium">Veuillez patienter...</p>
        
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-3 relative shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress-bar-stripes_1s_linear_infinite]" />
          </div>
        </div>
        
        <div className="flex justify-between w-full">
          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-md">{progress}%</span>
          <span className="text-xs font-medium text-gray-400">Étape finale bientôt terminée</span>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes progress-bar-stripes {
          from { background-position: 1rem 0; }
          to { background-position: 0 0; }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
