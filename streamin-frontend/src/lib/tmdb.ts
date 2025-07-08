import { useTMDBConfig } from './TMDBConfigContext';
import { useLocale } from './LocaleContext';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

if (!TMDB_API_KEY) {
  throw new Error('VITE_TMDB_API_KEY is not set in environment variables');
}

function getCacheKey(type: string, page: number, locale?: { language: string; region: string }) {
  return `tmdb-${type}-p${page}-lang${locale?.language || 'en-US'}-reg${locale?.region || 'US'}`;
}

function getCachedResults(key: string) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  try {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
    localStorage.removeItem(key);
    return null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

function setCachedResults(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
}

// Centralized TMDB fetch utility with error handling and locale support
export async function fetchTMDB(endpoint: string, params: Record<string, string | number> = {}, locale?: { language: string; region: string }) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', TMDB_API_KEY);
  if (locale) {
    url.searchParams.set('language', locale.language);
    url.searchParams.set('region', locale.region);
  }
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)));
  try {
    const res = await fetch(url.toString());
    if (res.status === 429) {
      throw new Error('You are being rate limited by TMDB. Please try again later.');
    }
    if (!res.ok) {
      throw new Error('Failed to fetch data from TMDB.');
    }
    return await res.json();
  } catch (err: any) {
    if (err instanceof Error) throw err;
    throw new Error('Network error. Please check your connection.');
  }
}

// Fetch popular movies or TV shows with caching
export async function getPopular(type: 'movie' | 'tv', page = 1, locale?: { language: string; region: string }) {
  const cacheKey = getCacheKey(`${type}-popular`, page, locale);
  const cached = getCachedResults(cacheKey);
  if (cached) return cached;
  const data = await fetchTMDB(`/${type}/popular`, { page }, locale);
  setCachedResults(cacheKey, data.results);
  return data.results;
}

// Fetch trending movies or TV shows with caching
export async function getTrending(type: 'movie' | 'tv', page = 1, locale?: { language: string; region: string }) {
  const cacheKey = getCacheKey(`${type}-trending`, page, locale);
  const cached = getCachedResults(cacheKey);
  if (cached) return cached;
  const data = await fetchTMDB(`/trending/${type}/week`, { page }, locale);
  setCachedResults(cacheKey, data.results);
  return data.results;
}

// Search movies or TV shows (no caching)
export async function searchTMDB(type: 'movie' | 'tv', query: string, page = 1, locale?: { language: string; region: string }) {
  const data = await fetchTMDB(`/search/${type}`, { query, page }, locale);
  return data.results;
}

// Get poster image URL from TMDB poster path using context if available
export function getPosterUrl(posterPath?: string, config?: { base_url: string; poster_sizes: string[] }) {
  if (!posterPath) return '/popcorn-placeholder.jpg';
  if (config && config.base_url && config.poster_sizes && config.poster_sizes.length > 0) {
    // Use the recommended size (e.g., "w500" or the closest larger size)
    const size = config.poster_sizes.includes('w500') ? 'w500' : config.poster_sizes[config.poster_sizes.length - 1];
    return `${config.base_url}${size}${posterPath}`;
  }
  return `${DEFAULT_IMAGE_BASE}${posterPath}`;
} 