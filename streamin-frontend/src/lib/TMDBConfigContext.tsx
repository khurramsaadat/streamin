import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface TMDBImageConfig {
  base_url: string;
  secure_base_url: string;
  poster_sizes: string[];
}

interface TMDBConfig {
  images: TMDBImageConfig;
}

const TMDBConfigContext = createContext<TMDBConfig | null>(null);

export function useTMDBConfig() {
  const context = useContext(TMDBConfigContext);
  if (!context) throw new Error('useTMDBConfig must be used within a TMDBConfigProvider');
  return context;
}

export function TMDBConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<TMDBConfig | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const res = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`);
      if (!res.ok) throw new Error('Failed to fetch TMDB configuration');
      const data = await res.json();
      setConfig(data);
    }
    fetchConfig();
  }, []);

  if (!config) return <div>Loading configuration...</div>;

  return (
    <TMDBConfigContext.Provider value={config}>
      {children}
    </TMDBConfigContext.Provider>
  );
} 