import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { getTrending, getPopular, fetchTMDB, getPosterUrl, searchTMDB } from '../lib/tmdb';
import { useTMDBConfig } from '../lib/TMDBConfigContext';
import { useLocale } from '../lib/LocaleContext';

interface HomeProps {
  search?: string;
}

function truncateTitle(title: string) {
  return title.length > 20 ? title.slice(0, 20) + '...' : title;
}

export default function Home({ search = '' }: HomeProps) {
  const [trendingToday, setTrendingToday] = useState<any[]>([]);
  const [trendingWeek, setTrendingWeek] = useState<any[]>([]);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [trendingTV, setTrendingTV] = useState<any[]>([]);
  const [popularTV, setPopularTV] = useState<any[]>([]);
  const [popularAnime, setPopularAnime] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tmdbConfig = useTMDBConfig();
  const locale = useLocale();

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetchTMDB('/trending/movie/day', { page: 1 }, locale),
      fetchTMDB('/trending/movie/week', { page: 1 }, locale),
      getPopular('movie', 1, locale),
      fetchTMDB('/trending/tv/day', { page: 1 }, locale),
      getPopular('tv', 1, locale),
      // Popular Anime: fetch both movies and TV shows with genre 16 (Animation)
      Promise.all([
        fetchTMDB('/discover/movie', { with_genres: 16, sort_by: 'popularity.desc', page: 1 }, locale),
        fetchTMDB('/discover/tv', { with_genres: 16, sort_by: 'popularity.desc', page: 1 }, locale),
      ]),
    ])
      .then(([
        trendingTodayRes,
        trendingWeekRes,
        popularMoviesRes,
        trendingTVRes,
        popularTVRes,
        [animeMoviesRes, animeTVRes],
      ]) => {
        setTrendingToday(trendingTodayRes.results?.slice(0, 20) || []);
        setTrendingWeek(trendingWeekRes.results?.slice(0, 20) || []);
        setPopularMovies(popularMoviesRes.slice(0, 20) || []);
        setTrendingTV(trendingTVRes.results?.slice(0, 20) || []);
        setPopularTV(popularTVRes.slice(0, 20) || []);
        // Merge and sort anime movies and TV shows by popularity
        const animeCombined = [...(animeMoviesRes.results || []), ...(animeTVRes.results || [])]
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
          .slice(0, 20);
        setPopularAnime(animeCombined);
      })
      .catch((err) => {
        setError('Failed to fetch data.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [search, locale.language, locale.region]);

  // Search filter: filter all sections by title/name
  const filterBySearch = (items: any[]) =>
    search
      ? items.filter(
          (item) =>
            (item.title && item.title.toLowerCase().includes(search.toLowerCase())) ||
            (item.name && item.name.toLowerCase().includes(search.toLowerCase()))
        )
      : items;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-12 pt-4 sm:pt-8">
      {/* Introductory Text */}
      <div className="w-full max-w-5xl text-center mb-2 px-2">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Welcome to <span className="text-primary">AI flix</span></h1>
        <p className="text-base sm:text-lg text-gray-400">Discover trending movies, TV shows, and anime!</p>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div className="w-full text-center py-12">Loading...</div>
      ) : (
        <>
          {/* Trending Today */}
          <section className="w-full">
            <h2 className="text-xl font-semibold mb-2">Trending Today</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 portrait:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-4 portrait:px-6">
              {filterBySearch(trendingToday).map((item) => (
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
          {/* Trending This Week */}
          <section className="w-full">
            <h2 className="text-xl font-semibold mb-2">Trending This Week</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 portrait:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-4 portrait:px-6">
              {filterBySearch(trendingWeek).map((item) => (
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
          {/* Popular Movies */}
          <section className="w-full">
            <h2 className="text-xl font-semibold mb-2">Popular Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 portrait:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-4 portrait:px-6">
              {filterBySearch(popularMovies).map((item) => (
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
          {/* Trending TV Shows */}
          <section className="w-full">
            <h2 className="text-xl font-semibold mb-2">Trending TV Shows</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 portrait:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-4 portrait:px-6">
              {filterBySearch(trendingTV).map((item) => (
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
          {/* Popular TV Shows */}
          <section className="w-full">
            <h2 className="text-xl font-semibold mb-2">Popular TV Shows</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 portrait:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-4 portrait:px-6">
              {filterBySearch(popularTV).map((item) => (
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
          {/* Popular Anime */}
          <section className="w-full">
            <h2 className="text-xl font-semibold mb-2">Popular Anime</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 portrait:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-4 portrait:px-6">
              {filterBySearch(popularAnime).map((item) => (
                <MovieCard
                  key={item.id}
                  id={item.id}
                  title={truncateTitle(item.title || item.name)}
                  year={item.release_date ? item.release_date.slice(0, 4) : item.first_air_date ? item.first_air_date.slice(0, 4) : ''}
                  quality={item.vote_average >= 7 ? 'HD' : undefined}
                  poster={getPosterUrl(item.poster_path, tmdbConfig.images)}
                  rating={item.vote_average ? item.vote_average.toFixed(1) : undefined}
                  duration={item.runtime ? `${item.runtime} min` : item.episode_run_time && item.episode_run_time.length > 0 ? `${item.episode_run_time[0]} min` : 'N/A'}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
} 