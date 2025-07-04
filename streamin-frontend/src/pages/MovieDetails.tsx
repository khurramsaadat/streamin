import { useParams, Link } from 'react-router-dom';

const movieData = {
  '1': {
    title: 'The Sandman',
    year: '2025',
    image: 'https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'A fantasy drama series based on the DC Comics of the same name.',
    cast: ['Tom Sturridge', 'Gwendoline Christie', 'Vivienne Acheampong'],
  },
  // Add more mock data as needed
};

export default function MovieDetails() {
  const { id } = useParams();
  const movie = movieData[id as keyof typeof movieData];

  if (!movie) return <div className="text-xl">Movie not found.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
      <Link to="/movies" className="text-red-400 hover:underline mb-4 inline-block">&larr; Back to Movies</Link>
      <div className="flex flex-col md:flex-row gap-6">
        <img src={movie.image} alt={movie.title} className="w-full md:w-64 h-80 object-cover rounded" />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2 text-white">{movie.title}</h2>
          <p className="text-gray-400 mb-2">{movie.year}</p>
          <p className="mb-4 text-gray-300">{movie.description}</p>
          <div className="mb-4">
            <span className="font-semibold text-white">Cast:</span>
            <ul className="list-disc list-inside text-gray-300">
              {movie.cast.map((actor) => (
                <li key={actor}>{actor}</li>
              ))}
            </ul>
          </div>
          <video controls className="w-full rounded shadow">
            <source src={movie.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
} 