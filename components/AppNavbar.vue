<template>
  <nav class="navbar navbar-expand bg-white shadow-sm sticky-top">
    <div class="container-fluid px-3">
      <!-- Left: burger + breadcrumb -->
      <div class="d-flex align-items-center gap-2">
        <button
          class="btn btn-outline-secondary d-flex align-items-center justify-content-center"
          type="button"
          aria-label="Sidebar"
          @click="$emit('toggle-sidebar')"
        >
          <i class="bi bi-list fs-5"></i>
        </button>

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <NuxtLink to="/" class="text-decoration-none fw-semibold brand"
                >RankEdu</NuxtLink
              >
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ routeName }}
            </li>
          </ol>
        </nav>
      </div>

      <!-- Right: icons + profile -->
      <div class="d-flex align-items-center gap-2">
        <button class="icon-btn" aria-label="Qidiruv">
          <i class="bi bi-search"></i>
        </button>
        <button class="icon-btn" aria-label="Bildirishnomalar">
          <i class="bi bi-bell"></i>
        </button>
        <button class="icon-btn" aria-label="Xabarlar">
          <i class="bi bi-chat-dots"></i>
        </button>

        <!-- NavProfile component -->
        <NavProfile />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavProfile from "./NavProfile.vue"; // yo'lni loyihangizga qarab o'zgartiring

const route = useRoute();
const routeName = computed(() => {
  const seg = route.path.split("/").filter(Boolean)[0] || "";
  if (seg === "profile") return "Profil";
  if (!seg) return "Asosiy sahifa";
  // boshqa sahifalar uchun nomlash to'g'riroq qilish mumkin
  return seg.charAt(0).toUpperCase() + seg.slice(1);
});
</script>

<style scoped>
.brand {
  color: var(--primary);
}

.icon-btn {
  border: 1px solid var(--line);
  background: #fff;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.icon-btn:hover {
  background: var(--bg);
}

/* avatar used in NavProfile; keep consistent */
</style>
