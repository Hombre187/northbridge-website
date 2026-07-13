# NorthBridge RP website

The production-ready public website for **NorthBridge RP**, an 18+ serious FiveM roleplay community. It uses Next.js App Router, TypeScript, Tailwind CSS, and local assets, and is ready to deploy on Vercel without a database or paid service.

## Requirements

- Node.js 20.9 or newer (Node.js 22 LTS is recommended)
- npm (included with Node.js)
- Git

## Run it locally

Open a terminal in this project folder and run:

```bash
npm install
copy .env.example .env.local
npm run dev
```

Visit `http://localhost:3000`. Stop the development server with `Ctrl+C`.

Before publishing changes, verify the project:

```bash
npm run lint
npm run build
```

To run the production build locally, use `npm start` after `npm run build`.

## Content you should edit

- **Discord, Store, support, connect link, join code, and player maximum:** edit `src/config/site.ts`. The current public Discord, Tebex, server endpoint, and 128-player maximum are configured there.
- **Businesses, departments, features, and updates:** edit `src/data/content.ts`.
- **Staff:** edit `src/data/staff.json`. Entries marked as placeholders are intentionally not real people.
- **Server status:** `src/app/api/server-status/route.ts` reads the public FiveM status endpoints server-side and returns only normalized availability data. `src/lib/server-status.ts` contains the build-safe offline shape.
- **Design system:** edit the documented tokens near the top of `src/app/globals.css`. Colors, surfaces, radii, shadows, and section spacing are centralized there. Reusable component variants live in `src/components/ui.tsx`.
- **Page copy:** each page is in `src/app/<page>/page.tsx`.

## Replace images and branding

All current art is original local SVG placeholder artwork; the site does not hotlink GTA screenshots.

- Hero: `public/images/hero/city.svg`
- Businesses: `public/images/businesses/`
- Departments: `public/images/departments/`
- Gallery: `public/images/gallery/`
- Temporary NB mark and favicon: `public/branding/nb-mark.svg`

You can replace an SVG with a `.webp` or `.avif`, then update the matching path in `src/data/content.ts` or the page component. Keep descriptive alt text. Recommended hero size is at least 1920×1080; card images should use a consistent 16:9 ratio.

### Add the cinematic hero video

Place either or both of these files in `public/videos/`:

- `northbridge-hero.webm` (preferred for efficient delivery)
- `northbridge-hero.mp4` (compatibility fallback)

The hero detects available files during the build. If neither exists, it automatically uses `public/images/hero/city.svg`. Video is muted, looping, inline, and hidden for visitors who prefer reduced motion. Keep the video short, silent, dark enough for readable text, and compressed for web delivery.

## Deploy to Vercel

1. Push the repository to GitHub.
2. Sign in at [vercel.com](https://vercel.com) and choose **Add New → Project**.
3. Import `Hombre187/northbridge-website`.
4. Leave **Framework Preset** as Next.js, **Root Directory** as `./`, and the build settings at their detected defaults.
5. In **Settings → Environment Variables**, add `FIVEM_SERVER_ENDPOINT=205.209.113.90:30120` for Production, Preview, and Development. This is a public endpoint, not a secret, and remains server-side because it does not use the `NEXT_PUBLIC_` prefix.
6. Select **Deploy**.

### Connect northbridgerp.com

After the first deployment, open the project in Vercel and choose **Settings → Domains**. Add `northbridgerp.com`, then add the DNS records Vercel displays at your domain registrar. Add `www.northbridgerp.com` too and redirect it to the root domain (or do the reverse). DNS changes can take time to propagate.

The canonical URL, sitemap, robots file, Open Graph metadata, and Twitter metadata already use `https://northbridgerp.com`.

## Project map

```text
public/
  branding/          Temporary NB mark
  images/            Hero, business, department, and gallery artwork
src/
  app/               Pages, metadata, sitemap, robots, and global styles
  components/        Navigation, footer, cards, status, and shared UI
  config/site.ts     External URLs and site-wide settings
  data/content.ts    Editable businesses, departments, features, and updates
  data/staff.json    Editable staff groups and members
  lib/                Server-status fallback
```

## Live server status

The homepage requests `/api/server-status`, which calls the server's public `dynamic.json` and `info.json` endpoints from a Node.js route handler. The browser never calls FiveM directly. The route has a 4.5-second timeout, disables caching, validates the upstream values, and returns a safe offline response when the server is unavailable.

Configure the host and game port locally by copying `.env.example` to `.env.local`. On Vercel, add the same `FIVEM_SERVER_ENDPOINT` value under **Project → Settings → Environment Variables** and scope it to Production, Preview, and Development. If omitted, the route uses the documented NorthBridge endpoint as a fallback.

Only current players, maximum players, and the public hostname are normalized. Queue size, restart scheduling, Discord member counts, player names, identifiers, resources, txAdmin data, and private credentials are never requested or exposed.
