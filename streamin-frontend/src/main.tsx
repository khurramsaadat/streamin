import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { TMDBConfigProvider } from './lib/TMDBConfigContext'
import { LocaleProvider } from './lib/LocaleContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      <TMDBConfigProvider>
        <BrowserRouter>
    <App />
        </BrowserRouter>
      </TMDBConfigProvider>
    </LocaleProvider>
  </StrictMode>,
)
