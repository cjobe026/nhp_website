import Link from 'next/link';
import { getArticles } from '@/lib/firestore';

export const revalidate = 60;

const styles = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export default async function NewsPage() {
  const newsArticles = await getArticles();
  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">
      {/* Header Section */}
      <div className="bg-white pt-8 pb-16">
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
            <Link href={`/news/${newsArticles[0].id}`} className="group block">
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
              <Link key={article.id} href={`/news/${article.id}`} className="group block">
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