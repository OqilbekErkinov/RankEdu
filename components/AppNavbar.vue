<template>
  <nav class="navbar navbar-expand bg-white shadow-sm sticky-top">
    <div class="container-fluid px-3">
      <!-- Chap: burger + breadcrumb -->
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

      <!-- O'ng: ikonlar + avatar -->
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

        <!-- Avatar + Dropdown -->
        <div class="position-relative" ref="profileWrap">
          <button
            class="btn p-0 border-0 bg-transparent"
            aria-haspopup="true"
            :aria-expanded="open"
            @click="toggle"
            ref="profileBtn"
          >
            <img src="/images/avatar2.jpg" alt="Profil" class="avatar" />
          </button>

          <transition name="fade-scale">
            <div
              v-if="open"
              class="profile-card shadow-lg"
              role="menu"
              aria-label="Profil menyusi"
              ref="profileMenu"
            >
              <!-- Close button -->
              <button
                class="btn btn-light profile-close"
                aria-label="Yopish"
                @click="open = false"
              >
                <i class="bi bi-x-lg"></i>
              </button>

              <!-- Header -->
              <div class="text-center pt-4 pb-2">
                <div class="fw-bold mb-2 phone">+998 90 162 55 35</div>
                <img
                  src="/images/avatar2.jpg"
                  alt="Avatar"
                  class="avatar xl mb-3"
                />
                <div class="fw-semibold fs-4">Alijonova Rayxona Akmaljon qizi</div>
                <div class="text-muted">rayxonaalijonova@gmail.com</div>
              </div>

              <!-- List -->
              <div class="px-3 pb-3">
                <div class="list rounded-4 overflow-hidden">
                  <button class="list-item">
                    <span class="d-flex align-items-center gap-2">
                      <i class="bi bi-gear"></i><span>Sozlamalar</span>
                    </span>
                    <i class="bi bi-caret-down-fill text-muted small"></i>
                  </button>

                  <button class="list-item">
                    <span class="d-flex align-items-center gap-2">
                      <i class="bi bi-palette2"></i><span>Mavzu</span>
                    </span>
                  </button>

                  <button class="list-item">
                    <span class="d-flex align-items-center gap-2">
                      <i class="bi bi-translate"></i><span>Til</span>
                    </span>
                  </button>
                </div>

                <div class="mt-3">
                  <button
                    class="btn btn-light w-100 py-3 rounded-4 d-flex align-items-center gap-2 justify-content-start"
                  >
                    <i class="bi bi-box-arrow-right fs-5"></i>
                    <span class="fw-semibold">Chiqish</span>
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";

const route = useRoute();
const routeName = computed(() => {
  const seg = route.path.split("/").filter(Boolean)[0] || "Asosiy sahifa";
  if (seg === "profile") return "Profil";
  if (seg === "") return "Asosiy sahifa";
  return "Asosiy sahifa";
});

/* Dropdown holati va tashqi-bosish yopilishi */
const open = ref(false);
const profileMenu = ref<HTMLElement | null>(null);
const profileBtn = ref<HTMLElement | null>(null);
const profileWrap = ref<HTMLElement | null>(null);

function toggle() {
  open.value = !open.value;
}

function onDocClick(e: MouseEvent) {
  if (!open.value) return;
  const wrap = profileWrap.value;
  if (wrap && !wrap.contains(e.target as Node)) open.value = false;
}

onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));
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

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9eef7;
}
.avatar.xl {
  width: 76px;
  height: 76px;
  border-width: 3px;
}

/* Dropdown card */
.profile-card {
  position: absolute;
  right: 0;
  margin-top: 12px;
  width: 420px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 24px;
  overflow: hidden;
  z-index: 1050;
}
.phone {
  letter-spacing: 0.2px;
}

.list {
  background: #f7f8fb;
  border: 1px solid var(--line);
}
.list-item {
  width: 100%;
  background: #fff;
  border: 0;
  padding: 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
  text-align: left;
}
.list-item:first-child {
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}
.list-item:last-child {
  border-bottom: 0;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
}
.list-item:hover {
  background: #f4f7ff;
}

.profile-close {
  position: absolute;
  top: 12px;
  right: 12px;
  border-radius: 50%;
}

/* Animatsiya */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.18s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

/* Responsiv */
@media (max-width: 520px) {
  .profile-card {
    width: 90vw;
  }
}
</style>