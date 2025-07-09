import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Genre } from '../types';

// Reusable Modal component
export function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" role="dialog" aria-modal="true">
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl mx-4 p-8 relative">
        {children}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
    </div>
  );
}

interface FilterModalProps {
  onClose: () => void;
}

const genres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10762, name: 'Kids' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10763, name: 'News' },
  { id: 10764, name: 'Reality' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
  { id: 10759, name: 'Action & Adventure' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10766, name: 'Soap' },
  { id: 10767, name: 'Talk' },
  { id: 10768, name: 'War & Politics' },
  { id: 10772, name: 'Biography' },
];
const countries = [
  { code: 'US', name: 'United States of America' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IN', name: 'India' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'CN', name: 'China' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'RU', name: 'Russia' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'AR', name: 'Argentina' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'BE', name: 'Belgium' },
  { code: 'FI', name: 'Finland' },
  { code: 'IE', name: 'Ireland' },
  { code: 'PL', name: 'Poland' },
  { code: 'TH', name: 'Thailand' },
  // Add more as needed
];

export default function FilterModal({ onClose }: FilterModalProps) {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (selectedGenre) {
      params.set('genre', selectedGenre.name);
      params.set('genreId', String(selectedGenre.id));
    }
    if (selectedCountry) {
      params.set('country', selectedCountry);
    }
    navigate(`/browse?${params.toString()}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" role="dialog" aria-modal="true" aria-labelledby="filter-modal-title">
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl mx-4 p-8 relative">
        <h2 id="filter-modal-title" className="text-3xl font-bold text-center mb-6 text-white">Filter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-gray-200 mb-2">Type:</label>
            <select className="w-full rounded px-3 py-2 bg-gray-700 text-white">
              <option>All</option>
              <option>Movie</option>
              <option>TV Show</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-200 mb-2">Quality:</label>
            <select className="w-full rounded px-3 py-2 bg-gray-700 text-white">
              <option>All</option>
              <option>HD</option>
              <option>CAM</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-200 mb-2">Released:</label>
            <select className="w-full rounded px-3 py-2 bg-gray-700 text-white">
              <option>All</option>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
        </div>
        <div className="border-t border-gray-600 pt-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-200 mb-2">Genre:</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1">
                {genres.map((genre) => (
                  <label key={genre.id} className="flex items-center text-gray-200 text-sm">
                    <input
                      type="radio"
                      name="genre"
                      className="mr-2"
                      checked={selectedGenre?.id === genre.id}
                      onChange={() => setSelectedGenre(genre)}
                    />
                    {genre.name}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-200 mb-2">Country:</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1">
                {countries.map((country) => (
                  <label key={country.code} className="flex items-center text-gray-200 text-sm">
                    <input
                      type="radio"
                      name="country"
                      className="mr-2"
                      checked={selectedCountry === country.code}
                      onChange={() => setSelectedCountry(country.code)}
                    />
                    {country.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-8 py-2 rounded text-lg font-semibold"
            onClick={handleFilter}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6-6-6" /></svg>
            Filter
          </button>
          <button className="bg-white text-gray-800 px-8 py-2 rounded text-lg font-semibold" onClick={onClose} aria-label="Close filter modal">
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 