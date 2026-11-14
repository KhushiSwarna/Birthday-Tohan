# Tohan Bhaiya’s birthday party

A playful birthday surprise with a cartoon night owl, a laptop to close, and a four-step cake party.

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

- **Close the laptop** clocks the owl out of work: its wing shuts the lid, the laptop slides away, and the party hat and cake appear. The cake steps then unlock.
- **Blow candles → Cut the cake → Take a bite → Let’s dance.** Each step has its own button and owl animation. Future steps unlock in order; tapping the cake also performs the next action.
- The owl puffs out the candles, cuts a slice, lifts it to its beak, and dances in headphones. The final step turns the page into a disco with a mirror ball, a dance floor, and moving lights.
- **LEADERS DON’T SLEEP.** appears as a larger headline below the animation on the final dancing screen.
- **Pause the dance** takes a breather. **Start again** restores the whole cake, candles, and sequence. Fireworks, confetti, and decorations celebrate the wish and the dance.
- Tap the owl to see its happy face. Its eyes follow the pointer on desktop.
- Open the present for a little birthday note.
- Music defaults to on, with a visible off/on toggle. An original tune is synthesized locally, with a stronger beat for the dance. Where the browser blocks autoplay, it starts on the first tap or key press. It pauses when the tab is hidden, and stays muted if the visitor switches it off.
- All controls support keyboard and touch. Reduced motion keeps the complete four-step story and its final poses, with fireworks, confetti, and choreography switched off.

## Check

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser tests cover laptop closing and step ordering, candle/cake/dance changes, the final slogan and its separation from the animation, pause/restart, music playback/mute, reduced motion, and phone, tablet, desktop, and landscape layouts. Tests run in desktop Chromium and a mobile Chromium context.

## Edit

- `src/components/AfterHours.tsx`: birthday copy and the four-step sequence.
- `src/components/usePartyMusic.ts`: locally synthesized music and autoplay handling.
- `src/components/BirthdayOwl.tsx`: original vector illustration.
- `src/app/globals.css`: colors, typography, layout, and responsive rules.
- `src/app/layout.tsx`: page title, sharing text, and local font imports.

Built with Next.js App Router, TypeScript, Tailwind CSS, GSAP, and Lucide. The owl, cake, balloons, present, and favicon are original inline SVG artwork. Fredoka and Inter are bundled locally through Fontsource; no remote images, videos, or fonts are requested by visitors.
