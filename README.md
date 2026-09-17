# Yogic Threads — personal website

A single-page static site (plain HTML, CSS and a little JavaScript — no build step, no
framework, no dependencies). Because it's static, every major free host will serve it
for $0 with HTTPS included.

```
yogic-threads/
├── index.html      all the page content
├── styles.css      colours, type, layout
├── script.js       mobile menu, scroll fades, contact form
└── images/         your photos (see images/README.md)
```

## 1. Preview it locally

Just double-click `index.html`. Or, for a proper local server:

```powershell
cd C:\Users\mundh\Downloads\yogic-threads\yogic-threads
python -m http.server 8000
# then open http://localhost:8000
```

## 2. Photos

Already done — every image was copied across from the live soloist page into `images/`
(see [images/README.md](images/README.md) for what's where). To change one, overwrite the
file keeping the same name. If a file is ever missing, the page shows a lavender
placeholder naming it rather than a broken image.

## 3. Turn on the contact form (optional, free)

Static hosts can't run server code, so the form uses a free form-relay service:

1. Sign up at https://formspree.io (free tier: 50 submissions/month).
2. Create a form and copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, replace `https://formspree.io/f/YOUR_FORM_ID` with it.

Leave it as-is and the form still works — it opens the visitor's email app with the
message pre-filled instead.

## 3b. Booking and testimonials

**Booking** is live: the "Book a Session" / "Schedule Now" buttons and the contact list all
point at your Calendly (`calendly.com/d/cnwb-wgc-x3x/yoga-session`). If that link ever
changes, it appears in three places in `index.html` — search for `calendly.com`.

**Testimonials** are built but deliberately switched off. The two reviews on the soloist
page are the template's demo text (both signed "Example Customer Review"), so publishing
them would put invented praise on a real business site. To turn the section on:

1. In `index.html`, find the block starting `<!-- TESTIMONIALS`.
2. Replace the placeholder quotes and names with real ones.
3. Delete the `<!--` line above `<section class="reviews">` and the `-->` line after its
   closing `</section>`.

Styling is already in place, so it will look finished the moment you uncomment it.

## 4. Publish it (pick one)

### Option A — Netlify Drop (fastest, no account needed to try)

1. Go to https://app.netlify.com/drop
2. Drag the whole `yogic-threads` folder onto the page.
3. You get a live URL in seconds, e.g. `yogic-threads.netlify.app`.
   Sign in (free) to keep it permanently and rename the subdomain.

### Option B — GitHub Pages (chosen — best for editing over time)

No `git` needed: GitHub's website accepts drag-and-drop uploads. Do all of this signed in
to **the site owner's** GitHub account (free at https://github.com/signup).

1. **Create the repo** — https://github.com/new
   - Repository name: **`<username>.github.io`**, using the account's exact username.
     That exact name gives a clean address, `https://<username>.github.io/`. Any other
     name works too, it just lands at `https://<username>.github.io/<repo-name>/`.
   - Visibility: **Public** (free Pages requires it — see the note below).
   - Leave "Add a README" unticked, then **Create repository**.

2. **Upload the files** — on the empty repo, click **uploading an existing file**.
   - Open `C:\Users\mundh\Downloads\yogic-threads\yogic-threads` in Explorer.
   - Select everything *inside* it (Ctrl+A) and drag that selection onto the page.
     Drag the **contents**, not the folder itself — `index.html` has to sit at the top
     level of the repo or the site won't load.
   - Check that `index.html`, `styles.css`, `script.js` and the `images` folder are all
     listed, then **Commit changes**. (`.nojekyll` is an empty file and the web uploader
     sometimes drops it — harmless here, nothing in the site relies on it.)

3. **Turn on Pages** — repo → **Settings** → **Pages** → Source: **Deploy from a branch**
   → branch `main`, folder `/ (root)` → **Save**.

4. Wait 1–2 minutes, then open **`https://<username>.github.io/`**. The Actions tab shows
   a green tick when the deploy finishes.

Free GitHub Pages requires the repo to be **public**. Nothing secret is in the site, but
the owner's email, Instagram and Calendly link sit in `index.html` —
the same details already published on the soloist page.

To update the site afterwards, open the file in the repo and click the pencil icon, or
use **Add file → Upload files** to replace a photo. Every commit redeploys automatically.

### Option C — Cloudflare Pages

Connect the GitHub repo at https://dash.cloudflare.com → Workers & Pages → Create →
Pages. Build command: *none*. Output directory: `/`. Free, fast CDN, unlimited bandwidth.

## 5. Custom domain (optional)

All three hosts support a custom domain free of charge — you only pay the registrar for
the domain itself (~$10–15/yr, e.g. `yogicthreads.com`). Add it under the host's
*Domains* settings and point the registrar's DNS at the values it shows you. HTTPS is
issued automatically.

## Editing the content

- **Text** — all of it lives in `index.html`, in plain sentences you can edit directly.
- **Colours** — the top of `styles.css` has `--violet`, `--lavender`, `--ink`. Change
  those three and the whole site follows.
- **Fonts** — Playfair Display (headings) and Manrope (body), loaded from Google Fonts
  in the `<head>` of `index.html`.
- **Adding a service** — copy one `<article class="card reveal">…</article>` block and
  edit it; the grid reflows on its own.
