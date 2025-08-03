// src/components/MuseumHeader.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '/LoreDrop.png';

const navLinks = [
  { name: 'Exhibits', to: '/exhibits' },
  { name: 'About', to: '/about' },
  { name: 'Submit', to: '/submit' },
];

const MuseumHeader = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-[var(--color-gallery-white)]/90 backdrop-blur-sm border-b border-black/10 shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center font-[var(--font-family-serif)]">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <img
            src={logo}
            alt="LoreDrop logo"
            className="h-14 w-auto transition-transform group-hover:scale-105"
          />
          <span className="sr-only">LoreDrop</span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2 font-[var(--font-family-serif)]">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block text-lg transition-colors ${
                location.pathname === link.to ? 'text-[var(--color-antique-gold)] font-semibold' : 'text-black'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default MuseumHeader;
