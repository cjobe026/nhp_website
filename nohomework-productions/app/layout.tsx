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
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
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
