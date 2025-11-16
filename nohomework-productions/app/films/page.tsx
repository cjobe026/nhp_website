import Link from 'next/link'
import {films} from '../constants'


export default function About() {

    return (
      <div className="min-h-screen p-8">
        <h3 className="text-3xl font-bold text-center mb-8">Our Films</h3>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
  
          {films.map((film, index) => (
                <Link key={index} href={`/film?film=${encodeURIComponent(film.name)}`} className="hover:text-gray-400">
              <div className="text-center h-[500px] bg-zinc-500 hover:bg-gray-100 rounded-md">

                  <img
                    className="rounded-lg shadow-lg"
                    src={film.Image_src}
                    alt={film.name}
                    width={400}
                    height={200}
                  />
                  <p className="mt-2 text-sm text-lightgrey-700">{film.Year}</p>
                  <h4 className="text-xl font-semibold">{film.name}</h4>
                  <p className="mt-2 text-sm text-lightgrey-700">{film.Starring}</p>

              </div>
                              </Link>

          ))}
          </div>
        </div>
      </div>
    );
  }