# amalner-hub

React + Vite + Tailwind prototype for Amalner Hub (community portal).

## Quick start

1. Install dependencies
```bash
npm install
```

2. Start dev server
```bash
npm run dev
```

3. Build for production
```bash
npm run build
```

4. Deploy to GitHub Pages
- Make sure `homepage` in package.json is set to `https://<your-github-username>.github.io/amalner-hub`
- Install `gh-pages` globally or as dev dependency (it's included in package.json here):
```bash
npm run build
npm run deploy
```

## Notes
- Tailwind requires PostCSS build step (already configured).
- This is a front-end prototype. Data (posts, comments) is stored in `localStorage`.
- For real production use, connect to a backend (Supabase / Firebase / custom API) for persistent storage and authentication.
