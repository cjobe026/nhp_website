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
      <div className="min-h-screen bg-white pt-24 pb-16">
        {/* About the Company Section */}
        <section className="w-full max-w-4xl mx-auto text-center py-12 px-6">
          <h2 className="text-4xl font-bold mb-6">About NHP</h2>
          <p className="text-xl leading-relaxed text-gray-700">
            NoHomework Productions is a Louisiana-based film production studio founded by Wesley Boone and Ian Jobe. The studio represents a collective creative effort from frequent collaborators, both local and beyond. We are passionate about making films that truly connect with people—and ensuring our crew enjoys the process every step of the way.
          </p>
        </section>
  
        {/* Team Section */}
        <section className="w-full max-w-6xl mx-auto py-12 px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                {member.name === 'Wesley Boone' ? (
                  <a href="https://www.imdb.com/name/nm12478593" target="_blank" rel="noopener noreferrer">
                    <img
                      className="w-64 h-64 mx-auto rounded-xl shadow-lg mb-4 object-cover hover:opacity-80 transition-opacity cursor-pointer"
                      src={member.imageUrl}
                      alt={member.name}
                    />
                  </a>
                ) : (
                  <img
                    className="w-64 h-64 mx-auto rounded-xl shadow-lg mb-4 object-cover"
                    src={member.imageUrl}
                    alt={member.name}
                  />
                )}
                <h4 className="text-xl font-semibold mb-1">
                  {member.name === 'Wesley Boone' ? (
                    <a href="https://www.imdb.com/name/nm12478593" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                      {member.name}
                    </a>
                  ) : (
                    member.name
                  )}
                </h4>
                <p className="text-md text-gray-500 mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.about}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
  