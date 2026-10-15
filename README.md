# Angelyn Serpa Juan — Portfolio Website

A static portfolio site written in plain HTML, CSS and JavaScript. There is no build step and nothing to install, so it can be hosted for free.

```
index.html        page structure
css/styles.css    all styling
js/data.js        ALL content: projects, videos, career, tools, contact
js/app.js         rendering and interactions (filters, video dialog, timeline)
videos/           put MP4 files here (optional)
thumbs/           put thumbnail images here (optional)
```

To change any text or video, edit **js/data.js** only.

---

## 1. Add your videos

Each project in `js/data.js` has a `video` field. You have three options.

**A. Google Drive (quickest)**
1. In Drive, right-click the video, then Share → General access → **Anyone with the link** → Copy link.
2. Paste the link into the project:
   ```js
   video: { type: "drive", src: "https://drive.google.com/file/d/1AbC.../view?usp=sharing" },
   ```
   The thumbnail is picked up automatically.

Drive limits: it shows its own player controls, a busy video can hit Drive's viewing limits for a while, and playback can be slower to start. It works fine for a portfolio, but option B looks more professional.

**B. MP4 files in the site (best quality, no extra cost)**
1. Export each video as MP4 (H.264). Keep each file under about 20 MB. A 1080×1920 export at 6–8 Mbps is plenty for a reel.
2. Put it in `videos/`, and optionally put a JPG still in `thumbs/`.
3. Set:
   ```js
   video: { type: "file", src: "videos/pet-supplement-ad.mp4" },
   thumbnail: "thumbs/pet-supplement-ad.jpg",
   ```
   Hovering a card plays a silent preview, and clicking opens the full player with sound controls. Nothing autoplays with sound.

**C. YouTube or Vimeo**
Upload as unlisted and use `type: "youtube"` or `type: "vimeo"` with the link.

Then fill in, for each project: `title`, `category`, `summary`, and whichever of `concept`, `hook`, `production`, `tools`, `editing` and `deliverables` you know. Empty fields are hidden on the live site.

**Categories and filters** are built from the `category` values you use. Rename "AI Video Samples" to real categories (for example "Product Commercials" or "Pet & Supplement Ads") and the filter buttons update automatically. A category only appears if a project uses it.

**Featured work:** set `featured: true` on your best 3. They appear in the hero, above the fold.

**Case studies:** any project with a `caseStudy` block appears in the Case Studies section. Delete the block to remove it.

**Hook covers:** each card shows a title card until a cover image loads. On the live site, Google Drive's automatic thumbnail is used, and it may not show your hook text. To control the cover, take a screenshot of the hook frame from each video, save it in `thumbs/` (e.g. `thumbs/ugc-skincare.jpg`), and set `thumbnail: "thumbs/ugc-skincare.jpg"` on that project.

**Photo:** `images/angelyn.webp`, set in the `photo` field of `js/data.js`.

## 2. Before you share the site

In `js/data.js`:
- `draftMode` is now `false`. Set it to `true` to see "To add" labels on missing project details.
- `showPhone: true` shows your WhatsApp/Telegram number. Set it to `false` to hide it.

Tools on the site are only the ones listed on your resume. Kling, Higgsfield and Runway were in your brief but not on your resume, so they are left out. If you use them, add them to the `tools` list.

## 3. Preview on your computer

Opening `index.html` directly in a browser works for most things. For an accurate test, run a tiny local server from this folder:

```
python3 -m http.server 8000
```
Then open http://localhost:8000. (If you have Node.js installed, `npx serve` works too.)

## 4. Publish for free

**Netlify (easiest, no account setup beyond sign-in)**
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. You get a live `*.netlify.app` URL. Rename it in Site settings, for example `angelyn-ai-video.netlify.app`.
4. To update later, drag the folder again from the site's Deploys tab.

**Vercel**
1. Put this folder in a GitHub repository.
2. At https://vercel.com/new, import the repository. Framework preset: **Other**. Leave the build command empty.
3. Every push to GitHub updates the site automatically.

**GitHub Pages** also works: repository → Settings → Pages → deploy from the `main` branch root.

Large MP4 files: GitHub rejects single files over 100 MB, and Netlify/Vercel free tiers have bandwidth limits. Keep the videos compressed, or host them on Drive, YouTube or Vimeo instead.

## 5. Custom domain (optional, about $10–15 a year)

1. Buy a domain from any registrar (Namecheap, Porkbun, Cloudflare).
2. Netlify: Domain management → Add a domain. Vercel: Project → Settings → Domains → Add.
3. Copy the DNS records they show you into your registrar's DNS settings.
4. HTTPS is set up for free automatically once DNS updates, usually within an hour.

## 6. Claude preview vs. the real website

The Claude artifact preview is private to your Claude account and is not a public website. In that preview:
- Google Drive, YouTube and Vimeo players are blocked, and Drive thumbnails do not load. The "Watch it on Google Drive" link under each player still works.
- The email link may not open your mail app; the Copy button works.

None of these limits apply once the folder is hosted on Netlify, Vercel or GitHub Pages. The code is the same; nothing needs to change for deployment.
