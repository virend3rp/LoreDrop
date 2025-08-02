// src/components/MuseumHeader.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '/LoreDrop.png';

const navLinks = [
  { name: 'Exhibits', to: '/exhibits' },
  { name: 'About', to: '/about' },
  { name: 'Submit', to: '/submit' },
];

const MuseumHeader = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-20 bg-[var(--color-gallery-white)]/90 backdrop-blur-sm border-b border-black/10 shadow-sm">
      <nav className="container mx-auto px-2 md:px-6 py-3 md:py-4 flex justify-between items-center font-[var(--font-family-serif)]">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <img
            src={logo}
            alt="LoreDrop logo"
            className="h-14 w-auto transition-transform group-hover:scale-105"
          />
          <span className="sr-only">LoreDrop</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative transition-colors hover:text-[var(--color-antique-gold)] ${
                location.pathname === link.to ? 'text-[var(--color-antique-gold)] font-semibold' : ''
              }`}
            >
              {link.name}
              <span className="block h-0.5 bg-[var(--color-antique-gold)] scale-x-0 hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default MuseumHeader;
