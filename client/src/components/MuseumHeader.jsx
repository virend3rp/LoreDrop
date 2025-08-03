// src/components/MuseumHeader.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '/LoreDrop.png';

const navLinks = [
  { name: 'Exhibits', to: '/exhibits' },
  { name: 'About', to: '/about' },
  { name: 'Submit', to: '/submit' },
];

const MuseumHeader = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-20 bg-[var(--color-gallery-white)]/90 backdrop-blur-sm border-b border-black/10 shadow-sm">
      <nav className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between font-[var(--font-family-serif)]">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group" onClick={closeMenu}>
          <img
            src={logo}
            alt="LoreDrop logo"
            className="h-14 w-auto transition-transform group-hover:scale-105"
          />
          <span className="sr-only">LoreDrop</span>
        </Link>

        {/* Desktop Nav */}
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

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-black"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-[var(--color-gallery-white)] text-lg font-[var(--font-family-serif)]">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={`block py-1 transition-colors hover:text-[var(--color-antique-gold)] ${
                location.pathname === link.to ? 'text-[var(--color-antique-gold)] font-semibold' : ''
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
