import { Link } from 'react-router-dom';
import { FaFilter, FaUser } from 'react-icons/fa';

const movies = [
  {
    id: '1',
    title: 'The Sandman',
    year: '2025',
    duration: '104m',
    quality: 'HD',
    image: 'https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg',
  },
  {
    id: '2',
    title: 'The Old Guard 2',
    year: '2025',
    duration: '104m',
    quality: 'HD',
    image: 'https://images.pexels.com/photos/799102/pexels-photo-799102.jpeg',
  },
  {
    id: '3',
    title: 'Ironheart',
    year: '2025',
    duration: '101m',
    quality: 'CAM',
    image: 'https://images.pexels.com/photos/799122/pexels-photo-799122.jpeg',
  },
  {
    id: '4',
    title: 'Ballerina',
    year: '2025',
    duration: '125m',
    quality: 'HD',
    image: 'https://images.pexels.com/photos/799123/pexels-photo-799123.jpeg',
  },
  {
    id: '5',
    title: 'Thunderbolts*',
    year: '2025',
    duration: '127m',
    quality: 'HD',
    image: 'https://images.pexels.com/photos/799124/pexels-photo-799124.jpeg',
  },
  // Add more mock movies as needed
];

function MoviePoster({ movie }: { movie: typeof movies[0] }) {
  return (
    <Link to={`/movies/${movie.id}`} className="group block">
      <div className="rounded-lg overflow-hidden shadow bg-gray-800 group-hover:scale-105 transition-transform duration-200">
        <img src={movie.image} alt={movie.title} className="w-full h-60 object-cover" />
      </div>
      <div className="flex gap-2 mt-2 mb-1">
        <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200 font-semibold">{movie.quality}</span>
        <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200">{movie.year}</span>
        <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200">{movie.duration}</span>
      </div>
      <div className="text-sm text-white truncate font-medium">{movie.title}</div>
    </Link>
  );
}

export default function Movies() {
  return (
    <>
      {/* Top bar */}
      <div className="flex items-center justify-between w-full">
        <form className="flex-1 max-w-xl mr-4">
          <input
            type="text"
            placeholder="Enter keywords..."
            className="w-full bg-gray-800 text-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400"
            disabled
          />
        </form>
        <div className="flex items-center gap-4">
          <Link to="/login" className="flex items-center gap-1 text-gray-300 hover:text-white text-sm">
            <FaUser className="text-base" /> Login
          </Link>
          <button className="flex items-center gap-1 bg-gray-800 text-gray-300 hover:text-white px-3 py-2 rounded text-sm" disabled>
            <FaFilter className="text-base" /> Filter
          </button>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-6 w-full">Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
        {movies.map((movie) => (
          <MoviePoster key={movie.id} movie={movie} />
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