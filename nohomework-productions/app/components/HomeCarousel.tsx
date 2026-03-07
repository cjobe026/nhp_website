'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Article, Film } from '@/lib/firestore';

interface CarouselProps {
  articles: Article[];
  films: Film[];
}

export default function HomeCarousel({ articles, films }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const carouselSlides = articles.map(article => ({
    image: article.image,
    mobileImage: article.mobileImage,
    title: article.title,
    subtitle: article.excerpt,
    link: `/news/${article.slug}`,
    type: 'article' as const,
    year: new Date(article.date).getFullYear().toString(),
    relatedFilm: article.relatedFilm
  }));

  useEffect(() => {
    if (isPaused || carouselSlides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(interval);
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
    setTouchEnd(e.targetTouches[0].clientX);
    setIsSwiping(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    if (Math.abs(touchStart - e.targetTouches[0].clientX) > 10) {
      setIsSwiping(true);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
    } else if (isRightSwipe) {
      setCurrentSlide(prev => prev === 0 ? carouselSlides.length - 1 : prev - 1);
    }
    
    setTouchStart(0);
    setTouchEnd(0);
    setTimeout(() => setIsSwiping(false), 100);
  };

  if (carouselSlides.length === 0) return <div>Loading...</div>;

  return (
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
          const backgroundImage = slide.mobileImage 
            ? `url(${slide.mobileImage})`
            : `url(${slide.image})`;
          
          return (
            <Link
              key={index}
              href={slide.link}
              className={`absolute inset-0 transition-opacity duration-500 cursor-pointer block ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: backgroundImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: isActive ? 10 : 1,
                pointerEvents: isActive ? 'auto' : 'none'
              }}
              onClick={(e) => {
                if (isSwiping) {
                  e.preventDefault();
                }
              }}
            >
              {slide.mobileImage && (
                <>
                  <div 
                    className="absolute inset-0 lg:hidden"
                    style={{
                      backgroundImage: `url(${slide.mobileImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div 
                    className="absolute inset-0 hidden lg:block"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                </>
              )}
              
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
        
        <div className="hidden lg:block border-t border-gray-700 my-4 flex-shrink-0"></div>
        
        <div className="hidden lg:flex flex-1 flex-col justify-between min-h-0">
          <div className="flex-shrink-0 flex flex-col justify-center flex-1">
            {(() => {
              const activeSlide = carouselSlides[currentSlide];
              const relatedFilm = films.find(f => f.name === activeSlide.relatedFilm);
              
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
              return null;
            })()}
          </div>
          
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
  );
}
