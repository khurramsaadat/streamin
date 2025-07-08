# CHANGELOG.md

## 2024-06-09

### Major Improvements
- Replaced all OMDb code with TMDB-only integration (API, images, search, details, etc.)
- Dynamic TMDB image configuration using React Context
- Enhanced API error handling and rate limiting
- Localization and region support with sidebar selector
- Server-side search using TMDB endpoints
- Caching for popular/trending data (localStorage, 1 hour)
- Accessibility improvements (ARIA, alt text, keyboard navigation)
- TMDB attribution in footer
- Movie Details page: full TMDB data, trailer, cast, genres, country, production, IMDb score, interactive links
- Movies page: supports filtering by cast, genre, country, production via query params and sticky filter badge
- Branding updated to "AI flix"

### Directory Structure
- src/
  - components/
    - MovieCard.tsx
    - Sidebar.tsx
    - FilterModal.tsx
  - lib/
    - tmdb.ts
    - TMDBConfigContext.tsx
    - LocaleContext.tsx
  - pages/
    - Home.tsx
    - Movies.tsx
    - TVShows.tsx
    - MovieDetails.tsx
    - TopIMDB.tsx
  - main.tsx
  - index.css
  - App.tsx
- public/
  - TMDB-logo-attibution.svg
- DOCS/
  - CHANGELOG.md
  - PROGRESS.md
  - INPUTS.md

### Notes
- All OMDb code and references removed
- All new features tested and verified
- See PROGRESS.md for detailed progress log 