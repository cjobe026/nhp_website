import Image from 'next/image'
import Link from 'next/link'
import {films} from '../constants'

export default function About() {

    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
  
        {/* Team Section */}  
        <h3 className="text-3xl font-bold text-center mb-8">Our Films</h3>

            {films.map((film, index) => (
               
              <div key={index} className="text-center">
                <Link href="/film?film=DONOR" className="hover:text-gray-400">
                <Image
                  
                  className="rounded-lg shadow-lg"
                  src={film.Image_src}
                  alt={film.name}
                  width={300}
                  height={200}

                />
                <h4 className="text-xl font-semibold">{film.name}</h4>
                <p className="mt-2 text-sm text-lightgrey-700">{film.Starring}</p>
                </Link>
              </div>

            ))}
            </div>
    );
  }
  