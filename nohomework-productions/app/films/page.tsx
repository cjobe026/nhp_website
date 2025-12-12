import Link from 'next/link'
import {films} from '../constants'
import { colors } from '../colors'


export default function About() {

    return (
      <div className="min-h-screen p-8 pt-24 bg-white">
        <h3 className="text-3xl font-bold text-center mb-8 text-black">Our Films</h3>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
  
          {films.sort((a, b) => parseInt(b.Year) - parseInt(a.Year)).map((film, index) => (
                <Link key={index} href={`/film?film=${encodeURIComponent(film.name)}`} className="hover:text-gray-400">
              <div className="relative text-center h-[500px] bg-white hover:bg-gray-50 rounded-md shadow-md border border-gray-300">

                  <img
                    className="rounded-lg shadow-lg"
                    src={film.Image_src}
                    alt={film.name}
                    width={400}
                    height={200}
                  />
                  <p className="mt-2 text-sm text-lightgrey-700">{film.Year}</p>
                  <h4 className="text-xl font-semibold">{film.name}</h4>
                  <p className="mt-2 text-sm text-gray-600">{film.Starring}</p>
                  <p className="mt-2 text-xs text-gray-500 px-2">{film.Synopsis}</p>
                  <p className="mt-2 text-sm text-gray-600">{film.Description}</p>
                  <button className="absolute bottom-4 right-4 w-12 h-12 text-black rounded-full transition-all duration-300 shadow-lg hover:shadow-xl group" style={{backgroundColor: colors.accent.primary}}>
                    <svg className="w-5 h-5 mx-auto group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>     

              </div>
                              </Link>

          ))}
          </div>
        </div>
      </div>
    );
  }