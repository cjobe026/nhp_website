'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

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
    id: 'donor-award',
    title: 'DONOR Wins Best Editing Award',
    date: 'January 15, 2025',
    image: '/donor-selection.png',
    excerpt: 'Our latest film DONOR has been recognized for outstanding editing at the Independent Film Festival...',
    content: `
      <p>We are thrilled to announce that our short film DONOR has won the Best Editing Award at the Independent Film Festival. This recognition highlights the exceptional work of our editing team and the collaborative effort that went into creating this powerful story.</p>
      
      <p>DONOR, which explores themes of grief, loss, and human connection, required careful pacing and emotional timing to deliver its impactful message. The editing process was crucial in weaving together the narrative threads that make this film so compelling.</p>
      
      <p>This award is a testament to the dedication and talent of everyone involved in the production. We look forward to sharing more updates as DONOR continues its festival run.</p>
    `,
    relatedLinks: [

      {
        title: 'About Wesley Boone',
        description: 'Meet the director',
        url: '/about',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
      },
      {
        title: 'All Films',
        description: 'Explore our filmography',
        url: '/films',
        icon: 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h3a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3z'
      }
    ]
  },
  {
    id: 'new-project',
    title: 'New Project in Development',
    date: 'January 10, 2025',
    image: '/Old-Hollywood.jpg',
    excerpt: 'We\'re excited to announce our upcoming thriller project set to begin production this spring...',
    content: `
      <p>NoHomework Productions is excited to announce our latest project currently in development. This new thriller will push the boundaries of storytelling and showcase our commitment to creating compelling, character-driven narratives.</p>
      
      <p>Pre-production is underway with casting and location scouting in progress. The project represents an evolution in our filmmaking approach, incorporating new techniques and technologies while maintaining our focus on authentic human stories.</p>
      
      <p>More details will be revealed in the coming months as we move closer to principal photography. Stay tuned for casting announcements and behind-the-scenes content.</p>
    `,
    relatedLinks: [
      {
        title: 'Current Projects',
        description: 'See what we\'re working on',
        url: '/films',
        icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
      },
      {
        title: 'About Our Team',
        description: 'Meet the filmmakers',
        url: '/about',
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
      }
    ]
  },
  {
    id: 'collect-call-bts',
    title: 'Behind the Scenes: Collect Call',
    date: 'January 5, 2025',
    image: '/some.png',
    excerpt: 'Take a look behind the scenes of our 2023 production Collect Call and the creative process...',
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <img src="/scene-photos/collect-call/bts1.jpeg" alt="Director Wesley Boone on set" class="rounded-lg shadow-lg w-full" />
        <img src="/scene-photos/collect-call/bts2.jpeg" alt="Lighting setup for key scene" class="rounded-lg shadow-lg w-full" />
      </div>
      
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <div class="my-8">
        <img src="/scene-photos/collect-call/bts3.jpeg" alt="Cast and crew during filming" class="rounded-lg shadow-lg w-full max-w-3xl mx-auto" />
      </div>
      
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <img src="/scene-photos/collect-call/bts4.jpeg" alt="Equipment setup" class="rounded-lg shadow-lg w-full" />
        <img src="/scene-photos/collect-call/bts5.jpeg" alt="Behind the camera" class="rounded-lg shadow-lg w-full" />
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <img src="/scene-photos/collect-call/bts6.jpeg" alt="Final shot setup" class="rounded-lg shadow-lg w-full" />
        <img src="/scene-photos/collect-call/bts7.jpeg" alt="Cast preparation" class="rounded-lg shadow-lg w-full" />
        <img src="/scene-photos/collect-call/bts8.jpeg" alt="Wrap celebration" class="rounded-lg shadow-lg w-full" />
      </div>
    `,
    relatedLinks: [
      {
        title: 'Watch Now',
        description: 'Experience the horror short',
        url: '/film?film=Collect Call',
        icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
      },
      {
        title: 'Behind the Scenes',
        description: 'More production insights',
        url: '/films',
        icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
      }
    ]
  }
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
      <div className="min-h-screen bg-gray-50">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-6 text-gray-900">Latest News</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest from NoHomework Productions
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