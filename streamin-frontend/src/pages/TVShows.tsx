import MovieCard from '../components/MovieCard';

interface TVShowsProps {
  search: string;
}

const tvShows = [
  {
    id: '1',
    title: 'Squid Game',
    image: 'https://images.pexels.com/photos/799125/pexels-photo-799125.jpeg',
    quality: 'HD',
    season: '3',
    episode: '6',
  },
  {
    id: '2',
    title: 'The Sandman',
    image: 'https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg',
    quality: 'HD',
    season: '2',
    episode: '6',
  },
  {
    id: '3',
    title: 'Ironheart',
    image: 'https://images.pexels.com/photos/799122/pexels-photo-799122.jpeg',
    quality: 'HD',
    season: '1',
    episode: '6',
  },
  // ...add more mock TV shows
];

export default function TVShows({ search }: TVShowsProps) {
  const filtered = tvShows.filter((show) =>
    show.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-semibold mb-6 w-full">Popular TV Shows</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
        {filtered.map((show) => (
          <MovieCard key={show.id} {...show} />
        ))}
      </div>
    </div>
  );
} 