'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { films } from '../constants';

type Film = {
  name: string;
  Year: string;
  Starring: string;
  Image_src: string;
  Awards: string[];
  YouTubeLink: string;
  Synopsis?: string;
  Description?: string;
  ReleaseDate?: string;
  Country?: string;
  Language?: string;
  Genres?: string[];
  Cast?: { name: string; character: string }[];
  Crew?: { name: string; role: string }[];
  posterCount?: number;
  fullMovieLink?: string;
  relatedArticles?: { id: string; title: string; date: string; excerpt: string; image: string }[];
};

function FilmPageContent() {
  const searchParams = useSearchParams();
  const filmName = searchParams.get('film');
  const [filmData, setFilmData] = useState<Film | null>(null);
  const [showPosterGallery, setShowPosterGallery] = useState(false);
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);

  useEffect(() => {
    if (filmName) {
      const selectedFilm = films.find((f) => f.name.toLowerCase() === filmName.toLowerCase());
      setFilmData(selectedFilm || null);
    }
  }, [filmName]);

  if (!filmData) {
    return <div>Loading...</div>;
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
                src={`/scene-photos/${filmData.name === 'The Present' ? 'christmas-movie' : filmData.name.toLowerCase().replace(' ', '-')}/poster1.${filmData.name === 'The Present' || filmData.name === 'Dead Air' || filmData.name === 'Donor' ? 'png' : 'jpg'}`}
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
          
          {/* Info below media */}
          <div className="max-w-4xl mx-auto space-y-6">
            {filmData.Synopsis && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Storyline</h3>
                <p className="text-gray-700 leading-relaxed">{filmData.Synopsis}</p>
              </div>
            )}
            
            {filmData.Genres && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {filmData.Genres.map((genre, index) => (
                    <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">{genre}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        
        {/* Film Details */}
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {filmData.ReleaseDate && (
              <div><strong>Release Date:</strong> {filmData.ReleaseDate}</div>
            )}
            {filmData.Country && (
              <div><strong>Country:</strong> {filmData.Country}</div>
            )}
            {filmData.Language && (
              <div><strong>Language:</strong> {filmData.Language}</div>
            )}
          </div>
        </div>
        
        {/* Cast & Crew Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cast */}
          {filmData.Cast && filmData.Cast.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Top Cast</h3>
              <div className="space-y-3">
                {filmData.Cast.map((actor, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium">{actor.name}</span>
                    <span className="text-gray-600">{actor.character}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Crew */}
          {filmData.Crew && filmData.Crew.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Crew</h3>
              <div className="space-y-3">
                {filmData.Crew.map((member, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium">{member.name}</span>
                    <span className="text-gray-600">{member.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
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
        {filmData.relatedArticles && filmData.relatedArticles.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filmData.relatedArticles.map((article, index) => (
                <Link key={index} href={`/news?article=${article.id}`} className="group">
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
        )}
        
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