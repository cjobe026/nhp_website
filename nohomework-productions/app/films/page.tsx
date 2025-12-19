import Link from 'next/link'
import {films} from '../constants'
import { colors } from '../colors'


export default function About() {

    return (
      <div className="min-h-screen p-8 pt-24 bg-white">
        <h3 className="text-3xl font-bold text-center mb-8 text-black">Our Films</h3>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  
          {films.sort((a, b) => parseInt(b.Year) - parseInt(a.Year)).map((film, index) => (
                <Link key={index} href={`/film?film=${encodeURIComponent(film.name)}`} className="hover:text-gray-400">
              <div className="relative bg-white hover:bg-gray-50 rounded-lg shadow-md border border-gray-300 overflow-hidden transition-all duration-300 hover:shadow-lg h-[450px] flex flex-col w-full">
                  {/* Image Section */}
                  <div className="relative">
                    <img
                      className="w-full h-48 object-cover"
                      src={film.Image_src}
                      alt={film.name}
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
                      {film.Year}
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-4 flex-1 flex flex-col min-h-0">
                    {/* Title */}
                    <h4 className="text-lg font-bold text-gray-900 line-clamp-1 mb-2">{film.name}</h4>
                    
                    {/* Genres */}
                    {film.Genres && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {film.Genres.map((genre, genreIndex) => (
                          <span key={genreIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Starring */}
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Starring:</span> {film.Starring}
                    </p>
                    
                    {/* Synopsis */}
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed flex-1 mb-3">{film.Synopsis}</p>
                    
                    {/* Status Badge - Fixed at bottom */}
                    {film.Status && (
                      <div className="flex justify-between items-center mt-auto">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          film.Status === 'Released' ? 'bg-green-100 text-green-800' :
                          film.Status === 'Now Showing' ? 'bg-yellow-100 text-yellow-800' :
                          film.Status === 'In Production' ? 'bg-blue-100 text-blue-800' :
                          film.Status === 'In Pre-Production' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {film.Status}
                        </span>
                        
                        {/* Info Button */}
                        <button className="w-8 h-8 text-white rounded-full transition-all duration-300 shadow hover:shadow-md group" style={{backgroundColor: colors.accent.primary}}>
                          <svg className="w-4 h-4 mx-auto group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
              </div>
                              </Link>

          ))}
          </div>
        </div>
      </div>
    );
  }