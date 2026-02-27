export const events = [
  {
    id: 5,
    title: 'Prison City Film Festival',
    subtitle: 'After',
    date: 'February 27, 2026',
    time: '11:00 AM',
    location: 'Huntsville, Texas',
    venue: 'Prison City Film Festival',
    description: 'C1 Block Screenings',
    link: 'https://filmfreeway.com/PrisonCityFilmFestival/tickets',
    type: 'Festival Screening',
    status: 'upcoming',
    movieId: 'After'
  },
    {
    id: 6,
    title: 'Prison City Film Festival',
    subtitle: 'Donor',
    date: 'February 27, 2026',
    time: '7:30 PM',
    location: 'Huntsville, Texas',
    venue: 'Prison City Film Festival',
    description: 'C4 Block Screenings',
    link: 'https://filmfreeway.com/PrisonCityFilmFestival/tickets',
    type: 'Festival Screening',
    status: 'upcoming',
    movieId: 'Donor'
  },
  {
    id: 1,
    title: 'Cinema On the Bayou',
    subtitle: 'After',
    date: 'January 24, 2025',
    time: 'Noon',
    location: 'Lafayette, Louisiana',
    venue: 'Cinema On the Bayou',
    description: 'World premiere at one of Louisiana\'s longest running film festivals. Join us for this special screening of our latest production.',
    link: 'https://cinemaonthebayou2026.eventive.org/schedule/narrative-shorts-series-2-89-min-6959769a0845e58ab1f8a8b7/tickets',
    type: 'Festival Screening',
    status: 'past',
    movieId: 'After'
  },
  {
    id: 2,
    title: 'NHP Presents: Triple Feature',
    subtitle: 'Donor, After & Dead Air',
    date: 'January 9, 2025',
    time: '6:00 PM',
    location: 'Shreveport, Louisiana',
    venue: 'Robinson Film Center',
    description: 'A private event showcasing three of our films. Experience the complete No Homework Productions journey in one night.',
    type: 'Special Screening',
    status: 'past',
    movieIds: ['Donor', 'After', 'Dead Air']
  },
  {
    id: 3,
    title: 'Donor',
    subtitle: 'Screamfest Horror Film Festival New Orleans',
    date: 'November 2, 2025',
    time: '3:15 PM',
    location: 'New Orleans, Louisiana',
    venue: 'Broad Theater',
    description: 'Official selection screening at Screamfest Horror Film Festival New Orleans.',
    type: 'Festival Screening',
    status: 'past',
    movieId: 'Donor'
  },
  {
    id: 4,
    title: 'Donor',
    subtitle: 'Reel East Texas Film Festival',
    date: 'November 8, 2025',
    time: '1:30 PM',
    location: 'Kilgore, Texas',
    venue: '4 Star Cinema',
    description: 'Award nominee screening at Reel East Texas Film Festival.',
    type: 'Festival Screening',
    status: 'past',
    movieId: 'Donor'
  }
];

export function getEventsForMovie(movieName: string) {
  return events.filter(event => 
    event.movieId === movieName || 
    (event.movieIds && event.movieIds.includes(movieName))
  );
}

export function getUpcomingEventsForMovie(movieName: string) {
  return getEventsForMovie(movieName).filter(event => event.status === 'upcoming');
}