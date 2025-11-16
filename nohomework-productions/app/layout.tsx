import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "../styles/globals.css";
import Link from 'next/link';

const playfair_display = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "NHP",
  description: "No Homework Productions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">

      <body
        className={`${playfair_display.variable} antialiased`}
      >
            <header className="text-neutral-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3md font-bold">NoHomework Productions</h1>
          {/* Navbar */}
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-gray-400">Home</Link>
              </li>
              <li>
                <Link href="/films" className="hover:text-gray-400">Films</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-400">About</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-400">Contact</Link>
              </li>
            </ul>
          </nav>

        </div>
      </header>
        {children}
      </body>
      {/* <footer>
      <div className="container mx-auto flex justify-between items-center">
      <ul className="flex space-x-20">
        <li> 
          <ul className="flex space-x-10">
            <li> 
            dsf
            </li>
            <li> 
            dsf
            </li>
            <li> 
            dsf
            </li>
            <li> 
            dsf
            </li>
            </ul>
          </li>
        </ul>
        <p>sadfdsa</p>
        </div>
        </footer> */}
    </html>
  );
}
