# Aurelius Music Hub

Your personal artist hub — music player, fan wall, countdown, admin panel, powered by Supabase.

---

## 🚀 Deploy to Vercel (Free — 10 minutes)

### Step 1 — Upload to GitHub
1. Go to github.com and sign in (or create a free account)
2. Click the **+** icon → **New repository**
3. Name it: `aurelius-music-hub`
4. Set it to **Public**
5. Click **Create repository**
6. Click **uploading an existing file**
7. Drag and drop ALL files from this folder (including the `src` folder)
8. Click **Commit changes**

### Step 2 — Deploy on Vercel
1. Go to vercel.com and sign in with GitHub
2. Click **Add New Project**
3. Select your `aurelius-music-hub` repository
4. Framework will be auto-detected as **Vite**
5. Click **Deploy**
6. Wait ~60 seconds ⏳
7. Your site is live at `aurelius-music-hub.vercel.app` 🎉

### Step 3 — (Optional) Add your own domain
1. Buy `aureliusmusic.com` on Namecheap (~$12/yr)
2. In Vercel → your project → **Settings** → **Domains**
3. Add your domain and follow the DNS instructions

---

## 🔐 Admin Access
- Passcode: `aurelius1`
- Change your artist name, links, tracks, drops and release date from the Admin tab
- All changes save to Supabase instantly

---

## 🎵 Adding Real Audio
Paste a direct MP3 URL in Admin → Music → Edit Track → Audio URL
- **Google Drive**: share file → copy link → change `/view` to `/uc?export=download`
- **Dropbox**: change `dl=0` to `dl=1` at end of URL (may have CORS issues)
- **SoundCloud**: use their embed player for best results

---

Built with React + Vite + Supabase ☁️
