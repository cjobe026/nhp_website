// pages/index.tsx

import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="relative w-full max-w-4xl">
          {/* Large central image */}
          <Image
            src="/Old-Hollywood.jpg" // Put your image file here or use a URL
            alt="Film Production"
            width={1200}
            height={800}
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </main>

      {/* Footer (Optional) */}
      <footer className=" text-white p-4 mt-6 text-center">
        <p>&copy; 2025 NoHomework Productions. All rights reserved.</p>
      </footer>
    </div>
  );
}
