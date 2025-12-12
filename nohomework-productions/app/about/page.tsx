export default function About() {
    const teamMembers = [
      {
        name: 'Wesley Boone',
        role: 'Director',
        imageUrl: '/wes.jpeg',
        about: 'Writer, director, actor with over a decade of experience starting at childhood and the leader of our pack.',
      },
      {
        name: 'Justus Boone',
        role: 'CTO',
        imageUrl: '/justus.jpeg',
        about: 'FULL OF PISS AND VIN',
      },
      {
        name: 'Caleb Jobe',
        role: 'Whittle guy',
        imageUrl: '/caleb.jpg.webp',
        about: 'mhm',
      }
    ];
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        {/* About the Company Section */}
        <section className="w-full max-w-4xl text-center py-10">
          <h2 className="text-4xl font-bold">About NHP</h2>
          <p className="mt-4 text-xl">
            NHP - oil baron zemography
          </p>
        </section>
  
        {/* Team Section */}
        <section className="w-full max-w-6xl py-12">
          <h3 className="text-3xl font-bold text-center mb-8">Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  className="w-64 h-64 mx-auto rounded-xl shadow-lg mb-4 object-cover"
                  src={member.imageUrl}
                  alt={member.name}
                />
                <h4 className="text-xl font-semibold">
                  {member.name === 'Wesley Boone' ? (
                    <a href="https://www.imdb.com/name/nm12478593" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                      {member.name}
                    </a>
                  ) : (
                    member.name
                  )}
                </h4>
                <p className="text-md text-gray-500">{member.role}</p>
                <p className="mt-2 text-sm text-gray-700">{member.about}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
  