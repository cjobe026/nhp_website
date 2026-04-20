'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getFilms } from '../../lib/firestore';
import type { Film } from '../../lib/firestore';
import { newsArticles } from '@/lib/newsData';

function FilmPageContent() {
  const searchParams = useSearchParams();
  const filmName = searchParams.get('film');
  const [filmData, setFilmData] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPosterGallery, setShowPosterGallery] = useState(false);
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const [showDirectorsStatement, setShowDirectorsStatement] = useState(false);

  // Helper functions to extract key crew members
  const getDirector = () => (filmData as any)?.director || filmData?.Crew?.find(member => member.role.toLowerCase().includes('director') && !member.role.toLowerCase().includes('assistant'))?.name;
  const getWriter = () => (filmData as any)?.writer || filmData?.Crew?.find(member => member.role.toLowerCase().includes('writer') && !member.role.toLowerCase().includes('assistant'))?.name;
  const getTopCast = () => filmData?.Cast?.slice(0, 3) || [];
  
  // Group crew by department (unused function removed)
  // const groupCrewByDepartment = () => { ... };

  useEffect(() => {
    async function loadFilm() {
      if (filmName) {
        const allFilms = await getFilms();
        const selectedFilm = allFilms.find((f) => f.name === filmName);
        setFilmData(selectedFilm || null);
      }
      setLoading(false);
    }
    loadFilm();
  }, [filmName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 pt-24 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/films" className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Movies
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-12">{filmData.name} ({filmData.Year})</h1>
        
        {/* Media Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Video/Media - Left side (2/3 width) */}
          <div className="lg:col-span-2">
            {filmData.fullMovieLink ? (
              <iframe 
                width="100%" 
                height="500" 
                src={filmData.fullMovieLink} 
                title="Full Movie" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="w-full rounded-lg shadow-lg"
              ></iframe>
            ) : filmData.YouTubeLink ? (
              <iframe 
                width="100%" 
                height="500" 
                src={filmData.YouTubeLink} 
                title="Trailer" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="w-full rounded-lg shadow-lg"
              ></iframe>
            ) : (
              <img 
                src={filmData.Image_src}
                alt={`${filmData.name} Still`}
                className="w-full h-[500px] rounded-lg shadow-lg object-cover"
              />
            )}
          </div>
          
          {/* Poster - Right side (1/3 width) */}
          <div className="lg:col-span-1">
            <Link href={`/gallery?film=${encodeURIComponent(filmData.name)}`} className="group block relative">
              <img 
                src={(filmData as Film & { posterPath?: string }).posterPath || filmData.Image_src}
                alt={`${filmData.name} Poster`}
                className="w-full h-[500px] object-fill rounded-lg shadow-xl group-hover:opacity-80 transition-opacity cursor-pointer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center rounded-lg">
                <span className="text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Gallery
                </span>
              </div>
            </Link>
          </div>
        </div>
          
        {/* Film Details & Key Personnel */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          {/* Synopsis */}
          {filmData.Synopsis && (
            <div>
              <h3 className="text-2xl font-semibold mb-3">Synopsis</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{filmData.Synopsis}</p>
            </div>
          )}
          
          {/* Genres */}
          {filmData.Genres && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Genres</h4>
              <div className="flex flex-wrap gap-2">
                {filmData.Genres.map((genre, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">{genre}</span>
                ))}
              </div>
            </div>
          )}
          
          {/* Key Personnel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getDirector() && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Director</h4>
                <p className="text-gray-700">{getDirector()}</p>
              </div>
            )}
            {getWriter() && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Writer</h4>
                <p className="text-gray-700">{getWriter()}</p>
              </div>
            )}
            {getTopCast().length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Top Cast</h4>
                <div className="space-y-1">
                  {getTopCast().map((actor, index) => (
                    <p key={index} className="text-gray-700 text-sm">
                      {actor.name} {actor.character && `as ${actor.character}`}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Director's Statement */}
        {(filmData as Film & { directorsStatement?: string }).directorsStatement && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setShowDirectorsStatement(!showDirectorsStatement)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {showDirectorsStatement ? 'Hide Director\'s Statement' : 'Read Director\'s Statement'}
              </button>
            </div>
            
            {showDirectorsStatement && (
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold mb-2">Director's Statement</h3>
                  {getDirector() && (
                    <p className="text-gray-600 text-lg">{getDirector()}</p>
                  )}
                </div>
                <div className="prose prose-lg max-w-none">
                  {(filmData as Film & { directorsStatement?: string }).directorsStatement?.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Cast & Crew Link */}
        {((filmData.Cast && filmData.Cast.length > 0) || (filmData.Crew && filmData.Crew.length > 0)) && (
          <div className="max-w-4xl mx-auto mb-8 text-center">
            <Link 
              href={`/cast-crew?film=${encodeURIComponent(filmData.name)}`}
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              View Full Cast & Crew
            </Link>
          </div>
        )}
        
        {/* Awards */}
        {filmData.Awards && filmData.Awards.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Awards</h3>
            <ul className="list-disc list-inside space-y-1">
              {filmData.Awards.map((award, index) => (
                <li key={index} className="text-gray-700">{award}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Related Articles */}
        {(() => {
          const relatedArticles = newsArticles.filter(article => {
            const relatedFilms = article.relatedFilm ? [article.relatedFilm] : (article as any).relatedFilms || [];
            return relatedFilms.includes(filmData.name) && !article.id.includes('directors-statement');
          });
          return relatedArticles.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((article, index) => (
                  <Link key={index} href={`/news/${article.id}`} className="group">
                    <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-gray-500 text-sm mb-2">{article.date}</p>
                        <p className="text-gray-700 text-sm">{article.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}
        
        {/* Poster Gallery Modal */}
        {showPosterGallery && filmData && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              {/* Close Button */}
              <button 
                onClick={() => setShowPosterGallery(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Poster Display */}
              <div className="flex items-center justify-center">
                <img 
                  src={`/scene-photos/${filmData.name.toLowerCase().replace(' ', '-')}/poster${currentPosterIndex + 1}.png`}
                  alt={`${filmData.name} Poster ${currentPosterIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              </div>
              
              {/* Navigation - Only show if multiple posters */}
              {filmData.posterCount && filmData.posterCount > 1 && (
                <>
                  {/* Previous Button */}
                  {currentPosterIndex > 0 && (
                    <button 
                      onClick={() => setCurrentPosterIndex(currentPosterIndex - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  
                  {/* Next Button */}
                  {currentPosterIndex < filmData.posterCount - 1 && (
                    <button 
                      onClick={() => setCurrentPosterIndex(currentPosterIndex + 1)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                  
                  {/* Poster Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                    {currentPosterIndex + 1} of {filmData.posterCount}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FilmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FilmPageContent />
    </Suspense>
  );
}