'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // JavaScript parallax effect
    const parallax = document.querySelector('.parallax-bg') as HTMLElement;
    
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      // Adjust the speed of the parallax effect by changing the factor (e.g., 0.5, 0.3)
      parallax.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    });
    
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Main Content */}
      <main className="relative flex-grow flex items-center justify-center bg-warm-off-white h-screen">
        
        {/* Parallax Background Image */}
        <div className="parallax-bg absolute inset-0 z-0">
          <img
            alt="Film Production"
            loading="lazy"
            decoding="async"
            style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', color: 'transparent' }}
            sizes="100vw"
            src="/some.png"
          />
        </div>
        
        {/* Text Overlay (Top-left corner) */}
        <div className="absolute top-0 left-0 p-6 md:p-12 z-10 text-white">
          <h3 className="text-md md:text-md font-bold leading-tight mb-4">
            No Homework Productions
          </h3>
          <p className="text-sml md:text-md max-w-xs md:max-w-md">
            Join us in creating the next masterpiece in film production. Experience the magic of cinema like never before.
          </p>
        </div>
      </main>
      
      {/* 3x3 Grid Layout Section with Black Background */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-8 relative z-20 bg-black">
        <div className=" p-4 text-center">
          <img
            alt="Film Production"
            loading="lazy"
            width={1200}
            height={800}
            decoding="async"
            style={{ color: 'transparent' }}
            srcSet="/donor-selection.png 1x, /donor-selection.png 2x"
            src="/donor-selection.png"
          />
        </div>
        <div className=" p-4 text-center">
          <img
            alt="Film Production"
            loading="lazy"
            width={1200}
            height={800}
            decoding="async"
            style={{ color: 'transparent' }}
            srcSet="/donor-selection.png 1x, /donor-selection.png 2x"
            src="/donor-selection.png"
          />
        </div>
        <div className="bg-gray-300 p-4 text-center">
          <h4 className="font-bold text-lg">Item 3</h4>
          <p>Description of the third item.</p>
        </div>
        <div className="bg-gray-300 p-4 text-center">
          <h4 className="font-bold text-lg">Item 4</h4>
          <p>Description of the fourth item.</p>
        </div>
        <div className="bg-gray-300 p-4 text-center">
          <h4 className="font-bold text-lg">Item 5</h4>
          <p>Description of the fifth item.</p>
        </div>
        <div className="bg-gray-300 p-4 text-center">
          <h4 className="font-bold text-lg">Item 6</h4>
          <p>Description of the sixth item.</p>
        </div>
        <div className="bg-gray-300 p-4 text-center">
          <h4 className="font-bold text-lg">Item 7</h4>
          <p>Description of the seventh item.</p>
        </div>
        <div className="bg-gray-300 p-4 text-center">
          <h4 className="font-bold text-lg">Item 8</h4>
          <p>Description of the eighth item.</p>
        </div>
        <div className="bg-gray-300 p-4 text-center">
          <h4 className="font-bold text-lg">Item 9</h4>
          <p>Description of the ninth item.</p>
        </div>
      </section>

      {/* Footer (Optional) */}
      <footer className="text-white p-4 mt-6 text-center bg-black">
        <p>&copy; 2025 NoHomework Productions. All rights reserved.</p>
      </footer>
    </div>
  );
}
