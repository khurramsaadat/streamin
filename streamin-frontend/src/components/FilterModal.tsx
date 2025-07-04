import React from 'react';

interface FilterModalProps {
  onClose: () => void;
}

const genres = [
  'Action', 'Biography', 'Drama', 'Horror', 'News', 'Science Fiction', 'TV Movie',
  'Action & Adventure', 'Comedy', 'Family', 'Kids', 'Reality', 'Soap', 'War',
  'Adventure', 'Crime', 'Fantasy', 'Music', 'Romance', 'Talk', 'War & Politics',
  'Animation', 'Documentary', 'History', 'Mystery', 'Sci-Fi & Fantasy', 'Thriller', 'Western',
];
const countries = [
  'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Czech Republic', 'Denmark', 'Finland', 'France', 'Germany', 'Hong Kong', 'Hungary', 'India', 'Ireland', 'Israel', 'Italy', 'Japan', 'Luxembourg', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Poland', 'Romania', 'Russia', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'United Kingdom', 'United States of America'
];

export default function FilterModal({ onClose }: FilterModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl mx-4 p-8 relative">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Filter</h2>
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
                  <label key={genre} className="flex items-center text-gray-200 text-sm">
                    <input type="checkbox" className="mr-2" />{genre}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-200 mb-2">Country:</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1">
                {countries.map((country) => (
                  <label key={country} className="flex items-center text-gray-200 text-sm">
                    <input type="checkbox" className="mr-2" />{country}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <button className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-8 py-2 rounded text-lg font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6-6-6" /></svg>
            Filter
          </button>
          <button className="bg-white text-gray-800 px-8 py-2 rounded text-lg font-semibold" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 