'use client';

import { useEffect, useState } from 'react';
import { films } from './constants';
import Link from 'next/link';
import { colors } from './colors';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const carouselSlides = [
    {
      image: '/some.png',
      title: 'Latest Production Updates',
      subtitle: 'Behind the scenes of our newest projects',
      link: '/films',
      type: 'page'
    },
    {
      image: '/donor-selection.png', 
      title: 'DONOR - Award Winner',
      subtitle: 'Experience our acclaimed short film',
      link: '/film?film=DONOR',
      type: 'film'
    },
    {
      image: '/Old-Hollywood.jpg',
      title: 'Classic Cinema Inspiration', 
      subtitle: 'Our tribute to golden age filmmaking',
      link: '/about',
      type: 'page'
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [carouselSlides.length, isPaused]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => prev === 0 ? carouselSlides.length - 1 : prev - 1);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [carouselSlides.length]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
    } else if (isRightSwipe) {
      setCurrentSlide(prev => prev === 0 ? carouselSlides.length - 1 : prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <main className="relative flex-grow bg-black h-screen pt-16 md:pt-20">
        <div className="h-full flex flex-col lg:flex-row">
          <div 
            className="flex-1 relative overflow-hidden h-64 lg:h-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {carouselSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                

                
                <div className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 text-white">
                  <h2 className="text-xl lg:text-4xl font-bold mb-1 lg:mb-2">{slide.title}</h2>
                  <p className="text-sm lg:text-lg text-gray-300 mb-1 lg:mb-2">{slide.subtitle}</p>
                  <span className="text-xs lg:text-sm text-gray-400">2024 • Film</span>
                </div>
              </div>
            ))}
            
            <button
              onClick={() => setCurrentSlide(prev => prev === 0 ? carouselSlides.length - 1 : prev - 1)}
              className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentSlide(prev => (prev + 1) % carouselSlides.length)}
              className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-80 bg-gray-900 p-4 lg:p-6">
            <h3 className="text-white text-base lg:text-lg font-semibold mb-3 lg:mb-4">Up Next</h3>
            <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3 overflow-x-auto lg:overflow-x-visible mb-6">
              {carouselSlides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`flex-shrink-0 lg:flex-shrink lg:w-full flex items-center p-2 lg:p-3 rounded-lg transition-colors text-left ${
                    index === currentSlide ? 'bg-gray-700' : 'hover:bg-gray-800'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-12 h-9 lg:w-16 lg:h-12 object-cover rounded mr-2 lg:mr-3 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-xs lg:text-sm font-medium truncate">{slide.title}</h4>
                    <p className="text-gray-400 text-xs truncate">{slide.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <h4 className="text-white text-sm font-semibold mb-4">Quick Stats</h4>
              <div className="space-y-3">

                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Films in Production</span>
                  <span className="text-white font-medium">1</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Films in Development</span>
                  <span className="text-white font-medium">1</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Films Produced</span>
                  <span className="text-white font-medium">4</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Awards Won</span>
                  <span className="text-white font-medium">12</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Years Active</span>
                  <span className="text-white font-medium">5+</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6 mt-6">
              <h4 className="text-white text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="https://www.instagram.com/nohomeworkproductions/" target="_blank" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@NoHomeworkProductions" target="_blank" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <section className="bg-white py-12 px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-black font-thin tracking-wide">LATEST NEWS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/news?article=donor-award" className="group">
              <article className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/donor-selection.png" 
                  alt="News 1" 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">DONOR Wins Best Editing Award</h3>
                  <p className="text-gray-600 text-sm mb-2">January 15, 2025</p>
                  <p className="text-gray-800">Our latest film DONOR has been recognized for outstanding editing at the Independent Film Festival...</p>
                </div>
              </article>
            </Link>
            
            <Link href="/news?article=new-project" className="group">
              <article className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/Old-Hollywood.jpg" 
                  alt="News 2" 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">New Project in Development</h3>
                  <p className="text-gray-600 text-sm mb-2">January 10, 2025</p>
                  <p className="text-gray-800">We're excited to announce our upcoming thriller project set to begin production this spring...</p>
                </div>
              </article>
            </Link>
            
            <Link href="/news?article=collect-call-bts" className="group">
              <article className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/some.png" 
                  alt="News 3" 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">Behind the Scenes: Collect Call</h3>
                  <p className="text-gray-600 text-sm mb-2">January 5, 2025</p>
                  <p className="text-gray-800">Take a look behind the scenes of our 2023 production Collect Call and the creative process...</p>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4 relative z-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-black font-thin tracking-wide">PROJECT TIMELINE</h2>
          
          <div className="relative pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-6">
              {films.filter(film => film.TimelinePosition).sort((a, b) => b.TimelinePosition - a.TimelinePosition).slice(0, 4).map((film, index) => {
                const posterPath = `/scene-photos/${film.name === 'The Present' ? 'christmas-movie' : film.name.toLowerCase().replace(' ', '-')}/poster1.${film.name === 'The Present' || film.name === 'Dead Air' || film.name === 'Donor' ? 'png' : 'jpg'}`;
                
                return (
                  <div key={index} className="relative pt-6 pb-6 max-w-56 mx-auto">
                    <div className="text-center mb-4">
                      <span className="text-2xl font-bold text-gray-800">{film.Year}</span>
                    </div>
                    
                    <Link href={`/film?film=${encodeURIComponent(film.name)}`} className="group block">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img 
                            src={posterPath} 
                            alt={film.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="p-4 text-center">
                          <div className="px-3 py-1 rounded-full text-xs font-medium inline-block" style={{
                            backgroundColor: film.Status === 'Now Showing' ? '#d97706' :
                                           film.Status === 'Released' ? '#10b981' :
                                           '#3b82f6',
                            color: '#ffffff'
                          }}>
                            {film.Status}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <footer className="text-white p-4 mt-6 text-center bg-black">
        <p>&copy; 2025 NoHomework Productions. All rights reserved.</p>
      </footer>
    </div>
  );
}