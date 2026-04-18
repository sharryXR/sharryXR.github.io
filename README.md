# Rui Xie Personal Homepage

This repository contains the public source for an English-first personal site built with Astro and prepared for GitHub Pages deployment.

## Public-content policy

- Only explicitly curated assets from the private materials archive should enter this repository.
- Works that are still under review must use venue-neutral status labels such as `Under Review`.
- Unpublished project material stays out of this repository until it is ready to be public.

## Local development

```bash
npm install
npm run dev
```

## Build and verification

```bash
npm test
npm run build
```

## Deployment target

The GitHub Pages user-site repository for this account should be named `sharryXR.github.io`.

After creating that repository, push this project to it and use the included GitHub Actions workflow for deployment.

```bash
git remote add origin git@github.com:sharryXR/sharryXR.github.io.git
git branch -M main
git push -u origin main
```

## Customization checklist

- Replace the repository remote if you prefer HTTPS instead of SSH.
- Add any public external profiles you want to surface.
- Use `SITE_URL=https://sharryXR.github.io` for local builds if you want canonical metadata locally.
