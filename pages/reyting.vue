<template>
  <section class="leaderboard-page container-fluid py-4">
    <!-- Header / Hero -->
    <div class="hero-card position-relative mb-4">
      <div class="hero-inner">
        <h1 class="hero-title">Top reytinglar</h1>
        <p class="hero-sub">
          Saytdagi ro'yxatdan o'tgan foydalanuvchilar orasida bellashuv
        </p>

        <div class="top-strip d-flex align-items-end gap-4">
          <div
            v-for="(t, i) in visuallyTop3"
            :key="i"
            class="top-avatar-wrap text-center"
          >
            <div class="ava-outer" :class="t.class">
              <img :src="t.avatar || defaultAvatar" alt="ava" class="ava-img" />
              <div v-if="t.badge" class="ava-badge">{{ t.badge }}</div>
            </div>
            <div class="ava-name">{{ t.nameShort }}</div>
            <div class="ava-meta">
              <span class="xp-pill">
                <i class="bi bi-lightning-charge-fill"></i>
                {{ formatNumber(t.xp) }}
              </span>
              <span class="level-pill">Level {{ t.level }}</span>
            </div>
          </div>

          <div class="hero-trophy d-none d-md-block" style="position: relative">
            <img
              src="/images/trophy.png"
              alt="trophy"
              style="position: absolute; right: -25rem; top: -20rem;"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Rest list -->
    <div class="card border-0 shadow-sm">
      <ul class="list-group list-group-flush">
        <li
          v-for="(u, idx) in rest"
          :key="u.user_id"
          class="list-group-item d-flex align-items-center justify-content-between"
        >
          <div class="d-flex align-items-center gap-3">
            <div class="rank-num">#{{ idx + 4 }}</div>
            <div class="ava small">{{ u.initials }}</div>
            <div>
              <div class="fw-semibold">{{ u.displayName }}</div>
              <div class="small text-muted">{{ u.university }}</div>
            </div>
          </div>

          <div class="d-flex align-items-center gap-3">
            <span class="pill">Level {{ u.level }}</span>
            <div class="fw-semibold text-warning">
              <i class="bi bi-lightning-charge-fill me-1"></i>
              {{ formatNumber(u.xp) }} XP
            </div>
          </div>
        </li>

        <li v-if="loading" class="list-group-item">
          <div class="text-muted">Yuklanyapti...</div>
        </li>
        <li v-if="!loading && profiles.length === 0" class="list-group-item">
          <div class="text-muted">Hozircha foydalanuvchilar topilmadi.</div>
        </li>
        <li v-if="errorMsg" class="list-group-item">
          <div class="text-danger">Xato: {{ errorMsg }}</div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useNuxtApp, useRuntimeConfig } from "#app";

/* CONFIG */
const defaultAvatar = "/images/default-avatar.png";
const XP_PER_LEVEL = 100;
const RETRY_COUNT = 3;

/* runtime config (nuxt public env) */
const config = useRuntimeConfig();
const publicConfig = config.public || {};
const SUPABASE_URL =
  publicConfig.supabaseUrl || publicConfig.SUPABASE_URL || "";
const SUPABASE_ANON_KEY =
  publicConfig.supabaseKey ||
  publicConfig.SUPABASE_KEY ||
  publicConfig.supabaseKey ||
  "";

/* supabase client from plugin (if available) */
const { $supabase } = useNuxtApp();

/* UI state */
const profiles = ref([]);
const loading = ref(false);
const error = ref(null);
const errorMsg = ref("");

const periods = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "all", label: "All Time" },
];
const activePeriod = ref("weekly");

/* helpers */
function formatNumber(n) {
  if (n === null || n === undefined) return "0";
  return Number(n).toLocaleString();
}
function computeLevel(xp) {
  const v = Number(xp) || 0;
  return Math.floor(v / XP_PER_LEVEL);
}

/* fallback low-level REST call (when $supabase fails due to network/CORS) */
async function fetchProfilesViaRest(retries = RETRY_COUNT) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase URL yoki anon key runtime config-da topilmadi.");
  }

  // build URL (no trailing slash)
  const base = SUPABASE_URL.replace(/\/+$/, "");
  // select required fields; ensure to match your actual column names
  const url = `${base}/rest/v1/profiles?select=user_id,fullname,university_short,university_full,xp,avatar_url&order=xp.desc`;

  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    Accept: "application/json",
  };

  for (let i = 0; i < retries; i++) {
    try {
      const resp = await fetch(url, {
        method: "GET",
        headers,
        mode: "cors",
        cache: "no-store",
      });

      if (!resp.ok) {
        const txt = await resp.text().catch(() => "");
        throw new Error(
          `REST fetch failed: ${resp.status} ${resp.statusText} ${txt}`
        );
      }

      const data = await resp.json();
      if (!Array.isArray(data)) throw new Error("REST response not array");
      return data;
    } catch (e) {
      // last iteration throws
      if (i === retries - 1) throw e;
      // small backoff
      await new Promise((r) => setTimeout(r, 300 * (i + 1)));
    }
  }
}

/* Main loader: tries $supabase client first, if network/failed_to_fetch then fallback to REST */
async function loadProfiles() {
  loading.value = true;
  error.value = null;
  errorMsg.value = "";

  try {
    // first try: if $supabase available use it
    if ($supabase && typeof $supabase.from === "function") {
      try {
        const { data, error: supErr } = await $supabase
          .from("profiles")
          .select(
            "user_id,fullname,university_short,university_full,xp,avatar_url"
          )
          .order("xp", { ascending: false });

        if (supErr) {
          // If error appears like network failed, try fallback
          console.warn("Supabase select returned error", supErr);
          // if error is network-related (TypeError: Failed to fetch) try fallback
          if (
            supErr.message &&
            supErr.message.toLowerCase().includes("failed to fetch")
          ) {
            throw supErr; // to go to REST fallback
          } else {
            // other supabase error — show to user
            error.value = supErr;
            errorMsg.value = supErr.message || String(supErr);
            profiles.value = [];
            return;
          }
        }

        if (Array.isArray(data)) {
          transformAndSetProfiles(data);
          return;
        }
      } catch (e) {
        // log and fallthrough to REST fallback
        console.warn(
          "Supabase client fetch failed, will try REST fallback:",
          e
        );
      }
    }

    // fallback via direct REST fetch with anon key
    const restData = await fetchProfilesViaRest(RETRY_COUNT);
    transformAndSetProfiles(restData);
  } catch (e) {
    console.error("loadProfiles exception", e);
    error.value = e;
    errorMsg.value = e.message || String(e);
    profiles.value = [];
  } finally {
    loading.value = false;
  }
}

function transformAndSetProfiles(dataArray) {
  // map/normalize rows
  const mapped = dataArray.map((p) => {
    const fullname = p.fullname || p.full_name || "Foydalanuvchi";
    const uni = p.university_full || p.university_short || p.university || "";
    const xp = Number(p.xp || p.total_xp || 0);
    const avatar = p.avatar_url || p.avatar || null;
    const initials = (fullname || "")
      .split(" ")
      .map((w) => (w && w[0]) || "")
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return {
      user_id: p.user_id,
      displayName: fullname,
      university: uni,
      xp,
      level: computeLevel(xp),
      avatar,
      initials,
    };
  });

  // ensure sort by xp descending
  mapped.sort((a, b) => b.xp - a.xp);
  profiles.value = mapped;
}

/* computed lists */
const top3 = computed(() => profiles.value.slice(0, 3));
const rest = computed(() => profiles.value.slice(3));
const visuallyTop3 = computed(() =>
  profiles.value.slice(0, 3).map((p, idx) => ({
    nameShort: p.displayName.split(" ").slice(0, 2).join(" "),
    name: p.displayName,
    avatar: p.avatar,
    xp: p.xp,
    level: p.level,
    initials: p.initials,
    class: idx === 0 ? "first" : idx === 1 ? "second" : "third",
    badge: idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉",
  }))
);

/* interactions */
function setPeriod(k) {
  activePeriod.value = k;
  // If you have server-side period filtering, pass period to loadProfiles
}
function scrollToList() {
  const el = document.querySelector(".card");
  if (el) {
    window.scrollTo({ top: el.offsetTop - 10, behavior: "smooth" });
  }
}

/* lifecycle */
onMounted(async () => {
  // quick config validation
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn(
      "Supabase public env not found. Make sure runtime config public.supabaseUrl and public.supabaseKey are set."
    );
  }
  await loadProfiles();
});
</script>

<style scoped>
/* (CSS same as old file) */
.leaderboard-page {
  /* max-width: 1200px; */
  margin: 0 auto;
}

/* Hero card (katta gradient banner bilan top avatars) */
.hero-card {
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(90deg, #ff9a1f 0%, #ffd24d 50%, #ffefb8 100%);
  color: #fff;
  padding: 28px;
  height: 500px;
}
.hero-inner {
  max-width: 1100px;
  margin: 0 auto;
}
.hero-title {
  font-size: 46px;
  margin: 0 0 6px 3.4rem;
  font-weight: 800;
}
.hero-sub {
  margin: 0 0 18px 0;
  opacity: 0.95;
}

/* top-strip: avatars row */
.top-strip {
  display: flex;
  align-items: flex-end;
  gap: 28px;
  margin-top: 24px;
  flex-wrap: wrap;
}
.top-avatar-wrap {
  text-align: center;
  min-width: 180px;
}
.ava-outer {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  display: grid;
  place-items: center;
  background: #ffffff33;
  border: 6px solid rgba(255, 255, 255, 0.65);
}
.ava-outer.first {
  transform: translateY(10px);
}
.ava-outer.second {
  /* width: 140px;
  height: 140px;
  border: 8px solid #fff; */
  transform: translateY(18px);
  /* box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  background: radial-gradient(circle at 30% 20%, #ffe08a, #ffb400); */
}
.ava-outer.second img {
  height: 73%;
  margin-top: -2.65rem;
}
.ava-outer.third {
  transform: translateY(18px);
}
.ava-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.ava-badge {
  position: absolute;
  right: -6px;
  top: -6px;
  background: #fff;
  color: #333;
  border-radius: 999px;
  padding: 6px 8px;
  font-size: 14px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}
.ava-name {
  margin-top: 10px;
  font-weight: 700;
  color: #fff;
}
.ava-meta {
  margin-top: 6px;
  display: flex;
  gap: 8px;
  justify-content: center;
}
.xp-pill {
  background: rgba(255, 255, 255, 0.95);
  color: #b46a00;
  padding: 6px 10px;
  border-radius: 18px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.level-pill {
  background: rgba(255, 255, 255, 0.95);
  color: #6a4a00;
  padding: 6px 10px;
  border-radius: 18px;
  font-weight: 700;
}

/* Top cards */
.top-card {
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.winner-card {
  background: linear-gradient(180deg, #39a3ff 0, #2288f6 100%);
  color: #fff;
}
.ava-circle {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 auto;
  overflow: hidden;
}
.ava-circle-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ava-circle.grad {
  background: radial-gradient(
    120% 120% at 80% 20%,
    #c9e6ff 0%,
    #7fb6ff 60%,
    #2d76ff 100%
  );
}
.ava-circle.gold {
  background: radial-gradient(
    120% 120% at 80% 20%,
    #ffe08a 0%,
    #ffd24d 60%,
    #ffb400 100%
  );
}

/* rest list */
.rank-num {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(60, 65, 80, 0.08);
  color: #3b4453;
  font-weight: 700;
}
.ava.small {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  background: #fff;
  color: #0b1220;
  border: 1px solid rgba(60, 65, 80, 0.06);
}

/* pills */
.pill {
  background: #fff7cc;
  color: #8a6d00;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 700;
}

/* Tabs */
.tabs-btn {
  border: 1px solid rgba(16, 24, 40, 0.06);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background: #fff;
}
.tabs-btn.active {
  background: #e9f2ff;
  color: #0d6efd;
  border-color: #cfe3ff;
}

/* responsive */
@media (max-width: 991px) {
  .top-strip {
    gap: 18px;
  }
  .hero-trophy {
    display: none !important;
  }
  .ava-outer {
    width: 92px;
    height: 92px;
  }
  .ava-outer.second {
    width: 106px;
    height: 106px;
  }
}
</style>
