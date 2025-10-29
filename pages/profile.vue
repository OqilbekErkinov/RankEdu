<template>
  <div class="profile-page">
    <!-- Header: Left mini card + Main summary -->
    <div class="row g-3 align-items-stretch">
      <!-- Left mini profile -->
      <div class="col-lg-3">
        <div class="card border-0 shadow-sm h-100 p-3">
          <div class="d-flex align-items-center gap-3">
            <div class="ava-circle sm">
              {{ initials }}
            </div>
            <div class="flex-grow-1">
              <div class="fw-semibold">{{ user.fullname }}</div>
              <div class="small text-muted">{{ user.universityShort }}</div>
            </div>
          </div>

          <div
            class="d-flex align-items-center justify-content-between mt-3 small text-muted"
          >
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-mortarboard"></i>
              <span>Level {{ user.level }}</span>
            </div>
            <div
              class="d-flex align-items-center gap-2 text-warning fw-semibold"
            >
              <i class="bi bi-star-fill"></i>
              <span>{{ user.xp.toLocaleString() }} XP</span>
            </div>
          </div>

          <div class="mt-3">
            <div class="progress prog-thin">
              <div
                class="progress-bar bg-warning"
                :style="{ width: levelPercent + '%' }"
              ></div>
            </div>
            <div class="d-flex justify-content-between small text-muted mt-1">
              <span
                >{{ remainToNext.toLocaleString() }} XP to Level
                {{ user.level + 1 }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Main summary card -->
      <div class="col-lg-9">
        <div class="card border-0 shadow-sm h-100 p-4 position-relative">
          <button
            class="btn btn-light border position-absolute top-3 end-3 rounded-3"
          >
            Edit Profile
          </button>

          <div class="d-flex align-items-center gap-4">
            <div class="ava-circle xl">
              {{ initials }}
            </div>
            <div class="flex-grow-1">
              <h3 class="mb-1">{{ user.fullname }}</h3>
              <div class="text-muted">
                {{ user.universityFull }} <span class="mx-1">•</span>
                {{ user.major }}
              </div>

              <div class="d-flex flex-wrap align-items-center gap-4 mt-3">
                <div>
                  <div class="text-primary fw-semibold fs-5">
                    Level {{ user.level }}
                  </div>
                  <div class="small text-muted">Senior Rank</div>
                </div>
                <div>
                  <div class="fw-semibold fs-5 text-warning">
                    {{ user.xp.toLocaleString() }} XP
                  </div>
                  <div class="small text-muted">Total Experience</div>
                </div>
                <div>
                  <div class="fw-semibold fs-5 text-warning">
                    #{{ user.globalRank }}
                  </div>
                  <div class="small text-muted">Global Rank</div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <div class="progress prog-fat">
              <div
                class="progress-bar bg-warning"
                :style="{ width: levelPercent + '%' }"
              ></div>
            </div>
            <div class="d-flex justify-content-end small text-muted mt-1">
              <span>{{ user.xp }} / {{ nextLevelXp }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Badges & Achievements -->
    <div class="card border-0 shadow-sm mt-4 p-3 p-lg-4">
      <div class="d-flex align-items-center gap-2 mb-3">
        <i class="bi bi-award fs-5 text-warning"></i>
        <h5 class="mb-0">Badges & Achievements ({{ badges.length }})</h5>
      </div>

      <div class="row g-3 g-lg-4">
        <div v-for="b in badges" :key="b.id" class="col-6 col-md-4 col-lg-2">
          <div class="badge-card h-100">
            <div class="badge-icon">{{ b.icon }}</div>
            <div class="fw-semibold text-center">{{ b.title }}</div>
            <div class="text-center">
              <span class="pill" :class="b.tier">{{ b.tier }}</span>
            </div>
            <div class="small text-muted text-center">{{ b.date }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Past/other sections uchun joy -->
    <div class="mt-4">
      <div class="card border-0 shadow-sm p-4">
        <div class="text-muted">Keyingi bo‘limlar bu yerda paydo bo‘ladi.</div>
      </div>
    </div>
  </div>
</template>

<script setup>

const user = {
  fullname: "Alijonova Rayxona Akmaljon qizi",
  universityShort: "FDTU",
  universityFull: "Farg`ona davlat texnika universiteti",
  major: "Iqtisodiyot",
  level: 12,
  xp: 7350,
  globalRank: 47,
};

// Level matematikasi (demo)
const nextLevelXp = 10000;
const levelPercent = Math.min(100, Math.round((user.xp / nextLevelXp) * 100));
const remainToNext = Math.max(0, nextLevelXp - user.xp);

// Initsiallar
const initials = user.fullname
  .split(" ")
  .map((w) => w[0])
  .slice(0, 2)
  .join("")
  .toUpperCase();

// Badges mock
const badges = [
  { id: 1, icon: "🌀", title: "Python Master", tier: "gold", date: "2024-10" },
  {
    id: 2,
    icon: "⚡",
    title: "Quick Learner",
    tier: "silver",
    date: "2024-10",
  },
  {
    id: 3,
    icon: "🏆",
    title: "Competition Winner",
    tier: "gold",
    date: "2024-09",
  },
  { id: 4, icon: "🤝", title: "Team Player", tier: "bronze", date: "2024-09" },
  {
    id: 5,
    icon: "🤖",
    title: "AI Enthusiast",
    tier: "silver",
    date: "2024-08",
  },
  { id: 6, icon: "🚀", title: "Early Adopter", tier: "gold", date: "2024-07" },
];

definePageMeta({ layout: "default" });
</script>

<style scoped>
.profile-page {
}

/* Avatar circles */
.ava-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 800;
  color: #0b1220;
  background: radial-gradient(
    120% 120% at 80% 20%,
    #bfe1ff 0%,
    #73b4ff 60%,
    #2d76ff 100%
  );
}
.ava-circle.sm {
  width: 52px;
  height: 52px;
  font-size: 18px;
}
.ava-circle.xl {
  width: 96px;
  height: 96px;
  font-size: 28px;
}

/* Progress bars */
.prog-fat {
  height: 12px;
  background: #eef1f6;
  border-radius: 999px;
}
.prog-thin {
  height: 8px;
  background: #eef1f6;
  border-radius: 999px;
}
.prog-fat .progress-bar,
.prog-thin .progress-bar {
  border-radius: 999px;
}

/* Badges */
.badge-card {
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #fff;
  padding: 18px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(16, 24, 40, 0.05);
}
.badge-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-size: 28px;
  background: #f5f7fb;
  margin-bottom: 6px;
}

/* Tier pills */
.pill {
  text-transform: capitalize;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  display: inline-block;
}
.pill.gold {
  background: #fff7cc;
  color: #8a6d00;
}
.pill.silver {
  background: #eef2f7;
  color: #4b5563;
}
.pill.bronze {
  background: #ffe7d2;
  color: #8b4513;
}

/* Helpers */
.top-3 {
  top: 12px;
}
.end-3 {
  right: 12px;
}

@media (max-width: 992px) {
  .ava-circle.xl {
    width: 84px;
    height: 84px;
    font-size: 26px;
  }
}

.profilavatar {
  width: 86px;
  height: 86px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9eef7;
}
.profilavatar2 {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
