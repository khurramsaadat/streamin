import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTMDBConfig } from '../lib/TMDBConfigContext';
import { useLocale } from '../lib/LocaleContext';
import type { Genre } from '../types';

const FALLBACK_VIDEO = 'https://www.w3schools.com/html/mov_bbb.mp4';

export default function MovieDetails() {
  const { id } = useParams();
  const tmdbConfig = useTMDBConfig();
  const locale = useLocale();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${locale.language}`);
        if (!res.ok) throw new Error('Movie not found');
        const data = await res.json();
        setMovie(data);
        // Fetch videos (trailers)
        const vres = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${locale.language}`);
        const vdata = await vres.json();
        const trailer = vdata.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
        setVideoKey(trailer ? trailer.key : null);
        // Fetch credits (cast)
        const cres = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${locale.language}`);
        const cdata = await cres.json();
        setCast(cdata.cast && cdata.cast.length > 0 ? cdata.cast.slice(0, 5) : []);
      } catch (e: any) {
        setError(e.message || 'Movie not found');
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchMovie();
  }, [id, locale.language]);

  if (loading) return <div className="text-xl text-center py-12">Loading...</div>;
  if (error || !movie) return <div className="text-xl text-center py-12">Movie not found.</div>;

  const posterUrl = movie.poster_path ? `${tmdbConfig.images.base_url}w500${movie.poster_path}` : '/popcorn-placeholder.jpg';
  const backdropUrl = movie.backdrop_path ? `${tmdbConfig.images.base_url}w1280${movie.backdrop_path}` : posterUrl;
  const genres: Genre[] = movie.genres || [];
  const companies = movie.production_companies || [];
  const countries = movie.production_countries || [];

  // Handlers for clickable filters
  const handleCastClick = (person: any) => navigate(`/movies?cast=${encodeURIComponent(person.name)}&castId=${person.id}`);
  const handleGenreClick = (genre: Genre) => navigate(`/movies?genre=${encodeURIComponent(genre.name)}&genreId=${genre.id}`);
  const handleCountryClick = (country: any) => navigate(`/movies?country=${encodeURIComponent(country.iso_3166_1)}`);
  const handleCompanyClick = (company: any) => navigate(`/movies?company=${encodeURIComponent(company.id)}`);

  return (
    <div className="max-w-5xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6 mt-4">
      <Link to="/movies" className="text-red-400 hover:underline mb-4 inline-block">&larr; Back to Movies</Link>
      <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden mb-6">
        <img src={backdropUrl} alt={movie.title + ' backdrop'} className="w-full h-full object-cover" />
        {!showPlayer && (
          <button
            className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-40 hover:bg-opacity-60 transition"
            onClick={() => setShowPlayer(true)}
            aria-label="Play trailer"
          >
            <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 84 84"><circle cx="42" cy="42" r="42" fill="rgba(0,0,0,0.5)"/><polygon points="33,24 67,42 33,60" fill="#fff"/></svg>
          </button>
        )}
        {showPlayer && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90">
            {videoKey ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                title="Movie Trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="rounded-lg w-full h-full"
              />
            ) : (
              <video controls autoPlay className="rounded-lg w-full h-full bg-black">
                <source src={FALLBACK_VIDEO} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full px-3 py-1"
              onClick={() => setShowPlayer(false)}
              aria-label="Close video player"
            >
              ×
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <img src={posterUrl} alt={movie.title + ' poster'} className="w-full md:w-64 h-80 object-cover rounded" />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2 text-white">{movie.title}</h2>
          <div className="flex gap-2 items-center mb-2">
            {movie.release_date && (
              <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200">{movie.release_date.slice(0, 4)}</span>
            )}
            <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200">{movie.runtime ? `${movie.runtime} min` : 'N/A'}</span>
            {typeof movie.vote_average === 'number' && movie.vote_average > 0 && (
              <span
                className="bg-yellow-400 text-black text-xs px-3 py-0.5 rounded font-bold shadow ml-2"
                title={`User rating: ${movie.vote_average.toFixed(1)}/10`}
                aria-label={`User rating: ${movie.vote_average.toFixed(1)}/10`}
              >
                {movie.vote_average.toFixed(1)}
              </span>
            )}
          </div>
          <p className="mb-4 text-gray-300">{movie.overview}</p>
          <div className="mb-4">
            <span className="font-semibold text-white">Cast: </span>
            <span className="text-gray-300">
              {cast.length > 0
                ? cast.map((person, idx) => (
                    <span
                      key={person.id}
                      className="hover:underline hover:text-red-400 cursor-pointer"
                      onClick={() => handleCastClick(person)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Show movies with ${person.name}`}
                    >
                      {person.name}{idx < cast.length - 1 ? ', ' : ''}
                    </span>
                  ))
                : 'N/A'}
            </span>
          </div>
          <div className="mb-2 text-gray-300">
            <span className="font-semibold">Released:</span> {movie.release_date || 'N/A'}<br />
            <span className="font-semibold">Genre:</span>{' '}
            {genres.length > 0
              ? genres.map((genre: Genre, idx: number) => (
                  <span
                    key={genre.id}
                    className="hover:underline hover:text-red-400 cursor-pointer"
                    onClick={() => handleGenreClick(genre)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Show ${genre.name} movies`}
                  >
                    {genre.name}{idx < genres.length - 1 ? ', ' : ''}
                  </span>
                ))
              : 'N/A'}
            <br />
            <span className="font-semibold">Duration:</span> {movie.runtime ? `${movie.runtime} min` : 'N/A'}<br />
            <span className="font-semibold">Country:</span>{' '}
            {countries.length > 0
              ? countries.map((country: any, idx: number) => (
                  <span
                    key={country.iso_3166_1}
                    className="hover:underline hover:text-red-400 cursor-pointer"
                    onClick={() => handleCountryClick(country)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Show movies from ${country.name}`}
                  >
                    {country.name}{idx < countries.length - 1 ? ', ' : ''}
                  </span>
                ))
              : 'N/A'}
            <br />
            <span className="font-semibold">Production:</span>{' '}
            {companies.length > 0
              ? companies.map((company: any, idx: number) => (
                  <span
                    key={company.id}
                    className="hover:underline hover:text-red-400 cursor-pointer"
                    onClick={() => handleCompanyClick(company)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Show movies from ${company.name}`}
                  >
                    {company.name}{idx < companies.length - 1 ? ', ' : ''}
                  </span>
                ))
              : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
} 