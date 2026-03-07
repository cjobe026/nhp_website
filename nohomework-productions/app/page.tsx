import { getFilms, getCarouselArticles, getUpcomingEvents } from '@/lib/firestore';
import Link from 'next/link';
import HomeCarousel from './components/HomeCarousel';

export const revalidate = 60;

export default async function Home() {
  const films = await getFilms();
  const articles = await getCarouselArticles();
  const events = await getUpcomingEvents();

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <main className="relative flex-grow bg-black min-h-screen pt-16 md:pt-20">
        <HomeCarousel articles={articles} films={films} />
      </main>
      
      <section className="bg-white py-20 px-4 relative z-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-black font-thin tracking-wide">RELEASES</h2>
          
          <div className="relative pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-6">
              {films.filter(film => film.TimelinePosition && !film.hidden).sort((a, b) => (b.TimelinePosition || 0) - (a.TimelinePosition || 0)).slice(0, 4).map((film, index) => {
                const posterPath = film.posterPath || `/scene-photos/${film.name.toLowerCase().replace(' ', '-')}/poster1.jpg`;
                
                return (
                  <div key={index} className="relative pt-6 pb-6 max-w-56 mx-auto">
                    <div className="text-center mb-4">
                      <span className="text-2xl font-bold text-gray-800">{film.Year}</span>
                    </div>
                    
                    <Link href={`/film?film=${encodeURIComponent(film.name)}`} className="group block">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img 
                            src={posterPath} 
                            alt={film.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="p-4 text-center">
                          <div className="px-3 py-1 rounded-full text-xs font-medium inline-block" style={{
                            backgroundColor: film.Status === 'Now Showing' ? '#d97706' :
                                           film.Status === 'Released' ? '#10b981' :
                                           '#3b82f6',
                            color: '#ffffff'
                          }}>
                            {film.Status}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-12 px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white font-thin tracking-wide">UPCOMING SHOWINGS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div key={event.id} className="block h-full">
                <div className="bg-black rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-yellow-500 transition-colors h-full flex flex-col">
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4 flex-1">
                      <div className="flex-1">
                        <h3 className="text-white text-xl font-bold mb-2">{event.title}</h3>
                        <p className="text-gray-300 text-sm mb-1">{event.subtitle}</p>
                        {event.venue !== event.title && (
                          <p className="text-gray-300 text-sm mb-1">{event.venue}</p>
                        )}
                        <p className="text-gray-400 text-sm">{event.location}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-yellow-400 font-semibold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        <p className="text-yellow-400 text-sm">{event.time}</p>
                        <p className="text-gray-400 text-sm">{new Date(event.date).getFullYear()}</p>
                      </div>
                    </div>
                    {event.link && (
                      <a 
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer self-start"
                      >
                        {event.type === 'Festival Screening' ? 'Festival Info' : 'Event Info'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-white p-4 mt-6 text-center bg-black">
        <p>&copy; 2025 No Homework Productions. All rights reserved.</p>
      </footer>
    </div>
  );
}
