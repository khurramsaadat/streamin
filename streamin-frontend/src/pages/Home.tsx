import { useState, useRef } from 'react';
import MovieCard from '../components/MovieCard';

interface HomeProps {
  search: string;
}

// Featured movies for carousel
const featuredMovies = [
  {
    id: '1',
    title: 'The Sandman',
    image: 'https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg',
    quality: 'HD',
    season: '2',
    episode: '6',
  },
  {
    id: '2',
    title: 'The Old Guard 2',
    image: 'https://images.pexels.com/photos/799102/pexels-photo-799102.jpeg',
    quality: 'HD',
    year: '2025',
    duration: '104m',
  },
  {
    id: '3',
    title: 'Ironheart',
    image: 'https://images.pexels.com/photos/799122/pexels-photo-799122.jpeg',
    quality: 'HD',
    season: '1',
    episode: '6',
  },
  {
    id: '4',
    title: 'Ballerina',
    image: 'https://images.pexels.com/photos/799123/pexels-photo-799123.jpeg',
    quality: 'HD',
    year: '2025',
    duration: '125m',
  },
  {
    id: '5',
    title: 'Thunderbolts*',
    image: 'https://images.pexels.com/photos/799124/pexels-photo-799124.jpeg',
    quality: 'HD',
    year: '2025',
    duration: '127m',
  },
  {
    id: '6',
    title: 'Squid Game',
    image: 'https://images.pexels.com/photos/799125/pexels-photo-799125.jpeg',
    quality: 'HD',
    season: '3',
    episode: '6',
  },
  {
    id: '7',
    title: 'Final Destination Bloodlines',
    image: 'https://images.pexels.com/photos/799126/pexels-photo-799126.jpeg',
    quality: 'HD',
    year: '2025',
    duration: '110m',
  },
];

// Trending movies (separate from featured)
const trendingMovies = [
  {
    id: '8',
    title: 'The Twisters',
    image: 'https://images.pexels.com/photos/799127/pexels-photo-799127.jpeg',
    quality: 'HD',
    year: '2024',
    duration: '87m',
  },
  {
    id: '9',
    title: 'Distant',
    image: 'https://images.pexels.com/photos/799128/pexels-photo-799128.jpeg',
    quality: 'HD',
    year: '2024',
    duration: '105m',
  },
  {
    id: '10',
    title: 'Bring Her Back',
    image: 'https://images.pexels.com/photos/799129/pexels-photo-799129.jpeg',
    quality: 'HD',
    year: '2025',
    duration: '120m',
  },
  // ...add more trending movies
];

// Trending TV shows (mock data)
const trendingTV = [
  {
    id: '11',
    title: 'Squid Game',
    image: 'https://images.pexels.com/photos/799125/pexels-photo-799125.jpeg',
    quality: 'HD',
    season: '3',
    episode: '6',
  },
  {
    id: '12',
    title: 'The Sandman',
    image: 'https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg',
    quality: 'HD',
    season: '2',
    episode: '6',
  },
  // ...add more trending TV shows
];

export default function Home({ search }: HomeProps) {
  const [trendingTab, setTrendingTab] = useState<'movies' | 'tv'>('movies');
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter trending grid by search
  const filteredTrending = (trendingTab === 'movies' ? trendingMovies : trendingTV).filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Carousel scroll logic
  const scrollCarousel = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstElementChild?.clientWidth || 220;
      carouselRef.current.scrollBy({
        left: dir === 'left' ? -cardWidth * 3 : cardWidth * 3,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Carousel */}
      <div className="relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 hover:bg-gray-800 rounded-full p-2 shadow-lg"
          onClick={() => scrollCarousel('left')}
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-10 py-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {featuredMovies.map((movie) => (
            <div key={movie.id} style={{ minWidth: 220, scrollSnapAlign: 'start' }}>
              <MovieCard {...movie} />
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 hover:bg-gray-800 rounded-full p-2 shadow-lg"
          onClick={() => scrollCarousel('right')}
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      {/* Trending Section */}
      <div>
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-1 rounded-t bg-gray-800 text-sm font-semibold ${trendingTab === 'movies' ? 'text-white border-b-2 border-red-500' : 'text-gray-400'}`}
            onClick={() => setTrendingTab('movies')}
          >
            Movies
          </button>
          <button
            className={`px-4 py-1 rounded-t bg-gray-800 text-sm font-semibold ${trendingTab === 'tv' ? 'text-white border-b-2 border-red-500' : 'text-gray-400'}`}
            onClick={() => setTrendingTab('tv')}
          >
            TV Shows
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredTrending.map((item) => (
            <MovieCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
} 