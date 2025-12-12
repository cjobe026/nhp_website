'use client';

import { useState } from 'react';
import { colors } from '../colors';

// Sample showtime data - you can move this to constants later
const showtimes = [
  {
    id: 1,
    film: 'Donor',
    venue: 'Sundance Film Festival',
    date: '2025-01-25',
    time: '7:00 PM',
    location: 'Park City, UT',
    ticketLink: 'https://sundance.org'
  },
  {
    id: 2,
    film: 'Donor',
    venue: 'SXSW',
    date: '2025-03-15',
    time: '9:30 PM',
    location: 'Austin, TX',
    ticketLink: 'https://sxsw.com'
  },
  {
    id: 3,
    film: 'Collect Call',
    venue: 'Tribeca Film Festival',
    date: '2025-04-20',
    time: '6:00 PM',
    location: 'New York, NY',
    ticketLink: 'https://tribeca.com'
  }
];

export default function Showtimes() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const filteredShowtimes = showtimes.filter(showtime => {
    const showtimeDate = new Date(showtime.date);
    return showtimeDate.getMonth() === selectedMonth && showtimeDate.getFullYear() === selectedYear;
  });

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">Upcoming Showtimes</h1>
        
        {/* Month/Year Selector */}
        <div className="flex justify-center mb-8 gap-4">
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </select>
        </div>

        {/* Showtimes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShowtimes.length > 0 ? (
            filteredShowtimes.map((showtime) => (
              <div key={showtime.id} className="bg-gray-50 rounded-lg p-6 shadow-md border border-gray-200">
                <h3 className="text-xl font-bold mb-2" style={{color: colors.accent.primary}}>{showtime.film}</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Venue:</strong> {showtime.venue}</p>
                  <p><strong>Date:</strong> {new Date(showtime.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {showtime.time}</p>
                  <p><strong>Location:</strong> {showtime.location}</p>
                </div>
                <a 
                  href={showtime.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-4 py-2 text-white rounded-lg hover:opacity-80 transition-opacity"
                  style={{backgroundColor: colors.orange.primary}}
                >
                  Get Tickets
                </a>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No showtimes scheduled for {months[selectedMonth]} {selectedYear}</p>
            </div>
          )}
        </div>

        {/* All Upcoming Events */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-black">All Upcoming Events</h2>
          <div className="space-y-4">
            {showtimes.map((showtime) => (
              <div key={showtime.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1">
                  <h3 className="font-bold text-lg" style={{color: colors.accent.primary}}>{showtime.film}</h3>
                  <p className="text-gray-600">{showtime.venue} • {showtime.location}</p>
                  <p className="text-gray-500">{new Date(showtime.date).toLocaleDateString()} at {showtime.time}</p>
                </div>
                <a 
                  href={showtime.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 md:mt-0 px-4 py-2 text-white rounded-lg hover:opacity-80 transition-opacity text-center"
                  style={{backgroundColor: colors.orange.primary}}
                >
                  Get Tickets
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}