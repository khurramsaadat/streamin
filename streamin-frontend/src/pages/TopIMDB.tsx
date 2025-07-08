import MovieCard from '../components/MovieCard';

interface TopIMDBProps {
  search: string;
}

const topImdbItems = [
  {
    id: '1',
    imdbID: 'tt0111161', // The Shawshank Redemption
    title: 'The Shawshank Redemption',
    quality: 'HD',
    year: '1994',
    duration: '142m',
  },
  {
    id: '2',
    imdbID: 'tt0068646', // The Godfather
    title: 'The Godfather',
    quality: 'HD',
    year: '1972',
    duration: '175m',
  },
  {
    id: '3',
    imdbID: 'tt0468569', // The Dark Knight
    title: 'The Dark Knight',
    quality: 'HD',
    year: '2008',
    duration: '152m',
  },
  {
    id: '4',
    imdbID: 'tt0944947', // Game of Thrones (TV)
    title: 'Game of Thrones',
    quality: 'HD',
    season: '8',
    episode: '6',
  },
  {
    id: '5',
    imdbID: 'tt0903747', // Breaking Bad (TV)
    title: 'Breaking Bad',
    quality: 'HD',
    season: '5',
    episode: '16',
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
          <MovieCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
} 