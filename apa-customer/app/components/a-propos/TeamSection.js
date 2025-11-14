'use client';

import React from 'react';

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Steven Parker",
      role: "Directeur Artistique",
      image: "steven1",
      cvUrl: "/cv/steven-parker.pdf"
    },
    {
      name: "Steven Strange",
      role: "Directeur Générale",
      image: "steven2",
      cvUrl: "/cv/steven-strange.pdf"
    },
    {
      name: "Peter Parker",
      role: "Responsable Marketing",
      image: "peter",
      cvUrl: "/cv/peter-parker.pdf"
    },
    {
      name: "Edith Nekesa",
      role: "Éditrice en Chef",
      image: "edith",
      cvUrl: "/cv/edith-nekesa.pdf"
    }
  ];

  // Images locales
  const imageUrls = {
    steven1: "/images/equipe/steven1.png",
    steven2: "/images/equipe/steven2.png",
    edith: "/images/equipe/edith.png",
    peter: "/images/equipe/peter.png"
  };

  const handleCvClick = (cvUrl, memberName) => {
    // Ouvrir le CV dans un nouvel onglet
    window.open(cvUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-5xl font-bold mb-4" 
            style={{ color: '#4B0082' }}
          >
            Notre équipe
          </h1>
          <p 
            className="text-xl" 
            style={{ color: '#616161' }}
          >
            Une équipe passionnée par l'éducation et la créativité.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={imageUrls[member.image]}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Info Card Overlay avec bouton Voir CV */}
                <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 text-center transition-all duration-300 group-hover:pb-20">
                  <h3 
                    className="text-xl font-bold mb-1"
                    style={{ color: '#000000' }}
                  >
                    {member.name}
                  </h3>
                  <p 
                    className="text-sm mb-2"
                    style={{ color: '#616161' }}
                  >
                    {member.role}
                  </p>
                  
                  {/* Bouton Voir CV qui apparaît au survol */}
                  <button
  onClick={() => handleCvClick(member.cvUrl, member.name)}
  className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 transform bg-primary-300 text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-300 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4"
>
  {/* File Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 3h6l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
    />
  </svg>

  Voir CV
</button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}