# Tohan Bhaiya’s birthday party

A playful birthday surprise with an original cartoon owl, birthday candles, confetti, and a little present. No product gallery or trading dashboard.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Build and preview

```sh
npm run build
npm start
```

The complete static website is exported to `out/`. The included preview server serves it at port 3000; set `PORT` to choose another port.

## Deploy to Vercel

From this folder:

```sh
npx vercel
```

Choose the Next.js framework when prompted. To publish the production version:

```sh
npx vercel --prod
```

You can also connect this folder as a Git repository in Vercel. Use `npm run build`; Next.js handles the static export. The `out/` folder can also be hosted on any static web host. There are no environment variables, API keys, or backend services to configure.

## The little surprises

- **Make a wish** or tap the cake to blow out the candles. Bunting, balloons, streamers, confetti, and fireworks join the party. **One more wish?** relights the candles, blows them out again, and starts a fresh celebration on every press.
- Tap the owl to see its happy face. Its eyes follow the pointer on desktop.
- Open the present for a little birthday note.
- Sound starts off. Turn it on for a short celebration chime; mute remains available during the celebration.
- All controls support keyboard and touch. Reduced motion keeps the decorations and candle feedback, with fireworks, confetti, and decorative motion switched off.

## Check

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser tests cover the greeting, removed content, candles, replay, present, owl, audio controls, reduced motion, and overflow on phone, tablet, desktop, and landscape sizes. Tests run in desktop Chromium and a mobile Chromium context.

## Edit

- `src/components/AfterHours.tsx`: birthday copy, party interactions, and audio.
- `src/components/BirthdayOwl.tsx`: original vector illustration.
- `src/app/globals.css`: colors, typography, layout, and responsive rules.
- `src/app/layout.tsx`: page title, sharing text, and local font imports.

Built with Next.js App Router, TypeScript, Tailwind CSS, GSAP, and Lucide. The owl, cake, balloons, present, and favicon are original inline SVG artwork. Fredoka and Inter are bundled locally through Fontsource; no remote images, videos, or fonts are requested by visitors.
