import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { getPopular, getPosterUrl, searchTMDB } from '../lib/tmdb';
import { useTMDBConfig } from '../lib/TMDBConfigContext';
import { useLocale } from '../lib/LocaleContext';

interface TVShowsProps {
  search: string;
}

export default function TVShows({ search }: TVShowsProps) {
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
      .then((results) => setShows(results))
      .catch(() => setError('Failed to fetch popular TV shows'))
      .finally(() => setLoading(false));
  }, [search, locale.language, locale.region]);

  const filtered = shows;

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-semibold mb-6 w-full">{search ? 'Search Results (TV Shows)' : 'Popular TV Shows'}</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full">
        {filtered.map((show) => (
          <MovieCard
            key={show.id}
            id={show.id}
            imdbID={show.id}
            title={show.name}
            year={show.first_air_date ? show.first_air_date.slice(0, 4) : ''}
            quality={show.vote_average >= 7 ? 'HD' : undefined}
            poster={getPosterUrl(show.poster_path, tmdbConfig.images)}
          />
        ))}
      </div>
    </div>
  );
} 