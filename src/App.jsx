import { useState, useEffect, useRef } from "react";

// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://fflmqamgcptaejomtdup.supabase.co";
const SUPABASE_KEY = "sb_publishable_1ot3tW3Pmb7xJ_DkQVsBBA_WUqFrTdq";

const db = {
  async get(table, id) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
      const rows = await res.json();
      return rows?.[0]?.data ?? null;
    } catch { return null; }
  },
  async set(table, id, data) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates"
        },
        body: JSON.stringify({ id, data })
      });
    } catch {}
  },
  async getAll(table) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
      return await res.json();
    } catch { return []; }
  },
  async upsertRow(table, id, data) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates"
        },
        body: JSON.stringify({ id, data })
      });
    } catch {}
  },
  async deleteRow(table, id) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
        method: "DELETE",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
    } catch {}
  }
};

// ─── DEFAULTS ────────────────────────────────────────────────────────────────
const DEFAULT_LINKS = [
  { id: "l1", label: "🎧 Stream on Spotify", url: "https://open.spotify.com", active: true, color: "#1DB954" },
  { id: "l2", label: "🍎 Apple Music", url: "https://music.apple.com", active: true, color: "#FC3C44" },
  { id: "l3", label: "▶️ YouTube Channel", url: "https://youtube.com", active: true, color: "#FF0000" },
  { id: "l4", label: "♪ TikTok", url: "https://tiktok.com", active: true, color: "#69C9D0" },
  { id: "l5", label: "📸 Instagram", url: "https://instagram.com", active: true, color: "#E1306C" },
  { id: "l6", label: "📧 Booking / Contact", url: "mailto:booking@aureliusmusic.com", active: true, color: "#FFD700" },
];
const DEFAULT_DROPS = [
  { id: "d1", title: "No Excuses", type: "Single", coverEmoji: "🔥", description: "Hard-hitting debut single.", streamUrl: "", active: true, status: "upcoming" },
];
const DEFAULT_TRACKS = [
  { id: "t1", title: "Off The No Go", artist: "Aurelius Music", duration: 180, coverEmoji: "🔥", genre: "Hip-Hop", url: "https://youtu.be/Lq-Kb9kuJmo", active: true, plays: 0 },
];
const DEFAULT_SETTINGS = {
  artistName: "AURELIUS MUSIC",
  artistBio: "Hard-hitting bars over cinematic production. Hip-Hop / Rap. Independent.",
  releaseName: "NO EXCUSES",
  releaseDate: (() => { const d = new Date(); d.setDate(d.getDate() + 14); return d.toISOString().slice(0, 16); })(),
};

const DEFAULT_ADS = [
  { id: "ad1", title: "Advertise Here", subtitle: "Reach Aurelius Music fans worldwide", imageUrl: "", linkUrl: "", bgColor: "#111118", textColor: "#FFD700", active: true, cta: "GET IN TOUCH" },
];
const EMOJIS = ["🔥","💙","👑","🎤","🌙","💯","🙌","⚡","🎧","❤️"];
const COVER_EMOJIS = ["🔥","🎤","👑","💿","🌙","⚡","🎵","🏆","🖤","💎","🚀","🌊","😤","🎯","💥"];
const LINK_COLORS = ["#FFD700","#1DB954","#FC3C44","#FF0000","#69C9D0","#E1306C","#FF5500","#784FFF","#FF3CAC","#00C2FF"];
const DROP_TYPES = ["Single","EP","Album","Mixtape","Freestyle","Collab","Remix"];
const PASS = "aurelius1";

function pad(n) { return String(n).padStart(2,"0"); }
function fmtTime(s) { if(!s||isNaN(s)) return "0:00"; return `${Math.floor(s/60)}:${pad(Math.floor(s%60))}`; }
function timeAgo(ts) {
  const d = Date.now()-ts;
  if(d<60000) return "just now";
  if(d<3600000) return `${Math.floor(d/60000)}m ago`;
  if(d<86400000) return `${Math.floor(d/3600000)}h ago`;
  return `${Math.floor(d/86400000)}d ago`;
}
function uid() { return `id_${Date.now()}_${Math.random().toString(36).slice(2,7)}`; }
