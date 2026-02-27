export const icons = {
  eye: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  film: 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h3a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3z'
};

export const newsArticles = [
  {
    id: 'prison-city-festival',
    title: 'Prison City Film Festival highlights "After" and "Donor" in 2026 edition',
    date: 'February 23, 2026',
    image: '/scene-photos/after/article3.png?v=2',
    mobileImage: '/scene-photos/after/article3_mobile.png?v=2',
    relatedFilm: 'After',
    relatedFilms: ['After', 'Donor'],
    excerpt: 'After and Donor are both official selections for Prison City Film Festivals 2026 edition, kicking off in Huntsville, TX, this weekend...',
    content: `
      <p>"After" and "Donor" are both official selections for Prison City Film Festival's 2026 edition, kicking off in Huntsville, TX, this weekend. "Donor", the thriller starring Gordy Cassel, has screened monthly across North America since last February while "After" will have it's second public screening since premiering at Cinema on the Bayou in January.</p>
      <br>
      <p>Prison City Film Festival marks the first festival to screen two NHP projects. "We're very grateful that PCFF has selected two of our projects," said director Wesley Boone, who directed both "After" and "Donor". "We're excited to screen again in Texas and join our cast and crew for what should be a great weekend among an impressive lineup of films."</p>
      <br>
      <p>"After" will have its Texas Premiere at the festival, while PCFF will mark the third festival in Texas that "Donor" has screened at (REEL East Texas Film Festival, Panther City Film Festival).</p>
      <br>
      <p>Along with being named official selections, both projects have racked up numerous award nominations. See the full list below.</p>
      <br>
      <h3 class="text-2xl font-bold mb-4">Donor</h3>
      <ul class="list-disc pl-6 mb-6 space-y-1">
        <li>Best Short Film</li>
        <li>Best Trailer</li>
        <li>Best Cinematography</li>
        <li>Best Editing</li>
        <li>Best Music</li>
        <li>Best Sound</li>
        <li>Best Writing</li>
        <li>Best Director</li>
        <li>Best Performance - Gordy Cassel</li>
        <li>Best Supporting Performance - Wesley Boone</li>
        <li>Best in Genre - Thriller</li>
        <li>The Outside Picket Award - Most Original</li>
        <li>The Ad-Seg Award - Most Intense</li>
        <li>The Warden's Vanguard Award - Best Overall Submission</li>
      </ul>
      <br>
      <h3 class="text-2xl font-bold mb-4">After</h3>
      <ul class="list-disc pl-6 mb-6 space-y-1">
        <li>Best Short Film</li>
        <li>Best Trailer</li>
        <li>Best Cinematography</li>
        <li>Best Editing</li>
        <li>Best Music</li>
        <li>Best Sound</li>
        <li>Best Writing</li>
        <li>Best Director</li>
        <li>Best Actor - Casey Groves</li>
        <li>Best Actress - Tara Tingle</li>
        <li>Best in Genre - Drama</li>
        <li>The Outside Picket Award - Most Original</li>
      </ul>
      <br>
      <p>Both films will screen Friday, February 27. "After" will screen in C1 Block starting at 11 a.m. and "Donor" will screen in C4 Block starting at 7:20 p.m. To purchase tickets, <a href="https://filmfreeway.com/PrisonCityFilmFestival/tickets" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">head here</a>.</p>
    `,
    relatedLinks: [
      {
        title: 'Learn About AFTER',
        description: 'Explore the sci-fi drama',
        url: '/film?film=After',
        icon: icons.eye
      },
      {
        title: 'Learn About DONOR',
        description: 'Explore the thriller',
        url: '/film?film=Donor',
        icon: icons.eye
      }
    ]
  },
  {
    id: 'donor-viewfinder-podcast',
    title: '"Donor" featured on The Viewfinder Podcast with Chris Hadley',
    date: 'December 5, 2025',
    image: '/scene-photos/donor/article1_1splash.png',
    relatedFilm: 'Donor',
    excerpt: 'After a successful screening at the inaugural Baton Rouge Underground Film Festival, members of the "Donor" team were interviewed by Chris Hadley...',
    content: `
      <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="175" style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.podcasts.apple.com/us/podcast/episode-122-donor-writer-director-co-star-wesley-boone/id1465499690?i=1000732322575"></iframe>
      <br>
      <p>After a successful screening at the inaugural Baton Rouge Underground Film Festival in August, members of the "Donor" team were interviewed by Chris Hadley for The Viewfinder Podcast.</p>
      <br>
      <p>Writer/Director Wesley Boone, Gordy Cassel (Beth) and Lucy Faust (Julia) joined Chris to discuss the production of the film and its origins.</p>
      <br>
      <p>Listen to <a href="https://www.facebook.com/TheViewfinderPodcast" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">The Viewfinder Podcast</a> wherever you get your podcasts now!</p>
    `,
    relatedLinks: [
      {
        title: 'Watch the Trailer Now',
        description: 'Experience the acclaimed film',
        url: '/film?film=Donor',
        icon: icons.eye
      }
    ]
  },
  {
    id: 'after-festival-selection',
    title: '"After" selected for Cinema on the Bayou Film Festival 2026',
    date: 'January 1, 2026',
    image: '/scene-photos/after/article2.png',
    relatedFilm: 'After',
    excerpt: 'No Homework Productions latest project, "After", will start its festival journey close to home...',
    content: `
      <p>No Homework Productions latest project, "After", will start its festival journey close to home. The sci-fi/drama will have its world premiere at Cinema on the Bayou Film Festival 2026, one of the state of Louisiana's longest running film festivals, hosted each winter in Lafayette.</p>
      <br>
      <p>"We're so excited to participate in Cinema on the Bayou in 2026," said director/producer Wesley Boone. "This is the first time we've screened any of our projects in Lafayette and we are very excited to be a part of such an incredible line-up of films."</p>
      <br>
      <p>"After" follows a married couple forced to confront the time they have left together when one of them is diagnosed with a terminal illness. A new procedure offers a chance at infinite time, but at what cost?</p>
      <br>
      <p>The project stars <a href="https://www.imdb.com/name/nm2517511/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">Casey Groves</a> (Apple TV's Blackbird, Rob Reiner's LBJ) and newcomer Tara Tingle. Production took place in Shreveport/Bossier during the summer of 2025, with post-production wrapping up in September.</p>
      <br>
      <p>"After" is the first collaboration for No Homework Productions and writer/producer Andrew Scherer. Purchase tickets to the Cinema on the Bayou Film Festival screening <a href="https://cinemaonthebayou2026.eventive.org/schedule/narrative-shorts-series-2-89-min-6959769a0845e58ab1f8a8b7/tickets"  target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline"> here</a>.</p>
    `,
    relatedLinks: [
      {
        title: 'Learn About AFTER',
        description: 'Explore the sci-fi drama',
        url: '/film?film=After',
        icon: icons.eye
      }
    ]
  },
  {
    id: 'dead-air-full-circle',
    title: '"Dead Air" is a full circle moment for writer/director Trevor L. Poole',
    date: 'December 20, 2025',
    image: '/scene-photos/dead-air/article1_1.jpeg',
    relatedFilm: 'Dead Air',
    excerpt: 'A dream that was born over a decade ago in a musty box-office came to life in Fall 2024...',
    content: `
      <p>A dream that was born over a decade ago in a musty box-office came to life in Fall 2024, when writer/director <a href="https://www.imdb.com/name/nm16998126/?ref_=fn_t_1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">Trevor L. Poole</a>'s latest short film "Dead Air" started principal photography with a group of familiar faces.</p>
      <br>
      <p>"Multiple cast and crew on this I met more than 10 years ago, working in the box office of a movie theater," said Poole. "My producers (Paige Ferrant and Wesley Boone) and my supporting player (Matt Margheim). All of us bonded over movies, and now we make them."</p>
      <br>
      <p>No Homework Productions has been a collaborative, creative environment for even more members of that box office team. Along with Paige, Trevor, Wesley and Matt, NHP Founding Member Caleb Jobe was also a part of that very same box office crew. "Dead Air" was able to reunite (most) of this crew in Shreveport/Bossier despite members being as far as Milwaukee and Nashville.</p>
      <br>
      <p>"This was my first time acting but I think it was made so much easier just doing this with people I'm comfortable with," said Matt Margheim, who plays Brendan in the film. Matt's chemistry with Wesley was something that also helped land him the part.</p>
      <br>
      <img src="/scene-photos/dead-air/article1_2.jpeg" alt="Dead Air behind the scenes" class="w-full rounded-lg mb-6" />
      <p class="text-sm text-gray-600 italic mb-4">Writer/Director Trevor L. Poole directs a scene during the production of "Dead Air".</p>
      <p>"I immediately thought about Matt," said Wesley. "We've always had a special dynamic and I just felt that he'd be a great fit for the part. Trevor was open to it and once we did a screen test, it was pretty clear it would be a good fit. It was also a great excuse to hang out."</p>
      <br>
      <p>"Dead Air" follows Joey, a distressed wanna-be stand-up comedian, who has the unenviable task of giving the eulogy at his best-friend's funeral. Poole says the initial concept came from his own anxieties. "When I originally conceived 'Dead Air', I felt I was floundering in my career. Just as Joey contemplates if he's made for comedy, I wondered if I was cut out for directing," said Poole. "My first short film had not quite succeeded in any particular fashion and I was feeling listless, not really moving forward in my career at all. All of these same feelings were funneled into Joey."</p>
      <br>
      <p> Dead Air screen for cast and crew on January 9th  before starting its festival journey later in 2026.</p>
    `,
    relatedLinks: [
      {
        title: 'About Dead Air',
        description: 'Learn more about the dramedy',
        url: '/film?film=Dead Air',
        icon: icons.eye
      }
    ]
  },
];
