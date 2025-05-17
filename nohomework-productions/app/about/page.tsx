export default function About() {
    const teamMembers = [
      {
        name: 'Wesley Boone',
        role: 'Director',
        imageUrl: 'https://via.placeholder.com/150',
        about: 'HES A GROWTH',
      },
      {
        name: 'Justus Boone',
        role: 'CTO',
        imageUrl: 'https://via.placeholder.com/150',
        about: 'FULL OF PISS AND VIN',
      },
      {
        name: 'Caleb Jobe',
        role: 'Whittle guy',
        imageUrl: 'https://via.placeholder.com/150',
        about: 'mhm',
      },
      {
        name: 'monsieur Trevor',
        role: 'Writer',
        imageUrl: 'https://via.placeholder.com/150',
        about: 'The red rifle',
      },
      {
        name: 'Charlie candleson',
        role: 'Product Manager',
        imageèrl: 'https://via.placeholder.com/150',
        about: 'bull worm',
      },
      {
        name: 'village Greenback johnson',
        role: 'Operations Manager',
        imageUrl: 'https://via.placeholder.com/150',
        about: 'Diana keeps the gears of the company running smoothly. Her strategic oversight ensures efficiency and smooth operations.',
      }
    ];
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
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
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                  src={member.imageUrl}
                  alt={member.name}
                />
                <h4 className="text-xl font-semibold">{member.name}</h4>
                <p className="text-md text-gray-500">{member.role}</p>
                <p className="mt-2 text-sm text-gray-700">{member.about}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
  