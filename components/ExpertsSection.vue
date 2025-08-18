<!-- components/ExpertsSection.vue -->
<template>
  <section id="experts" class="experts pb-5 mb-5">
    <div class="container position-relative">
      <h2 class="title text-center mb-4">
        Мутаҳассислар "<span class="accent">Неврослим</span>" ҳақида фикрлари
      </h2>

      <!-- horizontal carousel -->
      <div ref="scroller" class="scroller">
        <div v-for="id in videoIds" :key="id" class="card-phone">
          <div class="screen ratio-9x16" @click="playInline(id)">
            <!-- thumbnail -->
            <div
              v-if="playingId !== id"
              class="thumb"
              :style="{
                backgroundImage: `url(https://img.youtube.com/vi/${id}/hqdefault.webp)`,
              }"
            />
            <!-- inline iframe (cover) -->
            <iframe
              v-else
              :id="`player-${id}`"
              class="embed-cover"
              :src="inlineUrl(id)"
              title="Expert video"
              allow="autoplay; fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />

            <!-- center play -->
            <button
              v-if="playingId !== id"
              class="play"
              aria-label="Play"
              @click.stop="playInline(id)"
            >
              ▶
            </button>

            <!-- overlay controls (show only when playing) -->
            <div v-if="playingId === id" class="overlay-controls">
              <button
                class="ctrl"
                @click.stop="togglePlay(id)"
                aria-label="Pause"
              >
                ❚❚
              </button>
              <button
                class="ctrl"
                @click.stop="openShorts(id)"
                aria-label="Shorts"
              >
                Shorts
              </button>
              <button
                class="ctrl"
                @click.stop="goFullscreen(id)"
                aria-label="Fullscreen"
              >
                ⛶
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- side arrows -->
      <button class="side-arrow left" @click="scrollByCard(-1)">‹</button>
      <button class="side-arrow right" @click="scrollByCard(1)">›</button>
    </div>

    <!-- Fallback: fullscreen modal -->
    <div
      class="modal fade"
      id="expertVideoModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content border-0 bg-black">
          <div class="ratio-9x16 h-100">
            <iframe
              v-if="currentId"
              class="embed-cover"
              :src="modalUrl"
              title="Expert video fullscreen"
              allow="autoplay; fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const videoIds = ref<string[]>([
  // o'zingiznikini yozing
  "CSI9y-ZfFMk",
  "Yw0oGB6X9eo",
  "msk1Tsm8kiE",
  "xNW-_UZdSRw",
  "JiV4KzqIRIA",
  "gH_2b2emcKw",
  "ftrEjtUO0bo",
]);

/* --- inline play with sound (user click bo‘lgani uchun ruxsat etiladi) --- */
const playingId = ref<string | null>(null);
const inlineUrl = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&playsinline=1&controls=0&modestbranding=1&rel=0`;

const playInline = (id: string) => {
  playingId.value = id;
};
const togglePlay = (id: string) => {
  playingId.value = playingId.value === id ? null : id;
};

/* --- Shorts --- */
const openShorts = (id: string) =>
  window.open(`https://www.youtube.com/shorts/${id}`, "_blank");

/* --- True fullscreen (3-rasm) --- */
const currentId = ref<string | null>(null);
const modalUrl = computed(() =>
  currentId.value
    ? `https://www.youtube.com/embed/${currentId.value}?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1`
    : ""
);

const goFullscreen = async (id: string) => {
  // agar inline o‘ynamayotgan bo‘lsa, dastroq o‘ynatamiz
  if (playingId.value !== id) playingId.value = id;

  const iframe = document.getElementById(
    `player-${id}`
  ) as HTMLIFrameElement | null;
  if (iframe && iframe.requestFullscreen) {
    try {
      await iframe.requestFullscreen(); // haqiqiy fullscreen
      return;
    } catch {}
  }

  // Fallback: Bootstrap fullscreen modal
  currentId.value = id;
  const el = document.getElementById("expertVideoModal")!;
  // @ts-ignore
  const BS = (window as any).bootstrap;
  if (BS?.Modal) {
    const modal = BS.Modal.getOrCreateInstance(el);
    modal.show();
    const onHidden = () => {
      currentId.value = null;
      el.removeEventListener("hidden.bs.modal", onHidden);
    };
    el.addEventListener("hidden.bs.modal", onHidden);
  } else {
    // eng oddiy fallback
    el.classList.add("show");
    el.style.display = "block";
    el.removeAttribute("aria-hidden");
    const close = (e: MouseEvent) => {
      if (e.target === el) {
        el.classList.remove("show");
        el.style.display = "none";
        el.setAttribute("aria-hidden", "true");
        currentId.value = null;
        el.removeEventListener("click", close);
      }
    };
    el.addEventListener("click", close);
  }
};

/* --- Carousel scroll by one card --- */
const scroller = ref<HTMLDivElement | null>(null);
const getCardWidth = () => {
  const el = scroller.value?.querySelector<HTMLElement>(".card-phone");
  if (!el) return 0;
  const w = el.getBoundingClientRect().width;
  const gap = 24; // .scroller gap
  return w + gap;
};
const scrollByCard = (dir: 1 | -1) => {
  const el = scroller.value;
  if (!el) return;
  el.scrollBy({ left: getCardWidth() * dir, behavior: "smooth" });
};
</script>

<style scoped>
:root {
  --ink: #003262;
  --brand: #0000ff;
  --frame: #e6eeff;
}
.title {
  color: var(--ink);
  font-weight: 500;
  line-height: 1.25;
  font-size: 40px;
}
.accent {
  color: var(--brand);
}

/* carousel */
.scroller {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 4px 4px 8px;
  scroll-behavior: smooth;
}
.scroller::-webkit-scrollbar {
  display: none;
}
.card-phone {
  flex: 0 0 auto;
  width: clamp(240px, 22vw, 320px);
  position: relative;
  scroll-snap-align: start;
}

.screen {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  border: 4px solid #fff;
  box-shadow: 0 6px 20px rgba(16, 38, 94, 0.12), inset 0 0 0 1px var(--frame);
  background: #000;
}
.thumb {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

/* 9:16 container */
.ratio-9x16 {
  aspect-ratio: 9/16;
}

/* iframe COVER:
   16:9 videoni 9:16 konteynerga sig‘dirib, yonlarini ozgina kesadi (qora joylar yo‘q) */
.embed-cover {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
  width: 177.78%; /* = 16/9 / (9/16) * 100% */
  transform: translate(-50%, -50%);
  border: 0;
}

/* markaziy play */
.play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: red;
  font-weight: 700;
  border: 2px solid #fff;
  background: rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(2px);
}

/* overlay controls (faqat playing) */
.overlay-controls {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 8px;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  padding: 6px 8px;
}
.ctrl {
  appearance: none;
  border: 0;
  background: rgba(255, 255, 255, 0.94);
  color: #0a2a5c;
  padding: 6px 12px;
  border-radius: 10px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
}

/* side arrows */
.side-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid #9fbde1;
  background: #fff;
  color: #2a5e99;
  display: grid;
  place-items: center;
  font-size: 22px;
  z-index: 2;
}
.side-arrow.left {
  left: -6px;
  padding-bottom: 0.6rem;
}
.side-arrow.right {
  right: -6px;
  padding-bottom: 0.6rem;
}
@media (max-width: 576px) {
  .side-arrow.left {
    left: 4px;
  }
  .side-arrow.right {
    right: 4px;
  }
}

/* modal */
.modal-content {
  background: #000;
}
.bg-black {
  background: #000;
}
@media (max-width: 600px) {
  .title {
    font-size: 24px;
  }
  .side-arrow {
    top: 105%;
  }
  .side-arrow.left {
    left: 7rem;
  }
  .side-arrow.right {
    right: 7rem;
  }
}
</style>
