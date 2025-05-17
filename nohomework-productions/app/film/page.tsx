'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';  // Use this to get query parameters in Next.js 13+

import { films } from '../constants';  // Assuming your film data is in constants.js or constants.ts

export default function FilmPage() {
  const searchParams = useSearchParams();
  const filmName = searchParams.get('film');  // Get the 'film' query parameter
  const [filmData, setFilmData] = useState(null);

  useEffect(() => {
    if (filmName) {
      const selectedFilm = films.find((f) => f.name.toLowerCase() === filmName.toLowerCase());
      setFilmData(selectedFilm);
    }
  }, [filmName]);

  if (!filmData) {
    return <div>Loading...</div>;  // You can replace this with a "Film Not Found" page
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{filmData.name} ({filmData.Year})</h1>
        <div className="mt-6">
            <iframe width="560" height="315" src={filmData.YouTubeLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        <p className="mt-4"><strong>Starring:</strong> {filmData.Starring}</p>
        <div className="mt-4">
          <strong>Awards:</strong>
          <ul>
            {filmData.Awards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}