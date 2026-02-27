export default function About() {
    const teamMembers = [
      {
        name: 'Wesley Boone',
        role: 'Director & Executive Producer',
        imageUrl: '/wes.jpeg',
        about: 'The leader of the NHP pack, Wesley spearheads the creative direction of the company, helping cultivate projects alongside Caleb and Justus while continuing to grow as a filmmaker.',
      },
      {
        name: 'Justus Boone',
        role: 'Executive Producer',
        imageUrl: '/justus.jpeg',
        about: 'A meticulous organizer, Justus balances on-set problem solving while being a proactive leader, keeping our projects on schedule and our crew happy.',
      },
      {
        name: 'Caleb Jobe',
        role: 'Executive Producer & Production Designer',
        imageUrl: '/caleb.jpg',
        about: 'Detail oriented with an eye for world building, Caleb takes pride in creating lived-in environments that serve the story without overpowering it.',
      }
    ];
  
    return (
      <div className="min-h-screen bg-white pt-24 pb-16">
        {/* About the Company Section */}
        <section className="w-full max-w-4xl mx-auto text-center py-12 px-6">
          <h2 className="text-4xl font-bold mb-6">About NHP</h2>
          <p className="text-xl leading-relaxed text-gray-700">
            No Homework Productions is a Louisiana-based film production studio founded by Wesley Boone, Justus Boone, Caleb Jobe, and Ian Jobe. What began as kids making films in the backyard has grown into a creative outlet dedicated to impactful storytelling and meaningful collaboration. NHP is focused on cultivating a community of local creators that share a passion for independent filmmaking while focusing telling stories that genuinely connect with audiences.
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
  