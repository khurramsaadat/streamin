import MovieCard from '../components/MovieCard';

const movies = [
  {
    id: '1',
    title: 'The Sandman',
    year: '2025',
    image: 'https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg',
  },
  {
    id: '2',
    title: 'The Old Guard 2',
    year: '2025',
    image: 'https://images.pexels.com/photos/799102/pexels-photo-799102.jpeg',
  },
  {
    id: '3',
    title: 'Ironheart',
    year: '2025',
    image: 'https://images.pexels.com/photos/799122/pexels-photo-799122.jpeg',
  },
  {
    id: '4',
    title: 'Ballerina',
    year: '2025',
    image: 'https://images.pexels.com/photos/799123/pexels-photo-799123.jpeg',
  },
  {
    id: '5',
    title: 'Thunderbolts*',
    year: '2025',
    image: 'https://images.pexels.com/photos/799124/pexels-photo-799124.jpeg',
  },
];

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
} 