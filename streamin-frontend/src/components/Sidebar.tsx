import { Link } from 'react-router-dom';
import { FaHome, FaRocket, FaFilm, FaTv, FaFilter } from 'react-icons/fa';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  genreOpen: boolean;
  setGenreOpen: (open: boolean) => void;
  countryOpen: boolean;
  setCountryOpen: (open: boolean) => void;
  genres: string[];
  countries: string[];
  onFilterClick?: () => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, genreOpen, setGenreOpen, countryOpen, setCountryOpen, genres, countries, onFilterClick }: SidebarProps) {
  return (
    <aside className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-72 bg-gray-900 shadow-lg z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 md:relative md:top-0 md:h-full md:translate-x-0 md:w-72 md:block`}>
      <div className="flex flex-col h-full justify-between">
        <div>
          <nav className="flex flex-col gap-1 p-4">
            <Link to="/" className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-800 text-base"><FaHome className="text-lg" />Home</Link>
            <Link to="/top-imdb" className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-800 text-base"><FaRocket className="text-lg" />Top IMDB</Link>
            <Link to="/movies" className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-800 text-base"><FaFilm className="text-lg" />Movies</Link>
            <Link to="/tv-shows" className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-800 text-base"><FaTv className="text-lg" />TV Shows</Link>
            <button
              className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-800 text-base w-full text-left mt-2"
              onClick={onFilterClick}
            >
              <FaFilter className="text-lg" />Filter
            </button>
          </nav>
          {/* Genre Accordion */}
          <div className="border-t border-gray-700">
            <button onClick={() => setGenreOpen(!genreOpen)} className="w-full flex items-center justify-between px-4 py-2 font-semibold text-base focus:outline-none">
              Genre
              <svg className={`w-5 h-5 transform transition-transform ${genreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {genreOpen && (
              <div className="px-4 pb-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                  {genres.map((genre) => (
                    <span
                      key={genre}
                      className="text-xs text-gray-400 hover:text-white hover:underline cursor-pointer py-0.5"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Country Accordion */}
          <div className="border-t border-gray-700">
            <button onClick={() => setCountryOpen(!countryOpen)} className="w-full flex items-center justify-between px-4 py-2 font-semibold text-base focus:outline-none">
              Country
              <svg className={`w-5 h-5 transform transition-transform ${countryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {countryOpen && (
              <div className="px-4 pb-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                  {countries.map((country) => (
                    <span
                      key={country}
                      className="text-xs text-gray-400 hover:text-white hover:underline cursor-pointer py-0.5"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Sidebar Footer */}
        <div className="border-t border-gray-700 p-4 text-xs text-gray-400">
          <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">
            <a href="#" className="hover:text-red-400">Terms of service</a> -
            <a href="#" className="hover:text-red-400">Contact</a> -
            <a href="#" className="hover:text-red-400">Sitemap</a> -
            <a href="#" className="hover:text-red-400">FAQ</a>
          </div>
          <div className="pt-2">© 2020 BraFlix</div>
        </div>
      </div>
    </aside>
  );
} 