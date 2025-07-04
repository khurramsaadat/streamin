import { Link } from 'react-router-dom';

interface MovieCardProps {
  id: string;
  title: string;
  image: string;
  year?: string;
  duration?: string;
  quality?: string;
  season?: string;
  episode?: string;
}

export default function MovieCard({ id, title, image, year, duration, quality, season, episode }: MovieCardProps) {
  return (
    <Link to={`/movies/${id}`} className="block group">
      <div className="rounded-lg overflow-hidden shadow-lg bg-gray-800 group-hover:scale-105 transition-transform duration-200">
        <img src={image} alt={title} className="w-full h-60 object-cover" />
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