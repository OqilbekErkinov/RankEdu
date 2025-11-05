<template>
  <section class="leaderboard">
    <div class="d-flex align-items-center gap-2 mb-1">
      <i class="bi bi-trophy-fill text-warning"></i>
      <h3 class="mb-0">Global Leaderboard</h3>
    </div>
    <div class="text-muted mb-3">Compete with students worldwide</div>

    <!-- Tabs -->
    <div class="btn-group mb-4" role="tablist" aria-label="Leaderboard filters">
      <button
        v-for="p in periods"
        :key="p.key"
        class="btn btn-light me-2 tabs-btn"
        :class="{ active: activePeriod === p.key }"
        @click="activePeriod = p.key"
      >
        {{ p.label }}
      </button>
    </div>

    <!-- Top 3 -->
    <div class="row g-4 align-items-stretch mb-4">
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4 top-card">
          <div class="text-center">
            <div class="medal-icon text-secondary mb-2">
              <i class="bi bi-award"></i>
            </div>
            <div class="ava-circle grad mb-3">{{ top3[1]?.initials }}</div>
            <div class="fw-semibold">{{ top3[1]?.name }}</div>
            <div class="small text-muted">{{ top3[1]?.university }}</div>
            <div class="fw-semibold text-warning mt-2">
              <i class="bi bi-lightning-charge-fill me-1"></i
              >{{ xp(top3[1]?.xp) }} XP
            </div>
            <span class="pill mt-2">Level {{ top3[1]?.level }}</span>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4 top-card winner">
          <div class="text-center">
            <div class="crown mb-2">👑</div>
            <div class="ava-circle gold mb-3">{{ top3[0]?.initials }}</div>
            <div class="fw-semibold">{{ top3[0]?.name }}</div>
            <div class="small text-muted">{{ top3[0]?.university }}</div>
            <div class="fw-semibold text-warning mt-2">
              <i class="bi bi-lightning-charge-fill me-1"></i
              >{{ xp(top3[0]?.xp) }} XP
            </div>
            <span class="pill mt-2">Level {{ top3[0]?.level }}</span>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4 top-card">
          <div class="text-center">
            <div class="medal-icon text-secondary mb-2">
              <i class="bi bi-award"></i>
            </div>
            <div class="ava-circle grad mb-3">{{ top3[2]?.initials }}</div>
            <div class="fw-semibold">{{ top3[2]?.name }}</div>
            <div class="small text-muted">{{ top3[2]?.university }}</div>
            <div class="fw-semibold text-warning mt-2">
              <i class="bi bi-lightning-charge-fill me-1"></i
              >{{ xp(top3[2]?.xp) }} XP
            </div>
            <span class="pill mt-2">Level {{ top3[2]?.level }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Rest of leaderboard -->
    <div class="card border-0 shadow-sm">
      <ul class="list-group list-group-flush">
        <li
          v-for="(u, idx) in rest"
          :key="u.id"
          class="list-group-item py-3 py-lg-3 d-flex align-items-center justify-content-between row-gap-2"
        >
          <div class="d-flex align-items-center gap-3">
            <div class="rank-num">#{{ idx + 4 }}</div>
            <div class="ava small">{{ u.initials }}</div>
            <div>
              <div class="fw-semibold">{{ u.name }}</div>
              <div class="small text-muted">{{ u.university }}</div>
            </div>
          </div>

          <div class="d-flex align-items-center gap-3">
            <span class="pill">Level {{ u.level }}</span>
            <div class="fw-semibold text-warning">
              <i class="bi bi-lightning-charge-fill me-1"></i>{{ xp(u.xp) }} XP
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
definePageMeta({ layout: "default" });

import { computed, ref } from "vue";

const periods = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "all", label: "All Time" },
];
const activePeriod = ref("weekly");

// Demo ma’lumotlar
const data = {
  daily: [
    { id: 1, name: "Erkinov Oqilbek", university: "TIFT", level: 1, xp: 9950 },
    { id: 2, name: "Michael Ross", university: "MIT", level: 14, xp: 11800 },
    { id: 3, name: "Emma Wilson", university: "Harvard", level: 14, xp: 11200 },
    { id: 4, name: "David Kim", university: "Berkeley", level: 13, xp: 10500 },
    { id: 5, name: "Olivia Brown", university: "Caltech", level: 13, xp: 9900 },
    { id: 6, name: "Liam Smith", university: "CMU", level: 12, xp: 9600 },
  ],
  weekly: [
    { id: 1, name: "Sarah Chen", university: "Stanford", level: 15, xp: 12500 },
    { id: 2, name: "Michael Ross", university: "MIT", level: 14, xp: 11800 },
    { id: 3, name: "Emma Wilson", university: "Harvard", level: 14, xp: 11200 },
    { id: 4, name: "David Kim", university: "Berkeley", level: 13, xp: 10500 },
    { id: 5, name: "Amelia Clark", university: "Oxford", level: 13, xp: 10100 },
    { id: 6, name: "Noah Davis", university: "Cambridge", level: 12, xp: 9800 },
    { id: 7, name: "Ella Martinez", university: "UCLA", level: 12, xp: 9500 },
  ],
  monthly: [
    { id: 1, name: "Michael Ross", university: "MIT", level: 16, xp: 42000 },
    { id: 2, name: "Sarah Chen", university: "Stanford", level: 16, xp: 41500 },
    { id: 3, name: "Emma Wilson", university: "Harvard", level: 15, xp: 39900 },
    { id: 4, name: "David Kim", university: "Berkeley", level: 15, xp: 39000 },
  ],
  all: [
    {
      id: 1,
      name: "Sarah Chen",
      university: "Stanford",
      level: 28,
      xp: 220000,
    },
    { id: 2, name: "Michael Ross", university: "MIT", level: 27, xp: 210500 },
    {
      id: 3,
      name: "Emma Wilson",
      university: "Harvard",
      level: 25,
      xp: 199400,
    },
    { id: 4, name: "David Kim", university: "Berkeley", level: 24, xp: 180200 },
  ],
};

// Ismlar bosh harflari
const withInitials = (arr) =>
  arr.map((u) => ({
    ...u,
    initials: u.name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase(),
  }));

const current = computed(() => withInitials(data[activePeriod.value]));
const top3 = computed(() => current.value.slice(0, 3));
const rest = computed(() => current.value.slice(3));

const xp = (n) => n?.toLocaleString();
</script>

<style scoped>
.leaderboard {
}

/* Tabs */
.tabs-btn {
  border: 1px solid var(--line);
  padding: 0.5rem 1rem;
  border-radius: 10px;
}
.tabs-btn.active {
  background: #e9f2ff;
  color: var(--primary);
  border-color: #cfe3ff;
}

/* TOP 3 */
.top-card {
  border-radius: 20px;
}
.top-card .pill {
  background: #fff7cc;
  color: #8a6d00;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 700;
}
.ava-circle {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 800;
  color: #0b1220;
  justify-content: center;
  margin: auto;
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
.winner {
  background: linear-gradient(180deg, #39a3ff 0%, #2288f6 100%);
  color: #fff;
  border-radius: 20px;
}
.winner .pill {
  background: #ffe28b;
  color: #7a5900;
}
.winner .text-muted {
  color: #e8f1ff !important;
}

/* List items */
.rank-num {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  color: #3b4453;
}
.ava.small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 800;
  background: #eef3fb;
  color: #0b1220;
}

/* Utility */
.pill {
  display: inline-block;
}
</style>
