'use client';

import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "../styles/globals.css";
import Link from 'next/link';
import { useState } from 'react';
import { colors } from './colors';

const playfair_display = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
})

// Note: metadata export must be in a non-client component
// Move this to a separate metadata file if needed

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${playfair_display.variable} antialiased`}>
        {/* Top Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
          <div className="relative flex items-center justify-center p-4 md:p-6">
            {/* Hamburger Menu Button - Left */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="absolute left-4 md:left-6 text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            {/* Logo - Center */}
            <Link href="/" className="font-bold text-xl md:text-2xl hover:opacity-80 transition-opacity" style={{color: colors.accent.primary, textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
              NHP
            </Link>
          </div>
        </nav>

        {/* Slide-in Menu */}
        <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className={`absolute left-0 top-0 h-full w-80 bg-black/90 backdrop-blur-md transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="p-8 pt-20">
              {/* Menu Items */}
              <nav className="space-y-6">
                <Link 
                  href="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white text-2xl font-light hover:text-yellow-400 transition-colors border-b border-white/10 pb-4"
                >
                  Home
                </Link>
                <Link 
                  href="/films" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white text-2xl font-light hover:text-yellow-400 transition-colors border-b border-white/10 pb-4"
                >
                  Films
                </Link>
                <Link 
                  href="/about" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white text-2xl font-light hover:text-yellow-400 transition-colors border-b border-white/10 pb-4"
                >
                  About
                </Link>
                <Link 
                  href="/gallery" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white text-2xl font-light hover:text-yellow-400 transition-colors border-b border-white/10 pb-4"
                >
                  Gallery
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white text-2xl font-light hover:text-yellow-400 transition-colors border-b border-white/10 pb-4"
                >
                  Contact
                </Link>
              </nav>
              
              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-white/60 text-sm mb-4">Follow Us</p>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/nohomeworkproductions/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/NoHomeworkProductions/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {children}
      </body>
      {/* <footer>
      <div className="container mx-auto flex justify-between items-center">
      <ul className="flex space-x-20">
        <li> 
          <ul className="flex space-x-10">
            <li> 
            dsf
            </li>
            <li> 
            dsf
            </li>
            <li> 
            dsf
            </li>
            <li> 
            dsf
            </li>
            </ul>
          </li>
        </ul>
        <p>sadfdsa</p>
        </div>
        </footer> */}
    </html>
  );
}
