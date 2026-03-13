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

Learn more about Slidev at the [documentation](https://sli.dev/).
