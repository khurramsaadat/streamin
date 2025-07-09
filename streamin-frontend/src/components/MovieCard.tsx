import { Link } from 'react-router-dom';
import { useState } from 'react';

interface MovieCardProps {
  id: string;
  title: string;
  year?: string;
  duration?: string;
  quality?: string;
  season?: string;
  episode?: string;
  poster?: string;
  rating?: string;
  media_type?: 'movie' | 'tv'; // Add media_type prop
}

const PLACEHOLDER = '/popcorn-placeholder.jpg';

export default function MovieCard({ id, title, year, duration, quality, season, episode, poster, rating, media_type = 'movie' }: MovieCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const posterSrc = !poster || poster === 'N/A' || imgError ? PLACEHOLDER : poster;
  const route = media_type === 'tv' ? `/tv/${id}` : `/movie/${id}`;

  return (
    <Link
      to={route}
      className="block group"
      role="link"
      aria-label={`View details for ${title}`}
    >
      <div className="rounded-lg overflow-hidden shadow-lg bg-gray-800 group-hover:scale-105 transition-transform duration-200">
        <div className="w-full aspect-[2/3] bg-gray-900 flex items-center justify-center">
          <img
            src={posterSrc}
            alt={imgError ? 'Poster not available' : `${title} poster`}
            className={`w-full h-full object-contain transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
          {!imgLoaded && (
            <img
              src={PLACEHOLDER}
              alt="Loading poster..."
              className="w-full h-full object-contain absolute top-0 left-0 opacity-100"
              style={{ zIndex: 1 }}
            />
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-2 mb-1 items-center justify-between">
        <div className="flex gap-2">
          {quality && <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200 font-semibold">{quality}</span>}
          {season && <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200">SS {season}</span>}
          {episode && <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200">EPS {episode}</span>}
          {year && !season && <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200">{year}</span>}
          {duration && duration !== 'N/A' && <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200">{duration}</span>}
        </div>
        {rating && (
          <span
            className="bg-yellow-400 text-black text-xs px-3 py-0.5 rounded font-bold shadow ml-2"
            title={`User rating: ${rating}/10`}
            aria-label={`User rating: ${rating}/10`}
          >
            {rating}
          </span>
        )}
      </div>
      <div className="text-sm text-white truncate font-medium">{title}</div>
    </Link>
  );
} 