// src/components/MuseumHeader.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "/LoreDrop.png";

const navLinks = [
  { name: "Exhibits", to: "/exhibits" },
  { name: "About", to: "/about" },
  // Submit is handled as a separate CTA button
];

const MuseumHeader = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (to) => location.pathname === to;

  return (
  <header
    className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:backdrop-blur nav-theme-ink nav-surface" // <- pick: nav-theme-gold | nav-theme-blue | nav-theme-ink
    style={{
      background: "var(--nav-bg)",
      borderBottom: "1px solid var(--nav-rule)",
    }}
  >
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 py-4">
      <Link to="/" className="flex items-center gap-3 group">
        <img src={logo} alt="LoreDrop logo" className="h-8 w-auto transition-transform group-hover:scale-[1.02]" />
        <span className="text-base font-semibold tracking-tight" style={{ color: "var(--nav-ink)" }}>
          LoreDrop
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-10 text-sm font-semibold">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="relative transition-colors"
            style={{ color: isActive(link.to) ? "var(--nav-accent)" : "color-mix(in oklab, var(--nav-ink) 80%, transparent)" }}
          >
            <span className="px-0.5">{link.name}</span>
            <span
              className={`block h-[2px] origin-left transition-transform ${
                isActive(link.to) ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
              }`}
              style={{ background: "var(--nav-accent)" }}
            />
          </Link>
        ))}

        {/* CTA Submit */}
        <Link
          to="/submit"
          className="rounded-full px-3 py-1.5 transition-colors"
          style={{
            border: "1px solid var(--nav-rule)",
            color: "var(--nav-ink)",
            background: "transparent",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "white")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Submit
        </Link>
      </div>

      <button
        onClick={() => setMenuOpen((s) => !s)}
        className="md:hidden text-2xl"
        aria-label="Toggle navigation menu"
        style={{ color: "var(--nav-ink)" }}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
    </nav>

    {menuOpen && (
      <div
        className="md:hidden px-6 sm:px-8 pb-4 space-y-2"
        style={{ background: "var(--nav-bg)", borderTop: "1px solid var(--nav-rule)" }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-base"
            style={{
              color: isActive(link.to) ? "var(--nav-accent)" : "var(--nav-ink)",
              fontWeight: isActive(link.to) ? 700 : 500,
            }}
          >
            {link.name}
          </Link>
        ))}
        <Link
          to="/submit"
          onClick={() => setMenuOpen(false)}
          className="inline-block rounded-full px-3 py-1.5"
          style={{ border: "1px solid var(--nav-rule)", color: "var(--nav-ink)" }}
        >
          Submit
        </Link>
      </div>
    )}
  </header>
  );
};

export default MuseumHeader;
