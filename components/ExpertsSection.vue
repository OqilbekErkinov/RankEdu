<!-- components/ExpertsSection.vue -->
<template>
  <section id="experts" class="experts pb-5 mb-5">
    <svg
      class="expertdna"
      width="379"
      height="206"
      viewBox="0 0 379 206"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M-34 205.04C-34 205.04 36.5 184.74 51.5 124.74C57.1 102.44 80.6 25.1402 113.3 43.6402C145.9 62.1402 157.3 124.74 188.2 100.14C219.1 75.4402 235.8 -4.85986 265.8 1.34014C295.8 7.54014 313.4 81.5402 336.4 85.9402C359.3 90.4402 377.8 54.2402 377.8 54.2402"
        stroke="#5D8AA8"
        stroke-opacity="0.15"
        stroke-width="2"
        stroke-miterlimit="10"
      />
      <path
        d="M-33.5 191.04C-33.5 191.04 68.9 197.94 99.3 154.24C135 102.84 141.7 -5.45981 173 16.9402C204.2 39.2402 233.3 141.94 273.4 129.64C313.6 117.34 359.4 2.44019 359.4 2.44019"
        stroke="#5D8AA8"
        stroke-opacity="0.15"
        stroke-width="2"
        stroke-miterlimit="10"
      />
    </svg>

    <div class="classformargin position-relative">
      <h2 class="display-title title text-center mb-4">
        <span class="duo"
          >Мутаҳассислар "Неврослим" <br />
          ҳақида фикрлари</span
        >
      </h2>

      <div ref="scroller" class="scroller" @scroll="onScroll">
        <div v-for="id in videoIds" :key="id" class="card-phone">
          <div class="screen ratio-9x16" @click="playInline(id)">
            <div
              v-if="playingId !== id"
              class="thumb"
              :style="{
                backgroundImage: `url(https://img.youtube.com/vi/${id}/hqdefault.jpg)`,
              }"
            />
            <iframe
              v-else
              :id="`player-${id}`"
              class="embed-cover"
              :src="inlineUrl(id)"
              title="Expert video"
              allow="autoplay; fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />

            <button
              v-if="playingId !== id"
              class="play play-minimal"
              aria-label="Play"
              @click.stop="playInline(id)"
            >
              <svg fill="none" height="72" viewBox="0 0 87 115" width="72">
                <path
                  clip-rule="evenodd"
                  d="M83.99 10.81C90.08 21.24 86.62 34.66 76.26 40.79L69.05 45.06L74.17 47.38C81.58 50.74 86.52 57.99 86.96 66.17C87.40 74.34 83.27 82.09 76.26 86.24L32.76 111.97C22.41 118.10 9.08 114.61 3.00 104.18C-3.08 93.75 .37 80.33 10.73 74.20L17.94 69.93L12.82 67.61C5.41 64.25 .47 57.00 .03 48.82C-0.40 40.65 3.72 32.90 10.73 28.75L54.23 3.02C64.58 -3.10 77.91 .38 83.99 10.81Z"
                  fill="#f00"
                  fill-rule="evenodd"
                ></path>
                <path
                  clip-rule="evenodd"
                  d="M33 74L33 41L61 57.5L33 74Z"
                  fill="white"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>

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

      <div class="pager-wrap">
        <button class="nav-dot" @click="scrollByCard(-1)" aria-label="Prev">
          <span class="chev">‹</span>
        </button>

        <div
          aria-label="Audio loading progress"
          class="pill-track"
          role="progressbar"
          :aria-valuenow="Math.round(progress * 100)"
        >
          <div
            class="pill-thumb"
            :style="{ width: thumbWidth + '%', left: thumbLeft + '%' }"
          ></div>
        </div>

        <button class="nav-dot" @click="scrollByCard(1)" aria-label="Next">
          <span class="chev">›</span>
        </button>
      </div>
    </div>

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
        <IconsExpertDna2 />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import IconsExpertDna2 from "~/components/Icons/ExpertDna2.vue";


const videoIds = ref<string[]>([
  "PCltK1XzrBk",
  "3JGBF8Zaz4I",
  "RHIIYA8P1DI",
  "u7UgJafwpW8",
  "JDlXf92LiTo",
  "ZbSPn_FnPyI",
]);

const playingId = ref<string | null>(null);
const inlineUrl = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&playsinline=1&controls=0&modestbranding=1&rel=0`;

const playInline = (id: string) => {
  playingId.value = id;
};
const togglePlay = (id: string) => {
  playingId.value = playingId.value === id ? null : id;
};

const openShorts = (id: string) =>
  window.open(`https://www.youtube.com/shorts/${id}`, "_blank");

const currentId = ref<string | null>(null);
const modalUrl = computed(() =>
  currentId.value
    ? `https://www.youtube.com/embed/${currentId.value}?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1`
    : ""
);

const goFullscreen = async (id: string) => {
  if (playingId.value !== id) playingId.value = id;
  const iframe = document.getElementById(
    `player-${id}`
  ) as HTMLIFrameElement | null;
  if (iframe && (iframe as any).requestFullscreen) {
    try {
      await (iframe as any).requestFullscreen();
      return;
    } catch {}
  }
  currentId.value = id;
  const el = document.getElementById("expertVideoModal")!;
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

const scroller = ref<HTMLDivElement | null>(null);
const getCardWidth = () => {
  const el = scroller.value?.querySelector<HTMLElement>(".card-phone");
  if (!el) return 0;
  const w = el.getBoundingClientRect().width;
  const gap = 24;
  return w + gap;
};
const scrollByCard = (dir: 1 | -1) => {
  const el = scroller.value;
  if (!el) return;
  el.scrollBy({ left: getCardWidth() * dir, behavior: "smooth" });
};

const progress = ref(0); 
const thumbWidth = ref(25);
const thumbLeft = ref(0);
const onScroll = () => {
  const el = scroller.value;
  if (!el) return;
  const max = el.scrollWidth - el.clientWidth;
  const p = max > 0 ? el.scrollLeft / max : 0;
  progress.value = p;

  const w = (el.clientWidth / el.scrollWidth) * 100;
  thumbWidth.value = Math.max(16, Math.min(80, w * 0.98));
  thumbLeft.value = p * (100 - thumbWidth.value);
};
onMounted(() => {
  setTimeout(onScroll, 0);
  window.addEventListener("resize", onScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", onScroll);
});
</script>