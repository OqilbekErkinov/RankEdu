<template>
  <nav
    class="navbar navbar-expand-lg sticky-top nav-shadow navbar-light app-navbar"
  >
    <div class="container py-2">
      <!-- Logo + Sale badge -->
      <NuxtLink
        class="navbar-brand nav-logo d-flex align-items-center gap-2"
        to="/"
      >
        <img src="/images/logo.svg" alt="Nevroslim" height="45" />
      </NuxtLink>

      <span class="badge-sale d-none d-md-inline">-50%</span>

      <!-- Toggler (custom) -->
      <button
        class="btn nav-toggle p-0 ms-auto d-lg-none"
        :aria-expanded="isOpen ? 'true' : 'false'"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation"
        @click="toggle"
      >
        <!-- hamburger -->
        <svg
          v-if="!isOpen"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
        >
          <path
            d="M4 6H20M4 12H20M4 18H20"
            stroke="#003262"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <!-- X (close) -->
        <svg
          v-else
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
        >
          <path
            d="M6 6L18 18M18 6L6 18"
            stroke="#003262"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <!-- Desktop nav -->
      <div class="collapse navbar-collapse d-none d-lg-flex">
        <ul class="navbar-nav m-auto mb-0">
          <li class="nav-item">
            <a class="nav-link" href="#about">Неврослим ҳақида</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#diseases">Касалликлар</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#experts">Мутаҳассис</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#results">Натижалар</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#benefits">Фойдалари</a>
          </li>
        </ul>

        <a href="#contact" class="text-decoration-none">
          <button class="btn btn-brand d-flex align-items-center gap-2">
            Буйртма бериш
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13.085H7.5C8.5 13.085 9.5 14.585 10.5 14.585C11.364 14.585 12.976 13.838 13.72 15.249C13.955 15.696 13.641 16.205 13.175 16.399C12.096 16.846 10.894 17.454 10.5 17.585L7.5 16.585M14 15.585L18.576 13.755C18.854 13.644 19.156 13.607 19.452 13.65C20.499 13.799 20.795 15.17 19.903 15.738L12.259 20.602C11.776 20.909 11.185 20.995 10.635 20.838L1 18.085M10.5 11.085C8.575 10.407 5 7.494 5 4.29C5 2.52 6.354 1.085 8.025 1.085C9.048 1.085 9.953 1.623 10.5 2.447C11.047 1.623 11.952 1.085 12.975 1.085C14.646 1.085 16 2.52 16 4.29C16 7.494 12.425 10.407 10.5 11.085Z"
                stroke="#FDFEFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </a>
      </div>
    </div>

    <!-- ======== Mobile overlay + sheet menu ======== -->
    <Teleport to="body">
      <!-- Backdrop -->
      <transition name="fade">
        <div
          v-if="isOpen"
          class="nav-backdrop"
          role="presentation"
          @click="close"
        />
      </transition>

      <!-- Sheet -->
      <transition name="slide-down">
        <div
          v-if="isOpen"
          id="mobile-menu"
          class="mobile-sheet"
          role="dialog"
          aria-modal="true"
        >
          <ul class="list-unstyled mb-3">
            <li>
              <a href="#about" class="sheet-link" @click="close"
                >Неврослим ҳақида</a
              >
            </li>
            <li>
              <a href="#diseases" class="sheet-link" @click="close"
                >Касалликлар</a
              >
            </li>
            <li>
              <a href="#experts" class="sheet-link" @click="close"
                >Мутаҳассис</a
              >
            </li>
            <li>
              <a href="#results" class="sheet-link" @click="close">Натижалар</a>
            </li>
            <li>
              <a href="#benefits" class="sheet-link" @click="close"
                >Фойдалари</a
              >
            </li>
          </ul>

          <a href="#contact" class="text-decoration-none w-100" @click="close">
            <button
              class="btn btn-brand w-100 d-flex align-items-center justify-content-center gap-2"
            >
              Буйртма бериш
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 13.085H7.5C8.5 13.085 9.5 14.585 10.5 14.585C11.364 14.585 12.976 13.838 13.72 15.249C13.955 15.696 13.641 16.205 13.175 16.399C12.096 16.846 10.894 17.454 10.5 17.585L7.5 16.585M14 15.585L18.576 13.755C18.854 13.644 19.156 13.607 19.452 13.65C20.499 13.799 20.795 15.17 19.903 15.738L12.259 20.602C11.776 20.909 11.185 20.995 10.635 20.838L1 18.085M10.5 11.085C8.575 10.407 5 7.494 5 4.29C5 2.52 6.354 1.085 8.025 1.085C9.048 1.085 9.953 1.623 10.5 2.447C11.047 1.623 11.952 1.085 12.975 1.085C14.646 1.085 16 2.52 16 4.29C16 7.494 12.425 10.407 10.5 11.085Z"
                  stroke="#FDFEFF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </a>
        </div>
      </transition>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "#imports";

const isOpen = ref(false);
const route = useRoute();

function open() {
  isOpen.value = true;
  document.body.style.overflow = "hidden";
}
function close() {
  isOpen.value = false;
  document.body.style.overflow = "";
}
function toggle() {
  isOpen.value ? close() : open();
}

// ESC bilan yopish
function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && isOpen.value) close();
}

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
  document.body.style.overflow = "";
});

// Route o‘zgarsa (anchor yoki sahifa) menyuni yopamiz
watch(
  () => route.fullPath,
  () => close()
);
</script>

<style scoped>
.app-navbar {
  /* padding-top: 2rem; */
}

.navbar-brand img {
  display: block;
}

.badge-sale {
  background: #0b5fff;
  color: #fff;
  border-radius: 999px;
  font-weight: 600;
  padding: 0.35rem 0.65rem;
  margin-left: 0.5rem;
}

.nav-link {
  color: #003262;
  font-weight: 500;
  padding: 0.5rem 0.9rem !important;
}
.nav-link:hover {
  color: #00578d;
}

/* Brand button */
.btn-brand {
  background: #003262;
  color: #FDFEFF;
  border-radius: 12px;
  padding: 0.6rem 1.2rem;
  border: 1px solid #003262;
  box-shadow: 0 6px 16px rgba(11, 95, 255, 0.25);
}
.btn-brand:hover {
  filter: brightness(1.03);
}

@media (max-width: 600px) {
  .btn-brand {
  padding: 0.6rem 0rem;
  }
}

/* Toggler */
.nav-toggle .icon {
  display: block;
}
.nav-toggle {
  background: transparent;
}

/* ===== Backdrop + Sheet (mobile) ===== */
.nav-backdrop {
  position: fixed;
  top: 78px;
  margin-top: 5rem;
  inset: 0;
  background: rgba(2, 20, 46, 0.45);
  backdrop-filter: blur(1px);
  z-index: 1040;
}

/* menyu kartochkasi */
.mobile-sheet {
  position: fixed;
  z-index: 1050;
  left: 68%;
  top: 78px; /* navbar pastida */
  transform: translateX(-50%);
  width: calc(100% - 32px);
  max-width: 250px;
  background: #F4F7FF;
  /* border-radius: 22px; */
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  padding: 18px;
  color: #003262;
}

.sheet-link {
  display: block;
  padding: 12px 10px;
  color: #003262;
  font-weight: 500;
  border-radius: 10px;
  text-decoration: none;
}
.sheet-link:hover {
  background: #eef4ff;
  color: #0000FF;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.22s cubic-bezier(0.22, 0.9, 0.24, 1),
    opacity 0.22s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translate(-50%, -8px);
  opacity: 0;
}

/* Desktop tweaks */
@media (min-width: 992px) {
  .nav-toggle {
    display: none;
  }
}
</style>
