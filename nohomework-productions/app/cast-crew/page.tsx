'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getFilms } from '../../lib/firestore';
import type { Film } from '../../lib/firestore';

function CastCrewContent() {
  const searchParams = useSearchParams();
  const filmName = searchParams.get('film');
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);

  // Group crew by department
  const groupCrewByDepartment = () => {
    if (!film?.Crew) return {};
    
    const departments: { [key: string]: { name: string; role: string }[] } = {};
    
    film.Crew.forEach(member => {
      let department = 'Other';
      const role = member.role.toLowerCase();
      
      if (role.includes('director') && !role.includes('assistant')) department = 'Directing';
      else if (role.includes('writer') || role.includes('story')) department = 'Writing';
      else if (role.includes('producer')) department = 'Producing';
      else if (role.includes('cinematographer') || role.includes('cinematography')) department = 'Cinematographer';
      else if (role.includes('camera')) department = 'Camera';
      else if (role.includes('sound') || role.includes('audio') || role.includes('foley')) department = 'Sound';
      else if (role.includes('editor') || role.includes('editing')) department = 'Editing';
      else if (role.includes('composer') || role.includes('music')) department = 'Music';
      else if (role.includes('gaffer') || role.includes('lighting')) department = 'Lighting';
      else if (role.includes('production designer') || role.includes('set decorator')) department = 'Art Department';
      else if (role.includes('visual effects')) department = 'Visual Effects';
      else if (role.includes('poster artist')) department = 'Art';
      
      if (!departments[department]) departments[department] = [];
      departments[department].push(member);
    });
    
    return departments;
  };

  useEffect(() => {
    async function loadFilm() {
      if (filmName) {
        const allFilms = await getFilms();
        const selectedFilm = allFilms.find(f => f.name === filmName);
        setFilm(selectedFilm || null);
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

  if (!filmName || !film) {
    return (
      <div className="min-h-screen bg-white px-4 pt-24 pb-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Film not found</h1>
          <Link href="/films" className="text-blue-600 hover:text-blue-800">
            Back to Films
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 pt-24 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link 
            href={`/film?film=${encodeURIComponent(film.name)}`}
            className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {film.name}
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-4">{film.name} ({film.Year})</h1>
        <h2 className="text-2xl text-gray-600 text-center mb-12">Cast & Crew</h2>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Cast Section */}
          {film.Cast && film.Cast.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 border-b-2 border-blue-600 pb-2">Cast</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {film.Cast.map((actor, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium text-lg">{actor.name}</span>
                    <span className="text-gray-600">{actor.character || 'N/A'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Crew by Department */}
          {Object.entries(groupCrewByDepartment()).map(([department, members]) => (
            <div key={department}>
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">{department}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {members.map((member, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium">{member.name}</span>
                    <span className="text-gray-600 text-sm">{member.role}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CastCrewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <CastCrewContent />
    </Suspense>
  );
}