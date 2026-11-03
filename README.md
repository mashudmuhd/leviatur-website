# Leviatur — Parfum Atelier

A premium four-tab React 18 experience using Vite, Tailwind CSS and Framer Motion. No router, analytics, backend or heavy component library.

## Run

Requires Node.js 20.19+ (or Node 22 LTS) and npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Production assets are written to `dist/`.

## Project structure

```text
leviatur-atelier/
├── index.html                # SEO, Open Graph, favicon and preloads
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── netlify.toml
├── public/
│   ├── favicon.svg
│   ├── fonts/                # Self-hosted Latin-subset WOFF fonts
│   └── images/               # Optimized WebP photo and responsive bottle crops
└── src/
    ├── main.jsx
    ├── App.jsx               # ARIA tabs, keyboard navigation, AnimatePresence
    ├── data.js               # Product content and contact configuration
    ├── fonts.css
    ├── style.css             # Mobile-first visual system and reduced motion
    ├── ui.jsx                # Shared reveal and bottle components
    ├── Detail.jsx            # Lazy-loaded, focus-trapped product dialog
    └── tabs/
        ├── Home.jsx
        ├── Collection.jsx
        ├── Story.jsx
        └── Contact.jsx
```

## Before accepting orders

Edit `src/data.js`:

```js
export const brand = {
  whatsapp: '919876543210', // EXAMPLE ONLY: replace with the real number, digits only
  instagram: 'https://www.instagram.com/YOUR_REAL_HANDLE/'
};
```

Both fields are intentionally empty in this delivery. Until supplied, the form prepares a local enquiry for copying; it never sends data or accepts payments. When configured, a WhatsApp link opens the composed enquiry and the customer decides whether to send it. No contact details are persisted.

The 50 ml size is visible on the supplied packaging. Pricing remains “Price on request.” Detailed fragrance notes are proposed creative copy based on the brief, not a verified ingredient list. Confirm notes, shipping, returns, product facts and contact URLs before a commercial launch. Replace the absolute Open Graph origin/image URL in `index.html` when deploying to your own domain.

## Deploy to Vercel

1. Push this project to your GitHub repository (exclude `node_modules`, `dist` and the optional Sites-specific `.openai` directory).
2. Import the repository in Vercel and select Vite.
3. Build command: `npm run build`. Output directory: `dist`. Install: `npm ci`.
4. Deploy. `vercel.json` supplies the matching settings. No SPA rewrite is required because navigation uses tab state and the app has only `/`.

Or run `npx vercel` from your project and follow its prompts, then `npx vercel --prod`.

## Deploy to Netlify

1. Import your Git repository into Netlify.
2. Build command: `npm run build`. Publish directory: `dist`.
3. Deploy. The included `netlify.toml` supplies these settings and immutable caching for hashed Vite assets.

For manual deployment, build locally and upload the `dist` folder using Netlify's manual deploy interface.

## Accessibility and motion

Arrow keys cycle tabs; Home and End jump to first and last. Tabs use roving tabIndex and a named tabpanel. Dialogs trap focus, close with Escape/backdrop/close button, and return focus to the trigger. Forms have labels, validation and status feedback. Native details/summary provide keyboard-accessible FAQs. Reduced motion disables decorative float/tilt/reveal motion. Pointer tilt runs only for fine pointers with hover.

## Images and fonts

The new cinematic campaign images were AI-generated using the original photograph as the bottle identity reference. Leviatur uses warm amber lighting, wood and resin; Rose La Vie uses rose light, petals and lavender. These are artistic campaign interpretations, not ingredient verification or exact packshot reproductions. They are optimized as responsive 400/800/1200px WebP files with dimensions, lazy loading and a hero preload. Self-hosted Latin-subset Cormorant Garamond and Inter use font-display: swap. Font license files are included under public/fonts/.

## Performance and validation

All four tabs use React.lazy/Suspense. The product dialog is split separately. Animations use opacity and transforms. Tab exit plus entry total 240 ms. No blanket will-change.

The production build passes. Initial JavaScript including the Home/shared chunks is approximately 89 KB gzip, below the requested 150 KB budget. All JS chunks combined are under 100 KB gzip. Lighthouse 95+ is a target, not an audited result; run a production Lighthouse audit on your deployed URL, in mobile mode and in a clean browser. Private Sites authentication may affect audit results; test your Vercel/Netlify deployment directly. Use the audit to verify performance, accessibility, best practices and SEO before launch.

Manual verification covers desktop/mobile layout, tabs, product modal, Escape/focus behavior, order enquiry formatting and FAQ. A full automated Lighthouse audit was not available in this environment.

## GitHub Pages

The Pages workflow builds and deploys from main. In Settings → Pages choose GitHub Actions. Run the workflow manually for the first deployment. This account requires a public repository for Pages on its current plan.

The workflow sets VITE_BASE_PATH to /leviatur-website/. When adding a custom domain, change this value to /, set the domain in Settings → Pages, configure DNS and run the workflow again.
