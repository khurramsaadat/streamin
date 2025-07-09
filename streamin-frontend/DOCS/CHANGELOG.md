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

## 2024-07-03

### Feature Enhancements & Filtering
- Added cast details, IMDb scores, and interactive filtering (by cast, genre, country, production company) on the Movie Details page using TMDB’s `vote_average` for ratings.
- Made filter fields clickable, routing to `/movies` with query parameters.
- Movies page now reads query parameters and fetches filtered results, displaying a sticky filter badge with a clear button.

### UI/UX Improvements
- IMDb badge styled as a yellow pill, right-aligned; runtime as a gray pill below every MovieCard.
- Standardized MovieCard component for consistent use across the site.

### TypeScript, Linter, and Build Issues
- Removed unused props/imports, updated usages, and fixed linter/type errors.
- Guided installation of TypeScript, ran type checks, and ensured the project was error-free.
- Addressed Netlify build errors, especially around SidebarProps and prop passing.

### Codebase Organization & Best Practices
- Created a shared `Genre` type in `src/types.ts`, updated all relevant components to use it.
- Audited and updated SidebarProps interface for accuracy and maintainability.
- Added JSDoc/type comments for clarity.

### UI Consistency & Sidebar Improvements
- Sidebar now uses a modal with checkboxes for filtering.
- Selecting a genre/country routes to a new `/browse` page with combined results for both movies and TV shows.
- Created `/browse` page supporting combined filtering, pagination, and sticky filter badges with a "Clear All" option.
- Grid layout updated to show 10 cards per row on all main pages, with responsive design.

### Visual Tweaks
- Header and sidebar backgrounds made visually distinct from main content.
- Sidebar link hover color unified with the "Terms of service" link.
- Sidebar width and link font size reduced for a more compact look.
- Removed duplicate "AI flix" text in the sidebar, keeping only the header logo.
- Logo changed to a modern text-based "AI flix" logo.

### Card and Poster Improvements
- MovieCard updated to use `object-contain` and a 2:3 aspect ratio to prevent poster cropping.
- Grid adjusted for 10 cards per row, card size reduced for a tighter fit.
- Only meaningful badges (not "N/A") are shown on cards.

### Loading Experience
- Skeleton loaders (animated gray blocks) added to all main pages to replace the popcorn placeholder during data loading.
- Error handling and debug logging added to all main pages, with clear error messages and console logs for API responses and errors.

### Search Functionality
- Search bar now passes the `search` state to Home, Movies, and TV Shows pages.
- On Home, search bar filters both movies and TV shows; on Movies/TV Shows pages, it filters only that type.
- Search bar background made visually distinct from the header.

### Final State
- The app is now modern, responsive, and user-friendly, with robust filtering, search, and error handling.
- All TypeScript and linter errors were systematically addressed.
- The UI and codebase were iteratively refined for best practices and maintainability.

### Directory Structure (streamin-frontend)
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
- .gitignore
- index.html
- package-lock.json
- package.json
- postcss.config.cjs
- tsconfig.app.json
- tailwind.config.js
- vite.config.ts
- README.md
- tsconfig.json
- tsconfig.node.json
- eslint.config.js

### Notes
- All new features tested and verified
- See PROGRESS.md for detailed progress log
- Full type check (npx tsc --noEmit) performed: no errors found 