// src/components/FeaturedExhibit.jsx
import React from 'react';

const FeaturedExhibit = ({ artifact }) => {
  return (
    <div className="relative w-full h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image */}
      <img src={artifact.image} alt={artifact.title} className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      {/* Darkening Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
      {/* Content */}
      <div className="relative z-20 p-4">
        <h2 className="font-[var(--font-family-serif)] text-lg md:text-xl  tracking-widest uppercase">Exhibit of the Week</h2>
        <h1 className="font-[var(--font-family-serif)] text-4xl md:text-7xl  mt-2">{artifact.title}</h1>
        <p className="mt-4 text-lg">{artifact.date}</p>
      </div>
    </div>
  );
};

export default FeaturedExhibit;