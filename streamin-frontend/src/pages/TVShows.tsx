import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { getPopular, getPosterUrl, searchTMDB } from '../lib/tmdb';
import { useTMDBConfig } from '../lib/TMDBConfigContext';
import { useLocale } from '../lib/LocaleContext';

interface TVShowsProps {
  search?: string;
}

export default function TVShows({ search = '' }: TVShowsProps) {
  const [shows, setShows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tmdbConfig = useTMDBConfig();
  const locale = useLocale();

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchShows = search
      ? searchTMDB('tv', search, 1, locale)
      : getPopular('tv', 1, locale);
    fetchShows
      .then((results: any[]) => {
        console.log('TV Shows API results:', results);
        setShows(results);
      })
      .catch((err) => {
        console.error('TV Shows API error:', err);
        setError('Failed to fetch TV shows');
      })
      .finally(() => setLoading(false));
  }, [search, locale.language, locale.region]);

  const filtered = shows;

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-semibold mb-6 w-full">{search ? 'Search Results (TV Shows)' : 'Popular TV Shows'}</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-3">
          {Array.from({ length: 20 }).map((_, idx) => (
            <div key={idx} className="rounded-lg bg-gray-800 animate-pulse h-60 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-3">
          {shows.map((show) => (
            <MovieCard
              key={show.id}
              id={show.id}
              title={show.name}
              year={show.first_air_date ? show.first_air_date.slice(0, 4) : ''}
              quality={show.vote_average >= 7 ? 'HD' : undefined}
              poster={getPosterUrl(show.poster_path, tmdbConfig.images)}
              rating={show.vote_average ? show.vote_average.toFixed(1) : undefined}
              duration={show.episode_run_time && show.episode_run_time.length > 0 ? `${show.episode_run_time[0]} min` : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
} 