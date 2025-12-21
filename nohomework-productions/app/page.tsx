'use client';

import { useEffect, useState } from 'react';
import { films } from './constants';
import Link from 'next/link';
import { colors } from './colors';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
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
    // Auto-rotate carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    // Parallax effect
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach((element) => {
        (element as HTMLElement).style.transform = `translateY(${scrollPosition * 0.3}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [carouselSlides.length]);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Main Content */}
      <main className="relative flex-grow flex items-center justify-center bg-warm-off-white h-screen">
        
        {/* Parallax Carousel Background */}
        <div className="parallax-bg absolute inset-0 z-0 overflow-hidden">
          {carouselSlides.map((slide, index) => (
            <Link key={index} href={slide.link} className="absolute inset-0 cursor-pointer group">
              <img
                alt={slide.title}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
                src={slide.image}
              />
              {/* Slide Content Overlay */}
              <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="text-center text-white p-8 max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 transform transition-transform duration-500 group-hover:scale-105">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6 opacity-90">
                    {slide.subtitle}
                  </p>
                  <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-colors">
                    <span className="mr-2">Explore</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
          {carouselSlides.map((slide, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setCurrentSlide(index);
              }}
              className={`group flex flex-col items-center transition-all duration-300 ${
                index === currentSlide ? 'opacity-100' : 'opacity-70 hover:opacity-90'
              }`}
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-300 mb-2 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 group-hover:bg-white/70'
              }`} />
              <span className="text-xs text-white/80 group-hover:text-white transition-colors">
                {slide.title.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
        

      </main>
      
      {/* Latest News Section */}
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
                  <p className="text-gray-800">We&apos;re excited to announce our upcoming thriller project set to begin production this spring...</p>
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
      
      {/* Project Timeline Section */}
      <section className="bg-white py-20 px-4 relative z-20 overflow-hidden">
        {/* Black Construction Paper Texture */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(40, 40, 40, 0.3) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, rgba(60, 60, 60, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, rgba(30, 30, 30, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 90% 20%, rgba(50, 50, 50, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 150px 150px, 80px 80px, 120px 120px'
        }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16 text-black font-thin tracking-wide">PROJECT TIMELINE</h2>
          
          {/* Mobile-First Timeline */}
          <div className="relative">
            {/* Desktop: Horizontal Timeline */}
            <div className="hidden lg:flex justify-between items-center">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-px" style={{background: `linear-gradient(90deg, transparent 0%, ${colors.accent.primary} 20%, ${colors.accent.primary} 80%, transparent 100%)`}}></div>
              
              {films.filter(film => film.TimelinePosition).sort((a, b) => b.TimelinePosition - a.TimelinePosition).map((film, index) => {
                const isActive = film.Status === 'In Production';
                const isComplete = film.Status === 'Released' || film.Status === 'Now Showing';
                const isPreProduction = film.Status === 'In Pre-Production';
                
                return (
                  <Link key={index} href={`/film?film=${encodeURIComponent(film.name)}`} className="relative flex flex-col items-center group cursor-pointer">
                    {/* Timeline Dot */}
                    <div className={`w-6 h-6 rounded-full border-2 transition-all duration-500 group-hover:scale-125 ${
                      isComplete ? '' :
                      isActive ? 'animate-pulse' :
                      isPreProduction ? '' :
                      'bg-transparent border-gray-500'
                    }`} style={{
                      backgroundColor: film.Status === 'Now Showing' ? '#d97706' :
                                     isComplete ? colors.status.released :
                                     isActive ? '#1e40af' :
                                     isPreProduction ? '#1e40af' :
                                     'transparent',
                      borderColor: film.Status === 'Now Showing' ? '#d97706' :
                                 isComplete ? colors.status.released :
                                 isActive ? '#1e40af' :
                                 isPreProduction ? '#1e40af' :
                                 '#6b7280'
                    }}></div>
                    
                    {/* Project Info */}
                    <div className="mt-8 text-center transform transition-all duration-300 group-hover:-translate-y-2">
                      <div className="bg-gray-100 rounded-xl border border-gray-300 shadow-2xl backdrop-blur-sm w-48 h-60 flex flex-col overflow-hidden">
                        <div className="w-full h-32 overflow-hidden">
                          <img src={film.Image_src} alt={film.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <h3 className="text-black font-bold text-lg mb-1">{film.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{film.Year}</p>
                          <div className="flex flex-col gap-2">
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium`} style={{
                              backgroundColor: film.Status === 'Now Showing' ? '#d97706' :
                                             isComplete ? colors.status.released :
                                             isActive ? '#3b82f6' :
                                             isPreProduction ? '#3b82f6' :
                                             '#dc2626',
                              color: film.Status === 'Now Showing' ? '#ffffff' :
                                   isActive ? '#ffffff' :
                                   isPreProduction ? '#ffffff' :
                                   isComplete ? colors.neutral.white :
                                   colors.neutral.white
                            }}>
                              {film.Status}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile: Vertical Timeline */}
            <div className="lg:hidden space-y-8">
              {/* Connecting Line */}
              <div className="absolute left-6 top-0 bottom-0 w-px" style={{background: `linear-gradient(180deg, transparent 0%, ${colors.accent.primary} 10%, ${colors.accent.primary} 90%, transparent 100%)`}}></div>
              
              {films.filter(film => film.TimelinePosition).sort((a, b) => b.TimelinePosition - a.TimelinePosition).map((film, index) => {
                const isActive = film.Status === 'In Production';
                const isComplete = film.Status === 'Released' || film.Status === 'Now Showing';
                const isPreProduction = film.Status === 'In Pre-Production';
                
                return (
                  <Link key={index} href={`/film?film=${encodeURIComponent(film.name)}`} className="relative flex items-center group cursor-pointer">
                    {/* Timeline Dot */}
                    <div className={`w-6 h-6 rounded-full border-2 transition-all duration-500 group-hover:scale-125 mr-6 flex-shrink-0 ${
                      isComplete ? '' :
                      isActive ? 'animate-pulse' :
                      isPreProduction ? '' :
                      'bg-transparent border-gray-500'
                    }`} style={{
                      backgroundColor: film.Status === 'Now Showing' ? '#d97706' :
                                     isComplete ? colors.status.released :
                                     isActive ? '#1e40af' :
                                     isPreProduction ? '#1e40af' :
                                     'transparent',
                      borderColor: film.Status === 'Now Showing' ? '#d97706' :
                                 isComplete ? colors.status.released :
                                 isActive ? '#1e40af' :
                                 isPreProduction ? '#1e40af' :
                                 '#6b7280'
                    }}></div>
                    
                    {/* Project Info */}
                    <div className="flex-1 transform transition-all duration-300 group-hover:translate-x-2">
                      <div className="bg-gray-100 rounded-xl border border-gray-300 shadow-lg backdrop-blur-sm flex overflow-hidden">
                        <div className="w-24 h-24 flex-shrink-0">
                          <img src={film.Image_src} alt={film.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex-1">
                          <h3 className="text-black font-bold text-lg mb-1">{film.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{film.Year}</p>
                          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium`} style={{
                            backgroundColor: film.Status === 'Now Showing' ? '#d97706' :
                                           isComplete ? colors.status.released :
                                           isActive ? '#3b82f6' :
                                           isPreProduction ? '#3b82f6' :
                                           '#dc2626',
                            color: film.Status === 'Now Showing' ? '#ffffff' :
                                 isActive ? '#ffffff' :
                                 isPreProduction ? '#ffffff' :
                                 isComplete ? colors.neutral.white :
                                 colors.neutral.white
                          }}>
                            {film.Status}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Optional) */}
      <footer className="text-white p-4 mt-6 text-center bg-black">
        <p>&copy; 2025 NoHomework Productions. All rights reserved.</p>
      </footer>
    </div>
  );
}
