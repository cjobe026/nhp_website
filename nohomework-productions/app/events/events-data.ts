export const events = [
  {
    id: 1,
    title: 'After',
    subtitle: 'Cinema On the Bayou Film Festival',
    date: 'January 21-28, 2025',
    time: 'Various Times',
    location: 'Lafayette, Louisiana',
    venue: 'Cinema On the Bayou',
    description: 'World premiere at Louisiana\'s longest running film festival. Join us for this special screening of our latest production.',
    link: 'https://cinemaonthebayou.com/',
    type: 'Festival Screening',
    status: 'upcoming',
    movieId: 'After'
  },
  {
    id: 2,
    title: 'NHP Presents: Quadruple Feature',
    subtitle: 'Donor, After, Collect Call & Dead Air',
    date: 'January 9, 2025',
    time: '6:00 PM',
    location: 'Shreveport, Louisiana',
    venue: 'Robinson Film Center',
    description: 'A special evening showcasing four of our acclaimed films. Experience the complete NoHomework Productions journey in one night.',
    link: 'https://robinsonfilmcenter.org/',
    type: 'Special Screening',
    status: 'upcoming',
    movieIds: ['Donor', 'After', 'Collect Call', 'Dead Air']
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