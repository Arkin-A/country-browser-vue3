# Country Browser (Vue 3)

A simple Vue 3 + TypeScript app to browse countries from the public REST Countries API. 
It supports fast, accent-insensitive full‑text search, paginated results, and a per‑country detail view. 
The project showcases a clean architecture using Pinia for state, Vue Router, and Tailwind CSS.

## Features

- Fast search across common name, official name, region, and capital (accent/case insensitive; e.g., "Aland" matches "Åland")
- Pagination with previous/next and current page display
- Country detail page (routing via `vue-router`)
- Loading and error states (robust HTTP error handling)
- Accessibility: ARIA attributes, "Skip to main content" link, live regions for status messages
- Lightweight styling with Tailwind CSS
- Clean state management with Pinia
- Unit tests for the store (Vitest + Vue Test Utils)

## Tech Stack

- Vue 3 + TypeScript
- Pinia (state management)
- Vue Router
- Vite (dev server and build)
- Tailwind CSS
- Vitest, Vue Test Utils, jsdom

## System Requirements

- Node.js ^20.19.0 or ≥22.12.0 (see `package.json` → `engines`)
- npm (bundled with Node.js)

## Installation & Development

```bash
npm install
npm run dev
```

The dev server runs at the address printed in your terminal (typically http://localhost:5173).

## Production

- Build the app:

```bash
npm run build
```

- Preview the production build locally:

```bash
npm run preview
```

## Tests & Type Checking

- Run unit tests (jsdom environment):

```bash
npm test
```

- TypeScript type check (no emit):

```bash
npm run typecheck
```

## Project Structure (excerpt)

```
src/
  assets/           # global styles (Tailwind etc.)
  components/
    CountryList.vue # home with search, list, pagination
  router/
    index.ts        # routes: '/' (list), '/country/:code' (detail)
  services/
    countriesApi.ts # REST Countries API client
  stores/
    countries.ts    # Pinia store: load, filter, paginate
  views/
    CountryDetail.vue # country detail view
  App.vue
  main.ts
```

## Data Source

This app uses the public REST Countries API:

- Endpoint: `https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,cca2,cca3`
- Returns only the required fields; results are sorted alphabetically
- Note: Public APIs may have rate limits or temporary outages. On HTTP errors the app displays an error message.

## Accessibility (A11y)

- "Skip to main content" link for keyboard users
- ARIA roles and attributes (e.g., `role="status"`, `aria-live`)
- Labeled controls (search field, results list, pagination)

## Developer Notes

- Alias "@" points to `src/` (see `vite.config.ts`)
- Tests are configured with Vitest (`globals: true`, `environment: 'jsdom'`)
- Tailwind is integrated via PostCSS (`tailwind.config.js`, `postcss.config.js`)

## Useful Links

- Vite docs: https://vite.dev/config/
- Vue Devtools (optional):
  - Chrome/Edge/Brave: https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd
  - Firefox: https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/

## License

This project is provided "as is" without any warranty.  
You may adapt or reuse parts of the code as needed for educational or professional purposes.
