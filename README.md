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

- **Discord, Store, support, connect link, join code, and player maximum:** edit `src/config/site.ts`. All current external URLs are safe placeholders and must be replaced.
- **Businesses, departments, features, and staff:** edit `src/data/content.ts`. Staff names marked as placeholders are intentionally not real people.
- **Server status:** `src/lib/server-status.ts` contains a build-safe offline fallback. Later, replace it with a server-only request to a FiveM status service. Keep server credentials out of client code and environment variables.
- **Brand colors:** edit the custom variables and utility styles near the top of `src/app/globals.css`. The main accent is `#d11b2d`.
- **Page copy:** each page is in `src/app/<page>/page.tsx`.

## Replace images and branding

All current art is original local SVG placeholder artwork; the site does not hotlink GTA screenshots.

- Hero: `public/images/hero/city.svg`
- Businesses: `public/images/businesses/`
- Departments: `public/images/departments/`
- Gallery: `public/images/gallery/`
- Temporary NB mark and favicon: `public/branding/nb-mark.svg`

You can replace an SVG with a `.webp` or `.avif`, then update the matching path in `src/data/content.ts` or the page component. Keep descriptive alt text. Recommended hero size is at least 1920×1080; card images should use a consistent 16:9 ratio.

## Deploy to Vercel

1. Push the repository to GitHub.
2. Sign in at [vercel.com](https://vercel.com) and choose **Add New → Project**.
3. Import `Hombre187/northbridge-website`.
4. Leave **Framework Preset** as Next.js, **Root Directory** as `./`, and the build settings at their detected defaults.
5. Select **Deploy**. No environment variables are required for this version.

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
  data/content.ts    Editable businesses, departments, staff, and features
  lib/                Server-status fallback
```

## Future live server status

Keep the existing `ServerStatus` interface and replace `getFallbackServerStatus()` with a cached server-side fetch. Do not call a protected game server endpoint from a client component. Store any private API token in a Vercel environment variable, never in `site.ts`, and preserve the offline fallback so a server outage cannot break the website build or page.
