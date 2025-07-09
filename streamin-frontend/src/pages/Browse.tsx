import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  media_type: 'movie' | 'tv';
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Browse() {
  const query = useQuery();
  const navigate = useNavigate();
  const genre = query.get('genre');
  const genreId = query.get('genreId');
  const country = query.get('country');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<MediaItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!genreId && !country) return;
      setLoading(true);
      setError(null);
      try {
        let movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${page}`;
        let tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${page}`;
        if (genreId) {
          movieUrl += `&with_genres=${genreId}`;
          tvUrl += `&with_genres=${genreId}`;
        }
        if (country) {
          movieUrl += `&with_origin_country=${country}`;
          tvUrl += `&with_origin_country=${country}`;
        }
        console.log('movieUrl', movieUrl, 'tvUrl', tvUrl);
        const movieRes = await fetch(movieUrl);
        const movieData = await movieRes.json();
        const tvRes = await fetch(tvUrl);
        const tvData = await tvRes.json();
        console.log('Browse Movies API:', movieData);
        console.log('Browse TV API:', tvData);
        const movieItems = (movieData.results || []).map((item: any) => ({ ...item, media_type: 'movie' }));
        const tvItems = (tvData.results || []).map((item: any) => ({ ...item, media_type: 'tv' }));
        const combined = [...movieItems, ...tvItems];
        setResults(combined);
        setTotalPages(Math.max(movieData.total_pages, tvData.total_pages));
        console.log('movieData', movieData, 'tvData', tvData, 'combined', combined);
      } catch (err) {
        console.error('Browse API error:', err);
        setError('Failed to fetch results');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [genreId, country, page]);

  const handleClearFilters = () => {
    navigate('/browse');
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="sticky top-0 z-10 bg-gray-900 py-2 mb-4 flex items-center gap-2 flex-wrap">
        {genre && (
          <span className="bg-red-600 text-white px-4 py-1 rounded-full font-semibold flex items-center gap-2">
            Genre: {genre}
            <button onClick={handleClearFilters} className="ml-2 text-white hover:text-gray-200" aria-label="Clear filters">&times;</button>
          </span>
        )}
        {country && (
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full font-semibold flex items-center gap-2">
            Country: {country}
            <button onClick={handleClearFilters} className="ml-2 text-white hover:text-gray-200" aria-label="Clear filters">&times;</button>
          </span>
        )}
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <h2 className="text-2xl font-bold mb-4">Filtered Results</h2>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-3">
          {Array.from({ length: 20 }).map((_, idx) => (
            <div key={idx} className="rounded-lg bg-gray-800 animate-pulse h-60 w-full" />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-8">No results found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-3">
          {results.map(item => (
            <MovieCard
              key={item.id + '-' + item.media_type}
              id={String(item.id)}
              title={item.title || item.name || ''}
              year={(item.release_date || item.first_air_date || '').slice(0, 4)}
              poster={item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : undefined}
              rating={item.vote_average ? item.vote_average.toFixed(1) : undefined}
              // For TV shows, override the link in MovieCard
              {...(item.media_type === 'tv' ? { customLink: `/tv-shows/${item.id}` } : {})}
            />
          ))}
        </div>
      )}
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 