import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { getPosterUrl } from '../lib/tmdb';
import { useTMDBConfig } from '../lib/TMDBConfigContext';

export default function TopIMDB() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tmdbConfig = useTMDBConfig();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&sort_by=vote_average.desc&vote_count.gte=1000&page=1`)
      .then(res => res.json())
      .then(data => {
        console.log('TopIMDB API:', data);
        setMovies(data.results || []);
      })
      .catch((err) => {
        console.error('TopIMDB API error:', err);
        setError('Failed to fetch top rated movies');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-semibold mb-6 w-full">Top Rated Movies</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-3 w-full">
          {Array.from({ length: 20 }).map((_, idx) => (
            <div key={idx} className="rounded-lg bg-gray-800 animate-pulse h-60 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-3 w-full">
          {movies.slice(0, 20).map((item) => (
            <MovieCard
              key={item.id}
              id={item.id}
              title={item.title}
              year={item.release_date ? item.release_date.slice(0, 4) : ''}
              quality={item.vote_average >= 7 ? 'HD' : undefined}
              poster={getPosterUrl(item.poster_path, tmdbConfig.images)}
              rating={item.vote_average ? item.vote_average.toFixed(1) : undefined}
              duration={item.runtime ? `${item.runtime} min` : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
} 