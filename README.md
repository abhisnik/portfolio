# Abhishek Kumar Pramanik | Portfolio

Personal portfolio built with React, Vite, Three.js, GSAP, and Lenis.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Create an empty repository on GitHub. A repository named `portfolio` will deploy at `https://YOUR-USERNAME.github.io/portfolio/`.
2. Add the remote and push this project:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git add .
git commit -m "Prepare portfolio for deployment"
git push -u origin main
```

3. In GitHub, open **Settings > Pages**, set **Source** to **GitHub Actions**, and wait for the workflow to finish.

Every push to `main` will rebuild and redeploy the site.
