import { useEffect, useState } from 'react';
import { FaFilter, FaUser } from 'react-icons/fa';
import MovieCard from '../components/MovieCard';
import { getPopular, getPosterUrl, searchTMDB, fetchTMDB } from '../lib/tmdb';
import { useTMDBConfig } from '../lib/TMDBConfigContext';
import { useLocale } from '../lib/LocaleContext';
import { useLocation, useNavigate } from 'react-router-dom';

interface MoviesProps {
  search: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Movies({ search }: MoviesProps) {
  const [moviesData, setMoviesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tmdbConfig = useTMDBConfig();
  const locale = useLocale();
  const query = useQuery();
  const navigate = useNavigate();

  // Read filter params
  const genreId = query.get('genreId');
  const genre = query.get('genre');
  const castId = query.get('castId');
  const cast = query.get('cast');
  const country = query.get('country');
  const company = query.get('company');

  // Build filter label
  let filterLabel = '';
  if (genre) filterLabel = `Genre: ${genre}`;
  else if (cast) filterLabel = `Cast: ${cast}`;
  else if (country) filterLabel = `Country: ${country}`;
  else if (company) filterLabel = `Production: ${company}`;

  useEffect(() => {
    setLoading(true);
    setError(null);
    let fetchMovies: Promise<any[]>;
    if (genreId) {
      fetchMovies = fetchTMDB('/discover/movie', { with_genres: genreId, page: 1 }, locale).then(r => r.results);
    } else if (castId) {
      fetchMovies = fetchTMDB('/discover/movie', { with_cast: castId, page: 1 }, locale).then(r => r.results);
    } else if (country) {
      fetchMovies = fetchTMDB('/discover/movie', { with_original_language: country, page: 1 }, locale).then(r => r.results);
    } else if (company) {
      fetchMovies = fetchTMDB('/discover/movie', { with_companies: company, page: 1 }, locale).then(r => r.results);
    } else if (search) {
      fetchMovies = searchTMDB('movie', search, 1, locale);
    } else {
      fetchMovies = getPopular('movie', 1, locale);
    }
    fetchMovies
      .then((results) => setMoviesData(results))
      .catch(() => setError('Failed to fetch movies'))
      .finally(() => setLoading(false));
  }, [search, locale.language, locale.region, genreId, castId, country, company]);

  // Clear filter handler
  const handleClearFilter = () => navigate('/movies');

  return (
    <>
      {/* Sticky filter badge */}
      {filterLabel && (
        <div className="sticky top-0 z-30 bg-gray-900 py-2 mb-4 flex items-center gap-2">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full font-semibold text-xs flex items-center gap-2">
            {filterLabel}
            <button
              className="ml-2 bg-gray-800 text-white rounded-full px-2 py-0.5 hover:bg-gray-700"
              onClick={handleClearFilter}
              aria-label="Clear filter"
            >
              ×
            </button>
          </span>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-6 w-full">
        {filterLabel ? `Filtered Movies` : search ? 'Search Results (Movies)' : 'Popular Movies'}
      </h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && moviesData.length === 0 && !error && (
        <div className="text-gray-400">No movies found. Please try again later.</div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full">
        {moviesData.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            imdbID={movie.id}
            title={movie.title}
            year={movie.release_date ? movie.release_date.slice(0, 4) : ''}
            quality={movie.vote_average >= 7 ? 'HD' : undefined}
            poster={getPosterUrl(movie.poster_path, tmdbConfig.images)}
          />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8 mb-4 w-full">
        <button className="px-3 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700">1</button>
        <button className="px-3 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700">2</button>
        <span className="text-gray-500">...</span>
        <button className="px-3 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700">&raquo;</button>
      </div>
    </>
  );
} 