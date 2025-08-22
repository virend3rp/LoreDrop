// src/components/MuseumHeader.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "/LoreDrop.png";

const navLinks = [
  { name: "Exhibits", to: "/exhibits" },
  { name: "About", to: "/about" },
  { name: "Submit", to: "/submit" },
];

const MuseumHeader = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to) => location.pathname === to;

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:backdrop-blur"
      style={{
        background: "color-mix(in oklab, var(--bg-paper, var(--color-gallery-white)) 92%, white)",
        borderBottom: "1px solid var(--rule, #e6e6e2)",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="LoreDrop logo"
            className="h-8 w-auto transition-transform group-hover:scale-[1.02]"
          />
          <span
            className="text-base font-semibold tracking-tight"
            style={{ color: "var(--ink, var(--color-charcoal))" }}
          >
            LoreDrop
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative transition-colors"
              style={{
                color: isActive(link.to)
                  ? "var(--accent, var(--color-antique-gold))"
                  : "var(--ink-soft, rgba(15,23,42,.8))",
              }}
            >
              <span className="px-0.5">{link.name}</span>
              {/* subtle underline that animates on hover, persistent for active */}
              <span
                className={`block h-[2px] transition-transform origin-left ${
                  isActive(link.to) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
                style={{ background: "var(--accent, var(--color-antique-gold))" }}
              />
            </Link>
          ))}

          <Link
            to="/submit"
            className="rounded-full px-3 py-1.5 transition-colors"
            style={{
              border: "1px solid var(--rule, #e6e6e2)",
              color: "var(--ink, var(--color-charcoal))",
              background: "transparent",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Submit
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen((s) => !s)}
          className="md:hidden text-2xl"
          aria-label="Toggle navigation menu"
          style={{ color: "var(--ink, var(--color-charcoal))" }}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 sm:px-8 pb-4 space-y-2"
          style={{
            background: "var(--bg-paper, var(--color-gallery-white))",
            borderTop: "1px solid var(--rule, #e6e6e2)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-base"
              style={{
                color: isActive(link.to)
                  ? "var(--accent, var(--color-antique-gold))"
                  : "var(--ink, var(--color-charcoal))",
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
            style={{
              border: "1px solid var(--rule, #e6e6e2)",
              color: "var(--ink, var(--color-charcoal))",
            }}
          >
            Submit
          </Link>
        </div>
      )}
    </header>
  );
};

export default MuseumHeader;
