import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface LocaleContextType {
  language: string;
  region: string;
  setLanguage: (lang: string) => void;
  setRegion: (region: string) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within a LocaleProvider');
  return ctx;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en-US');
  const [region, setRegion] = useState('US');

  return (
    <LocaleContext.Provider value={{ language, region, setLanguage, setRegion }}>
      {children}
    </LocaleContext.Provider>
  );
} 