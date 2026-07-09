# CM100 Crew Planner

Mobile-first race day planning and live tracking app for the **Crazy Mountain 100** (July 24, 2026). Single HTML file, works fully offline, syncs via GitHub Gist.

**Live site:** `https://mclairewrazej-goatgirl.github.io/cm100-crew`

---

## Crew quick start

1. Open the URL above in **Safari** (iOS) or **Chrome** (Android)
2. Go to **⚙️ Sync** tab → enter the Gist ID and token you were given → **Save & Connect**
3. Add to home screen: Safari → Share → Add to Home Screen (iOS) or Chrome menu → Add to Home Screen (Android)
4. The app now works offline — it caches everything after first load

---

## Setup (runner does this once)

### 1. Create a GitHub Gist

1. Go to **gist.github.com** (log in with your GitHub account)
2. Set filename to exactly: `cm100_plan.json`
3. Paste as content: `{"nutDB":[],"plan":{},"strategy":{},"pace":{},"gearSections":[],"legNotes":{},"stationNotes":{},"crewInfo":{}}`
4. Click **Create secret gist**
5. Copy the Gist ID from the URL (the long hash at the end)

### 2. Create a GitHub token

1. Go to **github.com/settings/tokens** → Generate new token (classic)
2. Name it `cm100-crew`, expiry 90 days
3. Check only the **gist** scope
4. Generate and copy the token immediately (shown once)

### 3. Connect the app

Open the app → **⚙️ Sync** tab → paste Gist ID and token → **Save & Connect**

### 4. Share with crew

- Send crew the GitHub Pages URL
- For the token: create a second token with gist scope, or share the same one (it only has gist access)
- Each crew member enters the same Gist ID + token in their ⚙️ Sync tab

---

## How offline works

The app uses a **Service Worker** to cache itself after first load. Once visited with signal, it loads fully offline — all course notes, gear lists, fuel plan, and ETAs are available without internet.

Sync (GitHub Gist API) still requires signal, but the cached data is always there as a reference.

---

## Deploying updates to GitHub Pages

```bash
git add index.html sw.js manifest.json README.md
git commit -m "Update crew planner"
git push
```

Pages auto-deploys in ~60 seconds. **Note:** after pushing updates, crew devices on the old cached version will get the new version automatically on their next visit with signal (service worker updates in the background).

---

## Repo structure

```
index.html      — the full app (single file)
sw.js           — service worker for offline caching
manifest.json   — PWA manifest (add to home screen)
README.md       — this file
.gitignore
```
