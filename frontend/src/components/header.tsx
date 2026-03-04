"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#0a1628]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
    } text-white`}>
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight gradient-text">DT</span>
            <span className="hidden sm:inline text-lg font-semibold tracking-tight text-white/90">Dave Thibault</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-sm">
            <a href="#about" className="hover:text-[#0ea5e9] transition-colors">About</a>
            <a href="#expertise" className="hover:text-[#0ea5e9] transition-colors">Expertise</a>
            <a href="#writing" className="hover:text-[#0ea5e9] transition-colors">Writing</a>
            <a href="#projects" className="hover:text-[#0ea5e9] transition-colors">Projects</a>
            <a href="#connect" className="bg-gradient-to-r from-[#0ea5e9] to-[#6366f1] text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-white/10 pt-4">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#0ea5e9] transition-colors">About</a>
            <a href="#expertise" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#0ea5e9] transition-colors">Expertise</a>
            <a href="#writing" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#0ea5e9] transition-colors">Writing</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#0ea5e9] transition-colors">Projects</a>
            <a href="#connect" onClick={() => setMobileMenuOpen(false)} className="block bg-gradient-to-r from-[#0ea5e9] to-[#6366f1] text-white px-6 py-2 rounded-lg font-semibold text-center">
              Get in Touch
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
