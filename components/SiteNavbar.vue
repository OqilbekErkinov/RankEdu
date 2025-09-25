<template>
  <nav
    class="navbar navbar-expand-lg sticky-top nav-shadow navbar-light app-navbar"
  >
    <div class="container py-2">
      <NuxtLink
        class="navbar-brand nav-logo d-flex align-items-center gap-2"
        to="/"
      >
        <img src="/images/logo.svg" alt="Nevroslim" height="45" />
      </NuxtLink>

      <span class="badge-sale d-none d-md-inline">-50%</span>

      <button
        class="btn nav-toggle p-0 ms-auto d-lg-none"
        :aria-expanded="isOpen ? 'true' : 'false'"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation"
        @click="toggle"
      >
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

    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="isOpen"
          class="nav-backdrop"
          role="presentation"
          @click="close"
        />
      </transition>

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

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && isOpen.value) close();
}

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
  document.body.style.overflow = "";
});

watch(
  () => route.fullPath,
  () => close()
);
</script>