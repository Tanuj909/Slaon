"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Scissors, Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1200px]">
      <div className="glass-nav rounded-full px-8 py-3 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-terracotta text-3xl">content_cut</span>
            <span className="text-xl font-extrabold tracking-tight text-earthy-brown font-display">LUXE</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {['Home', 'Salons', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-sm font-semibold hover:text-terracotta transition-colors text-earthy-brown font-display"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-terracotta/60 text-sm">search</span>
            <input
              className="pl-10 pr-4 py-2 bg-white/40 border-none rounded-full text-sm focus:ring-2 focus:ring-primary w-48 lg:w-64 transition-all placeholder-earthy-brown/50 font-display outline-none text-earthy-brown"
              placeholder="Search services..."
              type="text"
            />
          </div>
          <button
            className="md:hidden p-2 text-earthy-brown"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full mt-4 w-full p-4 glass-nav rounded-2xl md:hidden flex flex-col gap-4 animate-fade-in">
          {['Home', 'Salons', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="text-earthy-brown font-semibold hover:text-terracotta transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

