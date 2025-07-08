import { Link } from 'react-router-dom';
import { useState } from 'react';

interface MovieCardProps {
  id: string;
  title: string;
  imdbID?: string;
  image?: string;
  poster?: string;
  year?: string;
  duration?: string;
  quality?: string;
  season?: string;
  episode?: string;
}

const PLACEHOLDER = '/popcorn-placeholder.jpg';

export default function MovieCard({ id, title, imdbID, image, poster, year, duration, quality, season, episode }: MovieCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const posterSrc = !poster || poster === 'N/A' || imgError ? PLACEHOLDER : poster;

  return (
    <Link
      to={`/movies/${id}`}
      className="block group"
      role="link"
      aria-label={`View details for ${title}`}
    >
      <div className="rounded-lg overflow-hidden shadow-lg bg-gray-800 group-hover:scale-105 transition-transform duration-200">
        <img
          src={posterSrc}
          alt={imgError ? 'Poster not available' : `${title} poster`}
          className={`w-full h-60 object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
        {!imgLoaded && (
          <img
            src={PLACEHOLDER}
            alt="Loading poster..."
            className="w-full h-60 object-cover absolute top-0 left-0 opacity-100"
            style={{ zIndex: 1 }}
          />
        )}
      </div>
      <div className="flex gap-2 mt-2 mb-1">
        {quality && <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200 font-semibold">{quality}</span>}
        {season && <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200">SS {season}</span>}
        {episode && <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200">EPS {episode}</span>}
        {year && !season && <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200">{year}</span>}
        {duration && <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200">{duration}</span>}
      </div>
      <div className="text-sm text-white truncate font-medium">{title}</div>
    </Link>
  );
} 