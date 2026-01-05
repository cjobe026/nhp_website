'use client';

import { useEffect, useState } from 'react';
import { films } from './constants';
import Link from 'next/link';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const carouselSlides = [

    {
      image: '/scene-photos/after/article2.png', 
      title: '"After" selected for Cinema on the Bayou Film Festival',
      subtitle: 'World premiere at Louisiana\'s longest running film festival',
      link: '/news?article=after-festival-selection',
      type: 'article',
      year: '2026'
    },
    {
      image: '/scene-photos/dead-air/article1.jpg',
      title: '"Dead Air" is a full circle moment for writer/director Trevor L. Poole', 
      subtitle: 'New Short film brings together old friends',
      link: '/news?article=dead-air-full-circle',
      type: 'article',
      year: '2025'
    },
        {
      image: '/scene-photos/donor/card.png',
      title: '"Donor" featured on The Viewfinder Podcast',
      subtitle: 'Listen to the cast and crew discuss the acclaimed film',
      link: '/news?article=donor-viewfinder-podcast',
      type: 'article',
      year: '2025'
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => prev === 0 ? carouselSlides.length - 1 : prev - 1);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [carouselSlides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
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
    
    // Reset touch values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <main className="relative flex-grow bg-black min-h-screen pt-16 md:pt-20">
        <div className="min-h-screen flex flex-col lg:flex-row lg:h-screen">
          <div 
            className="flex-1 relative overflow-hidden h-96 lg:h-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {carouselSlides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <Link
                  key={index}
                  href={slide.link}
                  className={`absolute inset-0 transition-opacity duration-500 cursor-pointer block ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: isActive ? 10 : 1,
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                  onClick={(e) => {
                    // Prevent navigation if this was a swipe gesture
                    if (Math.abs(touchStart - touchEnd) > 50) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 text-white pointer-events-none">
                    <h2 className="text-lg lg:text-4xl font-bold mb-1 lg:mb-2">{slide.title}</h2>
                    <p className="text-sm lg:text-lg text-gray-300 mb-1 lg:mb-2">{slide.subtitle}</p>
                    <span className="text-xs lg:text-sm text-gray-400">{slide.year} • Article</span>
                  </div>
                </Link>
              );
            })}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(prev => prev === 0 ? carouselSlides.length - 1 : prev - 1);
              }}
              className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20"
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
              }}
              className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20"
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="absolute bottom-4 right-4 flex space-x-2 z-20">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(index);
                  }}
                  className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-80 xl:w-96 bg-gray-900 p-3 sm:p-4 lg:p-6 flex flex-col h-auto lg:h-full overflow-hidden">
            <h3 className="text-white text-sm sm:text-base lg:text-lg font-semibold mb-2 lg:mb-4 flex-shrink-0">Up Next</h3>
            
            {/* Up Next Items */}
            <div className="flex lg:flex-col space-x-2 sm:space-x-3 lg:space-x-0 lg:space-y-2 overflow-x-auto lg:overflow-x-visible mb-0 lg:mb-4 flex-shrink-0">
              {carouselSlides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`flex-shrink-0 lg:flex-shrink lg:w-full flex items-center p-2 lg:p-3 rounded-lg transition-colors text-left min-w-[200px] sm:min-w-[240px] lg:min-w-0 ${
                    index === currentSlide ? 'bg-gray-700' : 'hover:bg-gray-800'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-10 h-8 sm:w-12 sm:h-9 lg:w-16 lg:h-12 object-cover rounded mr-2 lg:mr-3 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-xs lg:text-sm font-medium truncate">{slide.title}</h4>
                    <p className="text-gray-400 text-xs truncate">{slide.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Divider - Desktop only */}
            <div className="hidden lg:block border-t border-gray-700 my-4 flex-shrink-0"></div>
            
            {/* Content Area - Desktop only */}
            <div className="hidden lg:flex flex-1 flex-col justify-between min-h-0">
              {/* Related Film Poster */}
              <div className="flex-shrink-0 flex flex-col justify-center flex-1">
                {(() => {
                  const activeSlide = carouselSlides[currentSlide];
                  if (activeSlide.type === 'article') {
                    let relatedFilm;
                    if (activeSlide.title.includes('Donor')) {
                      relatedFilm = films.find(f => f.name === 'Donor');
                    } else if (activeSlide.title.includes('After')) {
                      relatedFilm = films.find(f => f.name === 'After');
                    } else if (activeSlide.title.includes('Dead Air') || activeSlide.title.includes('box office')) {
                      relatedFilm = films.find(f => f.name === 'Dead Air');
                    }
                    
                    if (relatedFilm) {
                      const posterPath = relatedFilm.posterPath || `/scene-photos/${relatedFilm.name.toLowerCase().replace(' ', '-')}/poster1.jpg`;
                      
                      return (
                        <Link href={`/film?film=${encodeURIComponent(relatedFilm.name)}`} className="block">
                          <div className="w-full max-w-[220px] mx-auto">
                            <img 
                              src={posterPath}
                              alt={`${relatedFilm.name} Poster`}
                              className="w-full aspect-[2/3] object-cover rounded shadow-lg hover:shadow-xl transition-shadow"
                            />
                          </div>
                          <div className="mt-3 text-center">
                            <h4 className="text-white text-base font-medium">{relatedFilm.name}</h4>
                            <p className="text-gray-400 text-sm">View Film Info</p>
                          </div>
                        </Link>
                      );
                    }
                  }
                  return null;
                })()}
              </div>
              
              {/* Follow Us Section - Desktop only */}
              <div className="flex-shrink-0 mt-auto pt-2">
                <h4 className="text-white text-sm font-semibold mb-2 text-left">Follow Us</h4>
                <div className="flex space-x-3 justify-start">
                  <a href="https://www.instagram.com/nohomeworkproductions/" target="_blank" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/nohomeworkproductions" target="_blank" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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
        </div>
      </main>
      
      <section className="bg-white py-20 px-4 relative z-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-black font-thin tracking-wide">RELEASES</h2>
          
          <div className="relative pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-6">
              {films.filter(film => film.TimelinePosition && !film.hidden).sort((a, b) => b.TimelinePosition - a.TimelinePosition).slice(0, 4).map((film, index) => {
                const posterPath = (film as typeof films[0] & { posterPath?: string }).posterPath || `/scene-photos/${film.name.toLowerCase().replace(' ', '-')}/poster1.jpg`;
                
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

      <section className="bg-gray-900 py-12 px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white font-thin tracking-wide">UPCOMING SHOWINGS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Cinema On the Bayou - After */}
            <Link href="/events" className="block h-full">
              <div className="bg-black rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-yellow-500 transition-colors h-full flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4 flex-1">
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-bold mb-2">After</h3>
                      <p className="text-gray-300 text-sm mb-1">Cinema On the Bayou Film Festival</p>
                      <p className="text-gray-400 text-sm">Lafayette, Louisiana</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-yellow-400 font-semibold">Jan 21-28</p>
                      <p className="text-gray-400 text-sm">2025</p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open('https://cinemaonthebayou.com/', '_blank');
                    }}
                    className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer self-start"
                  >
                    Festival Info
                  </button>
                </div>
              </div>
            </Link>

            {/* Robinson Theatre - NHP Presents */}
            <Link href="/events" className="block h-full">
              <div className="bg-black rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-yellow-500 transition-colors h-full flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4 flex-1">
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-bold mb-2">NHP Presents</h3>
                      <p className="text-gray-300 text-sm mb-1">Donor, After & Dead Air</p>
                      <p className="text-gray-300 text-sm mb-1">Robinson Film Center</p>
                      <p className="text-gray-400 text-sm">Shreveport, Louisiana</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-yellow-400 font-semibold">Jan 9</p>
                      <p className="text-yellow-400 text-sm">6:00 PM</p>
                      <p className="text-gray-400 text-sm">2025</p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open('https://robinsonfilmcenter.org/', '_blank');
                    }}
                    className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer self-start"
                  >
                    Theater Info
                  </button>
                </div>
              </div>
            </Link>
            
          </div>
        </div>
      </section>



      <footer className="text-white p-4 mt-6 text-center bg-black">
        <p>&copy; 2025 No Homework Productions. All rights reserved.</p>
      </footer>
    </div>
  );
}