// src/components/MuseumHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MuseumHeader = () => {
  return (
    <header className="sticky top-0 z-10 bg-[var(--color-gallery-white)]/80 backdrop-blur-sm border-b border-black/10">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-[var(--font-family-serif)] text-2xl flex text-red-400 items-baseline">
              LoreDrop
        </Link>
        <div className="flex items-center space-x-8">
          <Link to="/exhibits" className="hover:text-[var(--color-antique-gold)] transition-colors">Exhibits</Link>
          <Link to="/about" className="hover:text-[var(--color-antique-gold)] transition-colors">About</Link>
          <Link to="/submit" className="hover:text-[var(--color-antique-gold)] transition-colors">Submit</Link>
        </div>
      </nav>
    </header>
  );
};

export default MuseumHeader;