import { Link } from 'react-router-dom';

interface MovieCardProps {
  id: string;
  title: string;
  year: string;
  image: string;
}

export default function MovieCard({ id, title, year, image }: MovieCardProps) {
  return (
    <Link to={`/movies/${id}`} className="block group">
      <div className="rounded-lg overflow-hidden shadow-lg bg-gray-800 group-hover:scale-105 transition-transform duration-200">
        <img src={image} alt={title} className="w-full h-60 object-cover" />
        <div className="p-3">
          <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
          <p className="text-sm text-gray-400">{year}</p>
        </div>
      </div>
    </Link>
  );
} 