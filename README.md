# Nyvasa

Real estate - A home is not a transaction, it is a vision realised.

Next.js 15 (App Router).

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build && npm start
```

## Notes

- The design system is in `app/globals.css`. UI markup is in `app/shell.ts`; it is rendered and then populated by `public/app.js` (the original vanilla UI logic) via `components/AppRuntime.tsx`.
- Photos are bundled in `public/img`.
