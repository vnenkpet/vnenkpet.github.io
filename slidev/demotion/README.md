# Welcome to [Slidev](https://github.com/slidevjs/slidev)!

To start the slide show:

- `pnpm install`
- `pnpm dev`
- visit <http://localhost:3030>

Edit the [slides.md](./slides.md) to see the changes.

## Deploy to GitHub Pages (vnenkpet.github.io)

The presentation is served at **https://vnenkpet.github.io/demotion/**.

- **Rebuild locally:** run `pnpm run build:gh` — this builds with base `/demotion/` and writes output to the repo root `demotion/` folder. Commit and push `demotion/` to update the live site.
- **Auto-deploy:** a GitHub Actions workflow (`.github/workflows/deploy-slidev.yml`) runs on push to `main` when files under `slidev/demotion/` change; it rebuilds and commits the `demotion/` folder so the site stays up to date.

- **Direct slide URLs:** The repo root has a `404.html` that, for paths under `/demotion/` (e.g. `/demotion/3`), loads the same SPA so client-side routing works. Commit `404.html` once; the workflow does not modify it.

- **Images:** Build uses base `/demotion/`, so asset URLs are `/demotion/assets/...`. If project highlight images appear broken on the live site, ensure the latest build is deployed and try a hard refresh (cache).

Learn more about Slidev at the [documentation](https://sli.dev/).
