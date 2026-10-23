# For Tutu ♡ — Next.js love card

A non-scrollable, page-by-page romantic mini-site for Sanjana, built with Next.js, React, Framer Motion, and Lucide icons. Includes the four provided photos and an original looping melody.

## Run locally
1. Install Node.js 20 or newer.
2. Unzip this folder.
3. In this folder, run:
   ```bash
   npm install
   npm run dev
   ```
4. Open http://localhost:3000

## Free hosting with Vercel
1. Create a free GitHub account at https://github.com/ if needed.
2. Create a new repository, e.g. `for-tutu`, and upload the contents of this folder (not the ZIP itself).
3. Sign in at https://vercel.com/ with GitHub.
4. Choose **Add New → Project**, import `for-tutu`, and click **Deploy**. Keep the detected Next.js settings.
5. Vercel will give you a public `*.vercel.app` URL you can share with Sanjana.

## Background music note
Browsers and phones generally block audible autoplay until the visitor interacts with the page. This project starts the looping background melody on the first tap anywhere, and the music button can pause/resume it. It cannot reliably force sound before any user gesture.

## Photos
The four user-provided photos are in `public/photos/` and are part of the design, not upload placeholders.
