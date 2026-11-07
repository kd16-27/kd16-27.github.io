# Kaden Diaz — immersive portfolio (work in progress)

Experimental public portfolio for AV systems engineering, software and intelligent interfaces.

**Development branch:** `feature/immersive-portfolio-v1`. **This branch does not update the public site until explicitly merged and deployed.** The previous main branch currently has only a README.

## Run on the personal Mac

```bash
git clone https://github.com/kd16-27/kd16-27.github.io.git
cd kd16-27.github.io
git switch feature/immersive-portfolio-v1
npm install
npm run dev
```

Visit the local address printed by Vite (usually **http://127.0.0.1:5173**).

The current baseline runs with **React, TypeScript, Motion, Anime.js, Tailwind and custom CSS**. It includes:

- Kinetic cinematic hero and rotating orbital graphic
- Filterable project cards, project details, working GitHub links
- Keyboard command menu (`/` to open, Escape to close)
- Responsive mobile layout, reduced-motion support
- Alternate lab color mode

This is a **source implementation**, not yet independently built/tested on the owner's Mac or visually verified. All public-facing projects are curated; no work/client/government-sensitive data, device IPs, credentials, internal tooling or private dashboards should be published.

## UI registry integration — next local build milestone

The repo is configured with a `components.json` file to use official free shadcn registries. From a clean checkout with internet access:

```bash
npm run ui:install
```

The script requests:

- Magic UI: `@magicui/text-animate`
- Cult UI: `@cult-ui/halo-button`
- Skiper UI: `@skiper-ui/skiper58`

**Important:** Components are not yet imported into the rendered layout and registry files are not yet committed. The first install must be tested, reviewed for dependencies and then deliberately integrated into the design. Some Skiper components are premium; the listed one is documented as free at time of planning. Attribution to Skiper UI is required when using its free components. Never commit a registry API key.

Official docs: [Magic UI](https://magicui.design/docs/installation), [Cult UI](https://www.cult-ui.com/docs/installation), [Skiper UI](https://skiper-ui.com/docs/quick-start).

## Deployment

Use a static Vite build suitable for the `kd16-27.github.io` root domain. The build command is `npm run build`, with output in `dist/`. **No automatic production deployment is configured yet.** First review accessibility, visual quality, external links, mobile responsiveness and content.

## Separate systems

The personal Jarvis control HUD and private homelab services belong in the private `homelab` repository and should only be reached via local/private authenticated endpoints, never embedded as live controls here.
