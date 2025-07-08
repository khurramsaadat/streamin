import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { getTrending, getPosterUrl, searchTMDB } from '../lib/tmdb';
import { useTMDBConfig } from '../lib/TMDBConfigContext';
import { useLocale } from '../lib/LocaleContext';

interface HomeProps {
  search: string;
}

function truncateTitle(title: string) {
  return title.length > 20 ? title.slice(0, 20) + '...' : title;
}

export default function Home({ search }: HomeProps) {
  const [moviesData, setMoviesData] = useState<any[]>([]);
  const [showsData, setShowsData] = useState<any[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingShows, setLoadingShows] = useState(true);
  const [errorMovies, setErrorMovies] = useState<string | null>(null);
  const [errorShows, setErrorShows] = useState<string | null>(null);
  const tmdbConfig = useTMDBConfig();
  const locale = useLocale();

  useEffect(() => {
    setLoadingMovies(true);
    setErrorMovies(null);
    const fetchMovies = search
      ? searchTMDB('movie', search, 1, locale)
      : getTrending('movie', 1, locale);
    fetchMovies
      .then((results: any[]) => setMoviesData(results))
      .catch(() => setErrorMovies('Failed to fetch trending movies'))
      .finally(() => setLoadingMovies(false));
  }, [search, locale.language, locale.region]);

  useEffect(() => {
    setLoadingShows(true);
    setErrorShows(null);
    const fetchShows = search
      ? searchTMDB('tv', search, 1, locale)
      : getTrending('tv', 1, locale);
    fetchShows
      .then((results: any[]) => setShowsData(results))
      .catch(() => setErrorShows('Failed to fetch trending TV shows'))
      .finally(() => setLoadingShows(false));
  }, [search, locale.language, locale.region]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-12">
      {/* Movies Section */}
      <section className="w-full">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-semibold w-full">{search ? 'Search Results (Movies)' : 'Trending Movies'}</h2>
        </div>
        {errorMovies && <div className="text-red-500">{errorMovies}</div>}
        {!loadingMovies && moviesData.length === 0 && !errorMovies && (
          <div className="text-gray-400">No movies found. Please try again later.</div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mx-auto">
          {moviesData.map((item) => (
            <MovieCard
              key={item.id}
              id={item.id}
              title={truncateTitle(item.title)}
              year={item.release_date ? item.release_date.slice(0, 4) : ''}
              quality={item.vote_average >= 7 ? 'HD' : undefined}
              poster={getPosterUrl(item.poster_path, tmdbConfig.images)}
              rating={item.vote_average ? item.vote_average.toFixed(1) : undefined}
              duration={item.runtime ? `${item.runtime} min` : 'N/A'}
            />
          ))}
        </div>
      </section>
      {/* TV Shows Section */}
      <section className="w-full">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-semibold w-full">{search ? 'Search Results (TV Shows)' : 'Trending TV Shows'}</h2>
        </div>
        {errorShows && <div className="text-red-500">{errorShows}</div>}
        {!loadingShows && showsData.length === 0 && !errorShows && (
          <div className="text-gray-400">No TV shows found. Please try again later.</div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mx-auto">
          {showsData.map((item) => (
            <MovieCard
              key={item.id}
              id={item.id}
              title={truncateTitle(item.name)}
              year={item.first_air_date ? item.first_air_date.slice(0, 4) : ''}
              quality={item.vote_average >= 7 ? 'HD' : undefined}
              poster={getPosterUrl(item.poster_path, tmdbConfig.images)}
              rating={item.vote_average ? item.vote_average.toFixed(1) : undefined}
              duration={item.episode_run_time && item.episode_run_time.length > 0 ? `${item.episode_run_time[0]} min` : 'N/A'}
            />
          ))}
        </div>
      </section>
    </div>
  );
} 