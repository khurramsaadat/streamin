import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import { FaHome, FaRocket, FaFilm, FaTv, FaAndroid } from 'react-icons/fa'

const genres = [
  'Action', 'Action & Adventure', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Kids', 'Music', 'Mystery', 'News', 'Reality', 'Romance', 'Sci-Fi & Fantasy', 'Science Fiction', 'Soap', 'Talk', 'Thriller', 'TV Movie', 'War', 'War & Politics', 'Western'
]
const countries = [
  'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Czech Republic', 'Denmark', 'Finland', 'France', 'Germany', 'Hong Kong', 'Hungary', 'India', 'Ireland', 'Israel', 'Italy', 'Japan', 'Luxembourg', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Poland', 'Romania', 'Russia', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'United Kingdom', 'United States of America'
]

function TVShows() {
  return <div className="text-2xl font-bold">TV Shows Page (Coming Soon)</div>;
}

function Login() {
  return <div className="text-2xl font-bold">Login Page (Mockup)</div>;
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [genreOpen, setGenreOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 dark">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-900 text-white px-4 py-3 shadow-md h-14">
        <div className="flex items-center gap-3">
          <button className="md:hidden mr-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <Link to="/" className="bg-gradient-to-tr from-red-600 to-orange-400 rounded-lg p-1">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="url(#paint0_linear)"/><path d="M8 7v10l8-5-8-5z" fill="#fff"/><defs><linearGradient id="paint0_linear" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#FF512F"/><stop offset="1" stopColor="#F09819"/></linearGradient></defs></svg>
          </Link>
        </div>
      </header>
      <div className="flex flex-row pt-14 min-h-screen">
        {/* Sidebar */}
        <aside className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-72 bg-gray-900 shadow-lg z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 md:relative md:top-0 md:h-full md:translate-x-0 md:w-72 md:block`}>
          <div className="flex flex-col h-full justify-between">
            <div>
              <nav className="flex flex-col gap-1 p-4">
                <Link to="/" className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-800 text-base"><FaHome className="text-lg" />Home</Link>
                <Link to="/top-imdb" className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-800 text-base"><FaRocket className="text-lg" />Top IMDB</Link>
                <Link to="/movies" className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-800 text-base"><FaFilm className="text-lg" />Movies</Link>
                <Link to="/tv-shows" className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-800 text-base"><FaTv className="text-lg" />TV Shows</Link>
                <Link to="/android-app" className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-800 text-base"><FaAndroid className="text-lg" />Android App</Link>
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
        {/* Main Content */}
        <main className="flex-1 flex flex-col pl-0 md:pl-72 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/tv-shows" element={<TVShows />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-4 mt-auto text-xs">
        © {new Date().getFullYear()} Braflix. All rights reserved. | Terms | Contact
      </footer>
    </div>
  )
}
