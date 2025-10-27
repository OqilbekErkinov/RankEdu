<template>
  <nav class="navbar navbar-expand bg-white shadow-sm sticky-top">
    <div class="container-fluid px-3">
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

        <!-- Profil avatar (oddiy, keyin dropdown qo‘shamiz) -->
        <img
          src="/images/avatar.jpg"
          alt="Profil"
          class="avatar"
        />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();
const routeName = computed(() => {
  // breadcrumbdagi ikkinchi bo‘lak: birinchi segmentni ko‘rsatamiz
  const seg = route.path.split("/").filter(Boolean)[0] || "Asosiy sahifa";
  if (seg === "") return "Asosiy sahifa";
  if (seg === "profile") return "Profil";
  return "Asosiy sahifa";
});
</script>
