# Yogic Threads — website

**Live at <https://rajniyogicthreads.github.io/>**
Repo: <https://github.com/rajniyogicthreads/rajniyogicthreads.github.io>

A single-page static site — plain HTML, CSS and a little JavaScript. No build step, no
framework, no dependencies. What's in the repo is exactly what the browser gets.

```
├── index.html      all the page content
├── styles.css      colours, type, layout
├── script.js       mobile menu, scroll fades, contact form
├── .nojekyll       tells GitHub Pages to serve the files as-is
└── images/         the photos (see images/README.md)
```

## 1. Updating the site

The repo *is* the website: GitHub Pages serves the `main` branch directly, so pushing is
deploying. There is no separate publish step.

```powershell
cd C:\Users\mundh\Downloads\yogic-threads\yogic-threads
# edit index.html / styles.css / images…
git add -A
git commit -m "what changed"
git push
```

Live within a minute or two. Hard-refresh (Ctrl+F5) if you still see the old version —
browsers cache `styles.css` and `script.js` aggressively.

`git` and `gh` are installed on this machine and `gh` is signed in as **rajniyogicthreads**.
If a terminal says `git is not recognized`, it was opened before the install — open a fresh
PowerShell window.

Prefer not to use the command line? Edit any file straight on GitHub with the pencil icon,
or use **Add file → Upload files** to swap a photo. Every commit redeploys.

## 2. Preview locally before pushing

Double-click `index.html`, or run a proper local server:

```powershell
cd C:\Users\mundh\Downloads\yogic-threads\yogic-threads
python -m http.server 8000
# then open http://localhost:8000
```

## 3. Classes and registration

Classes live in the `<section class="classes" id="book">` block of `index.html`. Each batch
is one `<article class="class-card">` holding a title, the days and times, a description
and a Register button pointing at its Google Form.

| Batch | Days | Time | Register form |
|---|---|---|---|
| Early Morning Yoga | Mon–Fri | 6:30–7:30 am | `forms.gle/614QzP8ov1SvWdWH8` |
| Evening (working professionals) | Mon–Thu | 9:00–9:50 pm | `forms.gle/614QzP8ov1SvWdWH8` |
| Seniors — Light Movement & Pranayama | Mon–Fri | 11:00 am–12:00 pm | `forms.gle/GVaMT1BMcgfFQKuFA` |
| Kids Yoga (age 5+), CAD 20/month | Sat / Sun | 9:15–10:00 am / 9:00–9:45 am | `forms.gle/rFywkZGFNWA9pvf27` |

- **Change a time** — edit that card's `<p class="class-when">` line.
- **Change where Register goes** — edit that card's `href`.
- **Add a batch** — copy a whole `<article class="class-card reveal">…</article>` block.
  The grid reflows on its own and stacks to one column on phones.

⚠️ The morning, evening and seniors buttons all resolve to the **same** Google Form
(`…fHCOgPsR1DTs…`). Unless that form asks *which class are you registering for?*, the
sign-ups can't be told apart. Only the kids batch has its own form.

There is deliberately **no Calendly** on the site. An earlier version embedded one, but the
link was a single-use `/d/` link — those expire after their first booking, and visitors were
getting a "Something went wrong" page. If a scheduler is wanted later, use a permanent
*event type* link (no `/d/` in it), or Cal.com, whose free plan allows unlimited event types
where Calendly's free plan allows one.

## 4. The contact form

Static hosting can't run server code, so the form needs a free relay to deliver mail:

1. Sign up at <https://formspree.io> (free tier: 50 submissions/month).
2. Create a form and copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, replace `https://formspree.io/f/YOUR_FORM_ID` with it.

**Until that's done the form does not send anything.** It falls back to opening the
*visitor's own* email app with the details pre-filled, which they then have to send
themselves. That works on desktop but is unreliable on phones, where many people have no
mail app set up — so some enquiries will be lost. Worth the two minutes.

The form collects name, email, which service they want, a preferred date and time, and a
message. `script.js` blocks past dates automatically, computed from the visitor's own clock,
so it never needs editing.

## 5. Testimonials (built, switched off)

The section is styled and ready but commented out. The two reviews inherited from the
original template are demo text, both signed "Example Customer Review" — publishing them
would put invented praise on a real business site. To switch it on:

1. In `index.html`, find the block starting `<!-- TESTIMONIALS`.
2. Replace the placeholder quotes and names with real ones.
3. Delete the `<!--` line above `<section class="reviews">` and the `-->` after its
   closing `</section>`.

## 6. Photos

Every image sits in `images/` — see [images/README.md](images/README.md) for what's where.
To change one, overwrite the file keeping the same name. If a file is ever missing, the page
shows a lavender placeholder naming it rather than a broken image.

The class posters are **not** on the site; they've only ever existed as chat attachments.
To use them, save them into `images/` and add them to the class cards or the gallery.

## 7. Editing the look

- **Text** — all of it is in `index.html`, in plain sentences you can edit directly.
- **Colours** — the top of `styles.css` defines `--violet`, `--lavender`, `--ink`. Change
  those and the whole site follows.
- **Fonts** — Playfair Display (headings) and Manrope (body), from Google Fonts in `<head>`.
- **Adding a service** — copy one `<article class="card reveal">…</article>` block in the
  Services section and edit it.

## 8. Hosting notes

Free forever, with HTTPS, on GitHub Pages. Two constraints worth remembering:

- **The repo must stay public.** Free Pages requires it. Nothing secret is in the site, but
  Rajni's email, Instagram and the registration links are readable by anyone. Her phone and
  WhatsApp numbers were deliberately removed and are not in the repo.
- **Don't rename the repo.** `rajniyogicthreads.github.io` is what produces the clean root
  URL. Any other name would serve the site from a `/sub-path/` instead.

**Custom domain (optional)** — GitHub Pages supports one free; you only pay a registrar for
the domain itself (~$10–15/yr, e.g. `yogicthreads.com`). Add it under **Settings → Pages →
Custom domain** and point the registrar's DNS at the values shown. HTTPS is issued
automatically.
