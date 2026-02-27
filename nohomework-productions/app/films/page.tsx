import Link from 'next/link'
import {films} from '../constants'

type Film = {
  name: string;
  Year: string;
  Starring: string;
  Image_src: string;
  posterPath?: string;
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
  TimelinePosition?: number;
  Status?: string;
};


export default function About() {

    return (
      <div className="min-h-screen p-8 pt-24 bg-white">
        <h3 className="text-3xl font-bold text-center mb-8 text-black">Our Films</h3>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  
          {films.filter(film => !film.hidden).sort((a, b) => parseInt(b.Year) - parseInt(a.Year)).map((film, index) => {
            const posterPath = (film as Film & { posterPath?: string }).posterPath || `/scene-photos/${film.name.toLowerCase().replace(' ', '-')}/poster1.jpg`;
            
            return (
              <Link key={index} href={`/film?film=${encodeURIComponent(film.name)}`} className="hover:opacity-80 transition-opacity">
                <img
                  className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  src={posterPath}
                  alt={`${film.name} Poster`}
                />
              </Link>
            );
          })}
          </div>
        </div>
      </div>
    );
  }