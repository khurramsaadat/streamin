import MovieCard from '../components/MovieCard';

interface TopIMDBProps {
  search: string;
}

const topImdbItems = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    quality: 'HD',
    year: '1994',
    duration: '142 min',
    rating: '9.3',
    poster: '', // Add poster URL if available
  },
  {
    id: '2',
    title: 'The Godfather',
    quality: 'HD',
    year: '1972',
    duration: '175 min',
    rating: '9.2',
    poster: '',
  },
  {
    id: '3',
    title: 'The Dark Knight',
    quality: 'HD',
    year: '2008',
    duration: '152 min',
    rating: '9.0',
    poster: '',
  },
  {
    id: '4',
    title: 'Game of Thrones',
    quality: 'HD',
    season: '8',
    episode: '6',
    rating: '9.2',
    poster: '',
  },
  {
    id: '5',
    title: 'Breaking Bad',
    quality: 'HD',
    season: '5',
    episode: '16',
    rating: '9.5',
    poster: '',
  },
  // ...add more top IMDB movies and TV shows
];

export default function TopIMDB({ search }: TopIMDBProps) {
  const filtered = topImdbItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-semibold mb-6 w-full">Top IMDB Movies & TV Shows</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full">
        {filtered.map((item) => (
          <MovieCard
            key={item.id}
            id={item.id}
            title={item.title}
            year={item.year}
            quality={item.quality}
            duration={item.duration ? item.duration : 'N/A'}
            rating={item.rating ? item.rating : undefined}
            poster={item.poster}
          />
        ))}
      </div>
    </div>
  );
} 