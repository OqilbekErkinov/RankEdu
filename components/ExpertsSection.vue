<!-- components/ExpertsSection.vue -->
<template>
  <section id="experts" class="experts pb-5">
    <div class="container">
      <h2 class="title text-center mb-4">
        Мутаҳассислар "<span class="accent">Неврослим</span>" ҳақида фикрлари
      </h2>

      <!-- Slides (grid sahifa-sahifa ko'rsatiladi) -->
      <div class="row g-3 justify-content-center">
        <div
          v-for="id in pages[page] || []"
          :key="id"
          class="col-12 col-sm-6 col-lg-3"
        >
          <button class="card-phone w-100" @click="openVideo(id)">
            <div
              class="screen ratio ratio-9x16"
              :style="{
                backgroundImage: `url(https://img.youtube.com/vi/${id}/hqdefault.jpg)`,
              }"
            />
            <div class="play">▶</div>
          </button>
        </div>
      </div>

      <!-- Controls -->
      <div
        class="controls d-flex align-items-center justify-content-center gap-3 mt-3"
      >
        <button class="nav btn-round" :disabled="page === 0" @click="prev">
          ‹
        </button>

        <div class="dots">
          <span
            v-for="(p, i) in pages.length"
            :key="i"
            class="dot"
            :class="{ active: i === page }"
          />
        </div>

        <button
          class="nav btn-round"
          :disabled="page === pages.length - 1"
          @click="next"
        >
          ›
        </button>
      </div>
    </div>

    <!-- Video Modal (YouTube embed) -->
    <div
      class="modal fade"
      id="expertVideoModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0">
          <div class="ratio ratio-9x16 bg-black">
            <iframe
              v-if="currentId"
              :src="embedUrl"
              title="Expert video"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

// YouTube video IDs (namuna). O'zingizniki bilan almashtiring.
const videoIds = ref([
  "CSI9y-ZfFMk",
  "Yw0oGB6X9eo",
  "msk1Tsm8kiE",
  "xNW-_UZdSRw",
]);

// Breakpointga qarab sahifadagi kartalar soni
const perView = ref(4);
const setPerView = () => {
  const w = window.innerWidth;
  perView.value = w >= 992 ? 4 : w >= 768 ? 2 : 1;
};
onMounted(() => {
  setPerView();
  window.addEventListener("resize", setPerView);
});
onBeforeUnmount(() => window.removeEventListener("resize", setPerView));

// Videolarni sahifalarga bo'lib chiqamiz
const pages = computed(() => {
  const size = perView.value;
  const out: string[][] = [];
  for (let i = 0; i < videoIds.value.length; i += size) {
    out.push(videoIds.value.slice(i, i + size));
  }
  return out;
});

const page = ref(0);
const prev = () => (page.value = Math.max(0, page.value - 1));
const next = () =>
  (page.value = Math.min(pages.value.length - 1, page.value + 1));

// Modal va embed
const currentId = ref<string | null>(null);
const embedUrl = computed(() =>
  currentId.value
    ? `https://www.youtube.com/embed/${currentId.value}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : ""
);

declare const bootstrap: any;
const openVideo = (id: string) => {
  currentId.value = id;
  const el = document.getElementById("expertVideoModal")!;
  const modal = bootstrap.Modal.getOrCreateInstance(el);
  modal.show();
  el.addEventListener(
    "hidden.bs.modal",
    () => {
      // yopilganda to'xtatish uchun iframe'ni olib tashlaymiz
      currentId.value = null;
    },
    { once: true }
  );
};
</script>

<style scoped>
:root {
  --ink: #003262;
  --muted: #5b6b8b;
  --brand: #0000FF;
  --brand2: #1e2dff;
  --frame: #e6eeff;
}

.title {
  color: var(--ink);
  font-weight: 500;
  line-height: 1.25;
  font-size: 40px;
}
.accent {
  color: #0000ff;
}

/* phone card */
.card-phone {
  position: relative;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  width: 100%;
  border-radius: 18px;
  outline: none;
}
.card-phone:focus-visible {
  box-shadow: 0 0 0 4px rgba(11, 95, 255, 0.25);
  border-radius: 22px;
}

.screen {
  border-radius: 18px;
  overflow: hidden;
  border: 4px solid #fff;
  box-shadow: 0 6px 20px rgba(16, 38, 94, 0.12), inset 0 0 0 1px var(--frame);
  background-size: cover;
  background-position: center;
}

/* play */
.play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  border: 2px solid #fff;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(2px);
}

/* controls */
.controls .btn-round {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid #9fbde1;
  background: #fff;
  color: #2a5e99;
  display: grid;
  place-items: center;
  font-size: 18px;
}
.controls .btn-round:disabled {
  opacity: 0.4;
}

.dots {
  display: flex;
  align-items: center;
  gap: 8px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #c9dbf3;
  transition: 0.2s;
}
.dot.active {
  width: 36px;
  height: 8px;
  background: #2a5e99;
  border-radius: 999px;
}

/* modal */
.modal-content {
  background: #000;
}
.ratio-9x16 {
  aspect-ratio: 9 / 16;
}
</style>
