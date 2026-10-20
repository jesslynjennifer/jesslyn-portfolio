# Jesslyn Jennifer Wibowo — Portfolio

A static portfolio website (plain HTML, CSS, and a little JavaScript). There is no build step,
so it deploys to Vercel as-is.

## Files

```
index.html            the page (all text lives here)
assets/css/style.css  styling
assets/js/main.js     mobile menu, active-section highlight, certificate viewer
assets/images/        project, competition, and certificate images (WebP)
assets/fonts/         Archivo font (SIL Open Font License, see OFL.txt)
```

## Preview on your computer

Open `index.html` in a browser. Or run a small server from this folder:

```
python3 -m http.server 8000
```

then visit http://localhost:8000

## Edit content

- Text, links, and dates: edit `index.html`.
- Replace an image: save the new file with the same name in `assets/images/`.
- Colors and sizes: the top of `assets/css/style.css` holds the main settings (`:root`).

## After the first deploy

In `index.html`, change `https://YOUR-SITE.vercel.app` (in the `og:image` line) to your real
Vercel address. This is the preview picture that appears when the link is shared on WhatsApp,
LinkedIn, and similar apps.
