import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import { FaHome, FaRocket, FaFilm, FaTv, FaAndroid } from 'react-icons/fa'
import Sidebar from './components/Sidebar'
import TVShows from './pages/TVShows'
import SearchBar from './components/SearchBar'
import FilterModal from './components/FilterModal'

const genres = [
  'Action', 'Action & Adventure', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Kids', 'Music', 'Mystery', 'News', 'Reality', 'Romance', 'Sci-Fi & Fantasy', 'Science Fiction', 'Soap', 'Talk', 'Thriller', 'TV Movie', 'War', 'War & Politics', 'Western'
]
const countries = [
  'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Czech Republic', 'Denmark', 'Finland', 'France', 'Germany', 'Hong Kong', 'Hungary', 'India', 'Ireland', 'Israel', 'Italy', 'Japan', 'Luxembourg', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Poland', 'Romania', 'Russia', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'United Kingdom', 'United States of America'
]

function Login() {
  return <div className="text-2xl font-bold">Login Page (Mockup)</div>;
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [genreOpen, setGenreOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

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
        <div className="flex-1 flex justify-center">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </header>
      <div className="flex flex-row pt-14 min-h-screen">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} genreOpen={genreOpen} setGenreOpen={setGenreOpen} countryOpen={countryOpen} setCountryOpen={setCountryOpen} genres={genres} countries={countries} onFilterClick={() => setFilterOpen(true)} />
        {/* Main Content */}
        <main className="flex-1 flex flex-col pl-0 md:pl-72 p-4">
          <Routes>
            <Route path="/" element={<Home search={search} />} />
            <Route path="/movies" element={<Movies search={search} />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/tv-shows" element={<TVShows search={search} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
      {filterOpen && <FilterModal onClose={() => setFilterOpen(false)} />}
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-4 mt-auto text-xs">
        © {new Date().getFullYear()} Braflix. All rights reserved. | Terms | Contact
      </footer>
    </div>
  )
}
