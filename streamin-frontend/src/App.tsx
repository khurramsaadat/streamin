import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import Sidebar from './components/Sidebar'
import TVShows from './pages/TVShows'
import SearchBar from './components/SearchBar'
import FilterModal from './components/FilterModal'
import TopIMDB from './pages/TopIMDB'
import Browse from './pages/Browse';

function Login() {
  return <div className="text-2xl font-bold">Login Page (Mockup)</div>;
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 dark">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 shadow-md h-14"
        style={{ backgroundColor: '#23263a' }}
      >
        <div className="flex items-center gap-3">
          <button className="md:hidden mr-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl">
              <span className="text-red-500">AI</span><span className="text-white"> flix</span>
            </span>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <SearchBar value={search} onChange={setSearch} className="bg-gray-100 text-gray-900 placeholder-gray-500" />
        </div>
      </header>
      <div className="flex flex-row pt-14 min-h-screen">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onFilterClick={() => setFilterOpen(true)} />
        {/* Main Content */}
        <main className="flex-1 flex flex-col p-4">
          <Routes>
            <Route path="/" element={<Home search={search} />} />
            <Route path="/movies" element={<Movies search={search} />} />
            <Route path="/tv-shows" element={<TVShows search={search} />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/top-imdb" element={<TopIMDB />} />
            <Route path="/login" element={<Login />} />
            <Route path="/browse" element={<Browse />} />
          </Routes>
        </main>
      </div>
      {filterOpen && <FilterModal onClose={() => setFilterOpen(false)} />}
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-4 mt-auto text-xs" role="contentinfo">
        © {new Date().getFullYear()} AI flix. All rights reserved. | Terms | Contact
        <span className="block mt-2">
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" aria-label="The Movie Database (TMDB)">
            <img src="/TMDB-logo-attibution.svg" alt="TMDB Logo" className="inline h-6 align-middle mr-1" style={{ display: 'inline', verticalAlign: 'middle' }} />
            <span className="align-middle">This product uses data from TMDB.</span>
          </a>
        </span>
      </footer>
    </div>
  )
}
