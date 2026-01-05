'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Reusable icon paths
const icons = {
  eye: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  film: 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h3a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3z'
};

// Add Tailwind line-clamp styles
const styles = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// News articles data
const newsArticles = [
  {
    id: 'donor-oneness-cinematography',
    title: 'Donor receives Best Cinematography at ONENESS FILM FESTIVAL 2025',
    date: 'January 2, 2026',
    image: '/donor-selection.png',
    relatedFilm: 'Donor',
    excerpt: 'The Oneness festival representatives praised the film\'s "striking visual language and emotional restraint"...',
    content: `
      <p>Donor receives the award for Best Cinematography at ONENESS FILM FESTIVAL 2025.</p>
      
      <p>The Oneness festival representatives had this to say about the film on their instagram:</p>
      
      <blockquote class="border-l-4 border-yellow-500 pl-4 italic mb-6">
        "Congratulations to director Wesley Boone and the entire team behind this deeply moving film. Through striking visual language and emotional restraint, Donor follows a grieving mother as her world shifts upon meeting the recipient of her stillborn daughter's heart.
        <br><br>
        A powerful example of how cinematography can carry grief, memory, and connection beyond words. Bravo to all involved."
      </blockquote>
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
    id: 'donor-festival-wins',
    title: 'What a month it\'s been for Donor!',
    date: 'November 19, 2025',
    image: '/donor-selection.png',
    relatedFilm: 'Donor',
    excerpt: 'We took home "Best Louisiana Film" at Screamfest - NOLA and "Best Drama Short" at REEL East Texas Film Festival...',
    content: `
      <p>What a month it's been for Donor!</p>
      
      <p>We took home "Best Louisiana Film" at Screamfest - NOLA, (a wonderful event at the Broad Theater) and followed it up with "Best Drama Short" at REEL East Texas Film Festival, where we met other passionate filmmakers in East Texas!</p>
      
      <p>It's incredibly special to connect with audiences in our home and sister states!</p>
    `,
    relatedLinks: [
      {
        title: 'Watch the Trailer Now',
        description: 'Experience the acclaimed film',
        url: '/film?film=Donor',
        icon: icons.eye
      },
      {
        title: 'All Events',
        description: 'See past screenings',
        url: '/events',
        icon: icons.film
      }
    ]
  },
  {
    id: 'tampa-bay-nominations',
    title: 'Multiple Nominations at Tampa Bay Underground Film Festival',
    date: 'January 17, 2025',
    image: '/donor-selection.png',
    relatedFilm: 'Donor',
    excerpt: 'Our Florida Premiere is this weekend with nominations for Best Short Film, Best Screenplay, Best Cinematography, and Best Crime/Thriller Film...',
    content: `
      <p>Our Florida Premiere is this weekend and we've been nominated for several awards at the 2025 Tampa Bay Underground Film Festival!</p>
      
      <p>Our nominations are:</p>
      <ul class="list-disc ml-6 mb-6">
        <li>Best Short Film</li>
        <li>Best Short Screenplay</li>
        <li>Best Cinematography</li>
        <li>Best Crime/Thriller Film</li>
      </ul>
      
      <p>Join us this Friday at 1:30 PM at Citrus Park Theater to experience our film and many other great indie shorts and features!</p>
      
      <p>This marks an exciting milestone for No Homework Productions as we continue to share our stories with audiences across the country. The Tampa Bay Underground Film Festival celebrates independent filmmaking and provides a platform for emerging voices in cinema.</p>
      
      <p>We're honored to be recognized alongside so many talented filmmakers and look forward to connecting with the Tampa Bay film community.</p>
    `,
    relatedLinks: [
      {
        title: 'Watch the Trailer Now',
        description: 'Experience the acclaimed film',
        url: '/film?film=Donor',
        icon: icons.eye
      },
      {
        title: 'All Events',
        description: 'See upcoming screenings',
        url: '/events',
        icon: icons.film
      }
    ]
  },
  {
    id: 'donor-viewfinder-podcast',
    title: '"Donor" featured on The Viewfinder Podcast with Chris Hadley',
    date: 'December 5, 2025',
    image: '/scene-photos/donor/card.png',
    relatedFilm: 'Donor',
    excerpt: 'After a successful screening at the inaugural Baton Rouge Underground Film Festival, members of the "Donor" team were interviewed by Chris Hadley...',
    content: `

      
      <p>After a successful screening at the inaugural Baton Rouge Underground Film Festival in August, members of the "Donor" team were interviewed by Chris Hadley for The Viewfinder Podcast.</p>
      
      <p>Writer/Director Wesley Boone, Gordy Cassel (Beth) and Lucy Faust (Julia) joined Chris to discuss the production of the film and its origins.</p>
      
      <p>Listen to The Viewfinder Podcast wherever you get your podcasts now!</p>
      <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="175" style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.podcasts.apple.com/us/podcast/episode-122-donor-writer-director-co-star-wesley-boone/id1465499690?i=1000732322575"></iframe>
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
      
      <p>"We're so excited to participate in Cinema on the Bayou in 2026," said director/producer Wesley Boone. "This is the first time we've screened any of our projects in Lafayette and we are very excited to be a part of such an incredible line-up of films."</p>
      
      <p>"After" follows a married couple forced to confront the time they have left together when one of them is diagnosed with a terminal illness. A new procedure offers a chance at infinite time, but at what cost?</p>
      
      <p>The project stars Casey Groves (Apple TV's Blackbird, Rob Reiner's LBJ) and newcomer Tara Tingle. Production took place in Shreveport/Bossier during the summer of 2026, with post-production wrapping up in September.</p>
      
      <p>"After" is the first collaboration for No Homework Productions and writer/producer Andrew Scherer.</p>
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
    title: 'From box office pals to production partners, "Dead Air" is a full circle moment for writer/director Trevor L. Poole',
    date: 'December 20, 2025',
    image: '/scene-photos/dead-air/card.jpeg',
    relatedFilm: 'Dead Air',
    excerpt: 'A dream that was born over a decade ago in a musty box-office came to life in Fall 2024...',
    content: `
      <p>A dream that was born over a decade ago in a musty box-office came to life in Fall 2024, when writer/director Trevor L. Poole's latest short film "Dead Air" started principal photography with a group of familiar faces.</p>
      
      <p>"Multiple cast and crew on this I met more than 10 years ago, working in the box office of a movie theater," said Poole. "My producers (Paige Ferrant and Wesley Boone) and my supporting player (Matt Margheim). All of us bonded over movies, and now we make them."</p>
      
      <p>No Homework Productions has been a collaborative, creative environment for even more members of that box office team. Along with Paige, Trevor, Wesley and Matt, NHP Founding Member Caleb Jobe was also a part of that very same box office crew. "Dead Air" was able to reunite (most) of this crew in Shreveport/Bossier despite members being as far as Milwaukee and Nashville.</p>
      
      <p>"This was my first time acting but I think it was made so much easier just doing this with people I'm comfortable with," said Matt Margheim, who plays Brendan in the film. Matt's chemistry with Wesley was something that also helped land him the part.</p>
      
      <p>"I immediately thought about Matt," said Wesley. "We've always had a special dynamic and I just felt that he'd be a great fit for the part. Trevor was open to it and once we did a screen test, it was pretty clear it would be a good fit. It was also a great excuse to hang out."</p>
      
      <p>"Dead Air" follows a distressed wanna-be stand-up comedian who has the unenviable task of giving the eulogy at his best-friend's funeral. Poole says the initial concept came from his own anxieties. "When I originally conceived 'Dead Air' I felt I was floundering in my career. Just as Joey contemplates if he's made for comedy, I wondered if I was cut out for directing," said Poole. "My first short film had not quite succeeded in any particular fashion and I was feeling listless, not really moving forward in my career at all. All of these same feelings were funneled into Joey."</p>
      
      <p>Wesley, so completely brought Joey to life with dedication and vulnerability. Wesley - like Joey - had lost his best friend and deeply connected with this aspect of the story, and when it came time to step on that stage in the chapel, he bled for the camera over and over just as I tried to on the page.</p>
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

function NewsPageContent() {
  const searchParams = useSearchParams();
  const articleId = searchParams.get('article');
  const [article, setArticle] = useState<typeof newsArticles[0] | null>(null);

  useEffect(() => {
    if (articleId) {
      const selectedArticle = newsArticles.find(a => a.id === articleId);
      setArticle(selectedArticle || null);
    }
  }, [articleId]);

  if (articleId && !article) {
    return <div className="min-h-screen flex items-center justify-center">Article not found</div>;
  }

  if (article) {
    // Individual article view
    return (
      <div className="min-h-screen bg-gray-50 pt-12 md:pt-20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-6 pb-12 text-white">
              <Link href="/" className="text-white/80 hover:text-white mb-4 inline-flex items-center text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
              <h1 className="text-5xl font-bold mb-4 leading-tight">{article.title}</h1>
              <p className="text-xl text-white/90">{article.date}</p>
            </div>
          </div>
        </div>
        
        {/* Article Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Article */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-12">
                <div 
                  className="prose prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {article.relatedLinks && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Related</h3>
                  <div className="space-y-4">
                    {article.relatedLinks.map((link, index) => (
                      <Link key={index} href={link.url} className="block group">
                        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {link.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{link.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* More News */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">More News</h3>
                <div className="space-y-4">
                  {newsArticles.filter(a => a.id !== article.id).slice(0, 3).map((otherArticle) => (
                    <Link key={otherArticle.id} href={`/news?article=${otherArticle.id}`} className="block group">
                      <div className="flex space-x-3">
                        <img 
                          src={otherArticle.image} 
                          alt={otherArticle.title}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {otherArticle.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{otherArticle.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // News listing view
  return (
    <div className="min-h-screen bg-gray-50 pt-12 md:pt-20">
      {/* Header Section */}
      <div className="bg-white pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-6 text-gray-900">Latest News</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest from No Homework Productions
          </p>
        </div>
      </div>
      
      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            <Link href={`/news?article=${newsArticles[0].id}`} className="group block">
              <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={newsArticles[0].image} 
                    alt={newsArticles[0].title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                    {newsArticles[0].title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4 uppercase tracking-wide">{newsArticles[0].date}</p>
                  <p className="text-gray-700 text-lg leading-relaxed">{newsArticles[0].excerpt}</p>
                </div>
              </article>
            </Link>
          </div>
          
          {/* Side Articles */}
          <div className="space-y-6">
            {newsArticles.slice(1).map((article) => (
              <Link key={article.id} href={`/news?article=${article.id}`} className="group block">
                <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex">
                    <div className="w-32 h-32 flex-shrink-0">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide">{article.date}</p>
                      <p className="text-gray-600 text-sm line-clamp-2">{article.excerpt}</p>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <Suspense fallback={<div>Loading...</div>}>
        <NewsPageContent />
      </Suspense>
    </>
  );
}