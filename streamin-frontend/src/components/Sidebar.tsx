import { Link } from 'react-router-dom';
import { FaHome, FaRocket, FaFilm, FaTv, FaFilter } from 'react-icons/fa';
import { useLocale } from '../lib/LocaleContext';

/**
 * Props for the Sidebar component.
 */
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onFilterClick: () => void;
}

const languages = [
  { code: 'en-US', label: 'English (US)' },
  { code: 'es-ES', label: 'Español (ES)' },
  { code: 'fr-FR', label: 'Français (FR)' },
  { code: 'de-DE', label: 'Deutsch (DE)' },
  { code: 'zh-CN', label: '中文 (CN)' },
  // Add more as needed
];
const regions = [
  { code: 'US', label: 'United States' },
  { code: 'ES', label: 'Spain' },
  { code: 'FR', label: 'France' },
  { code: 'DE', label: 'Germany' },
  { code: 'CN', label: 'China' },
  // Add more as needed
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  onFilterClick,
}: SidebarProps) {
  const { language, region, setLanguage, setRegion } = useLocale();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-full w-56 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:shadow-none`}
      aria-label="Sidebar navigation"
      role="complementary"
      style={{ backgroundColor: '#23263a' }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <button className="md:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto" aria-label="Main navigation" role="navigation">
          <Link to="/" className="flex items-center gap-2 px-2 py-2 rounded hover:text-red-400 text-sm mt-6" aria-label="Home">
            <FaHome /> Home
          </Link>
          <Link to="/movies" className="flex items-center gap-2 px-2 py-2 rounded hover:text-red-400 text-sm" aria-label="Movies">
            <FaFilm /> Movies
          </Link>
          <Link to="/tv-shows" className="flex items-center gap-2 px-2 py-2 rounded hover:text-red-400 text-sm" aria-label="TV Shows">
            <FaTv /> TV Shows
          </Link>
          <Link to="/top-imdb" className="flex items-center gap-2 px-2 py-2 rounded hover:text-red-400 text-sm" aria-label="Top TMDB">
            <FaRocket /> Top TMDB
          </Link>
          <button className="flex items-center gap-2 px-2 py-2 rounded hover:text-red-400 text-sm" onClick={onFilterClick} aria-label="Open filter modal">
            <FaFilter /> Filter
          </button>
          {/* Language/Region Selector */}
          <div className="mt-6">
            <label className="block text-xs text-gray-400 mb-1" htmlFor="language-select">Language</label>
            <select
              id="language-select"
              className="w-full rounded bg-gray-800 text-white px-2 py-1 mb-2"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              aria-label="Select language"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
            <label className="block text-xs text-gray-400 mb-1" htmlFor="region-select">Region</label>
            <select
              id="region-select"
              className="w-full rounded bg-gray-800 text-white px-2 py-1"
              value={region}
              onChange={e => setRegion(e.target.value)}
              aria-label="Select region"
            >
              {regions.map(reg => (
                <option key={reg.code} value={reg.code}>{reg.label}</option>
              ))}
            </select>
          </div>
        </nav>
        <div className="border-t border-gray-700 p-4 text-xs text-gray-400">
          <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">
            <a href="#" className="hover:text-red-400">Terms of service</a> -
            <a href="#" className="hover:text-red-400">Contact</a>
          </div>
          <div>© {new Date().getFullYear()} AI flix. All rights reserved.</div>
        </div>
      </div>
    </aside>
  );
} 