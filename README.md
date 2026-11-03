# Fashion Designer Portfolio (Next.js)

A premium, dark, video-driven portfolio for a fashion designer. Every section uses moving video:
hero story, about, services, collection cards, the call-to-action band and the project viewer.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Edit your content

Everything lives in **`data/portfolio.ts`**:

| What | Where |
| --- | --- |
| Name, role, city, contact, studio address, hours | `profile` |
| Hero video story (Cutting → Stitching → Shoot) | `heroClips` |
| Scrolling words under the hero | `marquee` |
| Numbers in the About section | `stats` |
| 12 service cards, each with its own video (01–12) | `services` |
| Collection: 8 projects per category (Bridal, Evening, Formal, Editorial) | `works` (`bridal`, `evening`, `formal`, `editorial` lists) |
| Process steps and client reviews | `steps`, `testimonials` |
| About and call-to-action videos | `media` |

## Replace the sample media with your own

All current videos and photos are **free stock samples from mixkit.co** (free for commercial use, no credit
required). Replace them with your own work as soon as you can.

- Hero: `public/videos/01-cutting.mp4`, `02-stitching.mp4`, `03-photoshoot.mp4`
- Sections: `public/videos/sections/` and `public/images/sections/`
- Projects: each project uses three files:
  - `public/images/work/<name>.jpg`: cover photo
  - `public/videos/work/<name>-sd.mp4`: clip that loops in the grid (720p, ~8 s, around 1–3 MB)
  - `public/videos/work/<name>-hd.mp4`: high-quality clip for the pop-up viewer (1080p, ~12 s, around 4–10 MB)

  A project can also be just a photo: remove `video` / `videoHd` and keep `image`.

Video tips: short (5–15 s), no audio, H.264 MP4. Videos only load when they scroll into view.

## Contact form

The form needs no server: it opens WhatsApp (or the visitor's email app) with the enquiry pre-filled.

## Deploy (free) on Vercel

1. Push the project to GitHub.
2. On [vercel.com](https://vercel.com), choose **Add New → Project**, select the repo, and click **Deploy**.

## Change colors and fonts

Edit the variables in `:root` at the top of `app/globals.css` (`--gold`, `--bg`, `--grad`, etc.).
Fonts (Bodoni Moda + Manrope) are loaded in `app/layout.tsx`.
