'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { VideoIcon, PosterIcon } from '../components/Icons';

const galleryData: Record<string, { images: Array<{ src: string; alt: string; type: string; height: string; artist?: string; artistInfo?: string }> }> = {
  'collect call': {
    images: [
      { src: '/scene-photos/collect-call/poster1.jpg', alt: 'Official Poster', type: 'Poster', height: 'tall', artist: 'Artist Name', artistInfo: 'Brief description of the artist or their work on this poster' },
      { src: '/scene-photos/collect-call/poster2.png', alt: 'Alternative Poster', type: 'Poster', height: 'tall', artist: 'Artist Name', artistInfo: 'Brief description of the artist or their work on this poster' },
      { src: '/scene-photos/collect-call/poster3.jpg', alt: 'Third Poster', type: 'Poster', height: 'tall', artist: 'Artist Name', artistInfo: 'Brief description of the artist or their work on this poster' },
      { src: '/scene-photos/collect-call/bts1.jpeg', alt: 'Director Wesley Boone on set', type: 'BTS', height: 'tall' },
      { src: '/scene-photos/collect-call/bts2.jpeg', alt: 'Improvisioned setup to get the shot', type: 'BTS', height: 'medium' },
      { src: '/scene-photos/collect-call/bts3.jpeg', alt: 'Fog machine magic', type: 'BTS', height: 'short' },
      { src: '/scene-photos/collect-call/bts4.jpeg', alt: 'Garrett Boone - clapper loader extraordinaire', type: 'BTS', height: 'medium' },
      { src: '/scene-photos/collect-call/bts5.jpeg', alt: 'Lighting setup for night scene', type: 'BTS', height: 'tall' },
      { src: '/scene-photos/collect-call/bts7.jpeg', alt: '', type: 'BTS', height: 'medium' }
    ]
  },
  'donor': {
    images: [
      { src: '/scene-photos/donor/poster1.jpg', alt: 'Donor Official Poster', type: 'Poster', height: 'tall' },
      { src: '/scene-photos/donor/poster2.png', alt: 'Donor Alternative Poster', type: 'Poster', height: 'tall' },
      { src: '/scene-photos/donor/poster3.jpg', alt: 'Donor Third Poster', type: 'Poster', height: 'tall' },
      { src: '/scene-photos/donor/poster4.png', alt: 'Donor Fourth Poster', type: 'Poster', height: 'tall' },
      { src: '/scene-photos/donor/poster5.jpg', alt: 'Donor Fifth Poster', type: 'Poster', height: 'tall' },
      { src: '/scene-photos/donor/poster6.jpg', alt: 'Donor Sixth Poster', type: 'Poster', height: 'tall' },
      { src: '/scene-photos/donor/bts1.jpg', alt: 'JaCayla Smith (Lighting Tech) channeling her inner Jedi', type: 'BTS', height: 'medium' },
      { src: '/scene-photos/donor/bts2.jpg', alt: 'Producer Paige Ferrant standing in to get the shot for Director of Photography Brian McAllister', type: 'BTS', height: 'tall' },
      { src: '/scene-photos/donor/bts3.jpg', alt: 'Production Designer Caleb Jobe making sure the fake baby\'s head is glistening', type: 'BTS', height: 'short' },
      { src: '/scene-photos/donor/bts4.jpg', alt: 'Tre Wilson (Assistant Camera) vanity shot between takes', type: 'BTS', height: 'medium' },
      { src: '/scene-photos/donor/bts5.jpg', alt: 'Gordy Cassel as Beth prepping for dramatic scene', type: 'BTS', height: 'tall' },
      { src: '/scene-photos/donor/bts6.jpg', alt: 'Troy McClannahan (Audio Recordist) and Sara Patterson (Gaffer) goofing and gaffing', type: 'BTS', height: 'medium' },
      { src: '/scene-photos/donor/bts7.jpg', alt: 'Sara Patterson (Gaffer) prepping the lighting for scene', type: 'BTS', height: 'short' },
      { src: '/scene-photos/donor/bts8.jpg', alt: 'Wesley Boone (Director) evaluates the area for the perfect shot', type: 'BTS', height: 'tall' },
      { src: '/scene-photos/donor/bts9.jpg', alt: 'Gordy Cassel as Beth prepares to knock out the next scene', type: 'BTS', height: 'medium' }
    ]
  },
  'dead air': {
    images: [
      { src: '/scene-photos/dead-air/poster1.jpg', alt: 'Dead Air Official Poster', type: 'Poster', height: 'tall' },
      { src: '/scene-photos/dead-air/poster2.jpg', alt: 'Dead Air Alternative Poster', type: 'Poster', height: 'tall' },
      { src: '/scene-photos/dead-air/bts1.jpg', alt: 'Camera tech JaCayla Smith and director of photography Brian Mcallister on set at Laugh Out Loud Comedy Club', type: 'BTS', height: 'medium' },
      { src: '/scene-photos/dead-air/bts2.jpg', alt: 'Matt Margheim (Brendan) on set at Laugh Out Loud Comedy Club', type: 'BTS', height: 'tall' },
      { src: '/scene-photos/dead-air/bts3.jpg', alt: 'Writer/Director Trevor L. Poole frames a shot on set at The Wedding Chapel at Bellevue Place.' , type: 'BTS', height: 'short' },
      { src: '/scene-photos/dead-air/bts4.jpg', alt: 'Wesley Boone (Joey) mean-mugs the camera on set at Laugh Out Loud Comedy Club.', type: 'BTS', height: 'medium' },
      { src: '/scene-photos/dead-air/bts5.jpg', alt: 'Writer/Director Trevor L. Poole studies the monitor during a shot at Laugh Out Loud Comedy Club.', type: 'BTS', height: 'tall' },
      { src: '/scene-photos/dead-air/bts6.jpg', alt: 'Camera tech JaCayla Smith prepares the slate at Laugh Out Loud Comedy Club.', type: 'BTS', height: 'medium' },
      { src: '/scene-photos/dead-air/bts7.jpg', alt: 'Director of photography Brian McAllister frames a shot on set at Laugh Out Loud Comedy Club.', type: 'BTS', height: 'short' },
      { src: '/scene-photos/dead-air/bts8.jpg', alt: 'Camera tech JaCayla Smith and Writer/Director Trevor L. Poole practice a camera movement on set at Laugh Out Loud Comedy Club.', type: 'BTS', height: 'tall' },
      { src: '/scene-photos/dead-air/bts9.jpg', alt: 'Sara Patterson (Leigh) shines during scene shot at Laugh Out Loud Comedy Club.', type: 'BTS', height: 'medium' },
      { src: '/scene-photos/dead-air/bts10.jpg', alt: 'Lighting tech Tre Wilson and executive producer Justus Boone watch on as Wesley (Joey) screws around on stage at Laugh Out Loud Comedy Club.', type: 'BTS', height: 'short' }
    ]
  }
};

function GalleryContent() {
  const searchParams = useSearchParams();
  const filmName = searchParams.get('film');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; type: string; height: string; artist?: string; artistInfo?: string; film: string; filteredImages: Array<{ src: string; alt: string; type: string; height: string; artist?: string; artistInfo?: string }> } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filmData, setFilmData] = useState<{ images: Array<{ src: string; alt: string; type: string; height: string; artist?: string; artistInfo?: string }> } | null>(null);
  const [filter, setFilter] = useState('BTS');

  useEffect(() => {
    if (filmName) {
      const data = galleryData[filmName.toLowerCase() as keyof typeof galleryData];
      setFilmData(data);
    }
  }, [filmName]);

  if (!filmName || !filmData) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16 flex items-center justify-center">
        <div className="text-center text-black">
          <h1 className="text-4xl font-bold mb-4">Gallery</h1>
          <p className="text-gray-600">Please select a film to view its gallery.</p>
          <Link href="/films" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
            Browse Films
          </Link>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <Link href={`/film?film=${encodeURIComponent(filmName)}`} className="text-blue-400 hover:text-blue-300 mb-6 inline-flex items-center text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {filmName}
        </Link>
        
        <div className="flex justify-between items-center mb-8">
          <div></div>
          <h1 className="text-4xl font-bold text-black">{filmName} Gallery</h1>
          <div className="bg-gray-200 rounded-lg p-1 flex">
            <button
              onClick={() => setFilter('BTS')}
              className={`px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-1 ${
                filter === 'BTS' ? 'bg-white text-black shadow' : 'text-gray-600 hover:text-black'
              }`}
            >
              <VideoIcon />
              BTS
            </button>
            <button
              onClick={() => setFilter('Poster')}
              className={`px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-1 ${
                filter === 'Poster' ? 'bg-white text-black shadow' : 'text-gray-600 hover:text-black'
              }`}
            >
              <PosterIcon />
              Posters
            </button>
          </div>
        </div>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Behind-the-scenes moments and official artwork from {filmName}
        </p>

        {/* Image Grid */}
        <div className={`gap-6 ${
          filter === 'Poster' 
            ? 'flex flex-wrap justify-center items-start' 
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filmData.images.filter(image => image.type === filter).map((image, filteredIndex) => {

            if (image.type === 'Poster') {
              return (
                <div 
                  key={filteredIndex}
                  className="group cursor-pointer transition-all duration-300 w-full max-w-sm mx-2 mb-6"
                  onClick={() => {
                    const filteredImages = filmData.images.filter(img => img.type === filter);
                    setCurrentImageIndex(filteredIndex);
                    setLightboxImage({ ...image, film: filmName, filteredImages });
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg"
                  />
                </div>
              );
            } else {
              return (
                <div 
                  key={filteredIndex}
                  className="group cursor-pointer bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={() => {
                    const filteredImages = filmData.images.filter(img => img.type === filter);
                    setCurrentImageIndex(filteredIndex);
                    setLightboxImage({ ...image, film: filmName, filteredImages });
                  }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600">{image.alt}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* Lightbox */}
        {lightboxImage && filmData && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full">
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Previous Button */}
              {currentImageIndex > 0 && (
                <button
                  onClick={() => {
                    const newIndex = currentImageIndex - 1;
                    const filteredImages = lightboxImage.filteredImages || filmData.images.filter(img => img.type === filter);
                    setCurrentImageIndex(newIndex);
                    setLightboxImage({ ...filteredImages[newIndex], film: filmName, filteredImages });
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              
              {/* Next Button */}
              {lightboxImage.filteredImages && currentImageIndex < lightboxImage.filteredImages.length - 1 && (
                <button
                  onClick={() => {
                    const newIndex = currentImageIndex + 1;
                    const filteredImages = lightboxImage.filteredImages;
                    setCurrentImageIndex(newIndex);
                    setLightboxImage({ ...filteredImages[newIndex], film: filmName, filteredImages });
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
              
              <div className="text-center">
                {(() => {
                  const filteredImages = lightboxImage.filteredImages || filmData.images.filter(img => img.type === filter);
                  const currentImage = filteredImages[currentImageIndex];
                  return (
                    <>
                      <img
                        src={currentImage.src}
                        alt={currentImage.alt}
                        className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl mx-auto"
                      />
                      
                      <div className="mt-6 text-white text-center">
                        {currentImage.type === 'Poster' && currentImage.artist ? (
                          <p className="text-sm text-yellow-300">Artist: {currentImage.artist}</p>
                        ) : (
                          <>
                            <p className="text-lg font-medium">{lightboxImage.film}</p>
                            <p className="text-sm text-gray-300">{currentImage.type} - {currentImage.alt}</p>
                          </>
                        )}
                        <p className="text-xs text-gray-400 mt-2">{currentImageIndex + 1} of {filteredImages.length}</p>
                      </div>
                    </>
                  );
                })()
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-24 flex items-center justify-center text-black">Loading...</div>}>
      <GalleryContent />
    </Suspense>
  );
}