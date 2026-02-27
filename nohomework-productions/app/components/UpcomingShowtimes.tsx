'use client';

import { getUpcomingEventsForMovie } from '../events/events-data';
import Link from 'next/link';

interface UpcomingShowtimesProps {
  movieName: string;
}

export default function UpcomingShowtimes({ movieName }: UpcomingShowtimesProps) {
  const upcomingEvents = getUpcomingEventsForMovie(movieName);

  if (upcomingEvents.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <h3 className="text-2xl font-bold text-white mb-4">Upcoming Showtimes</h3>
      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="bg-black rounded-lg p-4 border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-white font-semibold text-lg">{event.title}</h4>
                <p className="text-gray-300 text-sm">{event.subtitle}</p>
              </div>
              <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium">
                {event.type}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-300 text-sm">{event.date}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-300 text-sm">{event.time}</span>
              </div>
            </div>
            
            <div className="flex items-center mb-3">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-300 text-sm">{event.venue} • {event.location}</span>
            </div>
            
            <p className="text-gray-400 text-sm mb-4">{event.description}</p>
            
            <div className="flex gap-3">
              {event.link && (
                <a 
                  href={event.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  Get Tickets
                </a>
              )}
              <Link 
                href="/events"
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                View All Events
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}