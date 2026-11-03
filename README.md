# The Week — Morning Report

Standalone Next.js prototype of The Week Morning Report, extracted for Bolt.new.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (same experience at `/report`).

## Notes

- Localhost-only gate from Signal Shop is removed so Bolt and hosted previews work.
- Content and assets live under `src/app/the-week/` and `public/the-week/`.
- Query flags: `?sources=1`, `?locked=1`, `?ads=1`.
