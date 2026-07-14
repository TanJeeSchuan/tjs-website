# Your site

A Vue 3 + Vite site that deploys itself. Push to `main` and it's live in about a minute.

## Make it yours

Edit **`site.config.json`**. That one file controls the site name, the accent
colour, your name in the footer, and the links on the home page:

```json
{
  "siteName": "Ada's Corner",
  "subdomain": "ada",
  "githubRepo": "https://github.com/ada/site",
  "owner": "Ada Lovelace",
  "themeColor": "#e11d48",
  "tagline": "Mathematician, occasionally.",
  "links": [{ "label": "GitHub", "url": "https://github.com/ada" }]
}
```

Don't change `subdomain` — it decides where the site is served from.

Then edit the pages in `src/views/` — they're ordinary Vue components.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build + guardrail check
```

## Deploying

Push to `main`. That's it. A GitHub Action builds the site and ships it.

Watch it happen under the repo's **Actions** tab.

## Guardrails

Before anything is deployed, the build checks that:

- the whole site is **under 25 MB**, and no single file is over 10 MB
- every file is a **web asset** — HTML, CSS, JS, images, or fonts

If a check fails, the build stops and **nothing is deployed** — your live site
keeps serving the last good version. You'll see the reason in the Actions log.

The usual cause is committing an uncompressed photo or a video. Resize the image,
or host large media somewhere else and link to it.

You can check before pushing by running `npm run build` locally.
