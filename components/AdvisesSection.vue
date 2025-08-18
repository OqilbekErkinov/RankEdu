<!-- components/AdvisesSection.vue -->
<template>
  <section id="results" class="advises pb-5">
    <div class="container">
      <!-- Title -->
      <div class="text-center mb-4 mb-lg-5">
        <h1 class="section-title">
          <span class="accent">Мижозларимиз</span>
          “Неврослим” ҳақида нима дейишади?
        </h1>
      </div>

      <!-- Top video cards (YouTube by ID) -->
      <div class="row g-4 mb-2">
        <div class="col-lg-6" v-for="(id, i) in videoIds" :key="'v' + i">
          <div class="soft-card position-relative overflow-hidden video-card">
            <!-- Thumb -->
            <img
              v-if="playingId !== id"
              class="w-100 h-100 object-fit-cover"
              :src="`https://img.youtube.com/vi/${id}/hqdefault.jpg`"
              alt="thumb"
              @click="playInline(id)"
            />

            <!-- Inline iframe (cover) -->
            <iframe
              v-else
              :id="`adv-player-${id}`"
              class="embed-cover"
              :src="inlineUrl(id)"
              title="video"
              allow="autoplay; fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />

            <!-- Videoning o'zini bosib pause / play -->
            <button
              v-if="playingId === id"
              class="click-catcher"
              aria-label="Toggle"
              @click.stop="togglePlay(id)"
            ></button>

            <!-- Overlay controls (faqat oynayotganda) -->
            <div v-if="playingId === id" class="overlay-controls">
              <button
                class="ctrl"
                @click.stop="togglePlay(id)"
                aria-label="Pause/Play"
              >
                ❚❚ / ▶
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

            <!-- Markaziy play: boshlash yoki fullscreen -->
            <button
              v-if="playingId !== id"
              class="play-overlay btn p-0 border-0"
              type="button"
              @click.stop="playInline(id)"
            >
              <span class="play-btn">
                <i class="bi bi-play-fill fs-4 text-primary"></i>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- 4 thumbs gallery -->
      <div class="row g-4 mb-5 gallery">
        <div
          v-for="(img, i) in gallery4"
          :key="'g' + i"
          class="col-12 col-md-6 col-lg-3"
        >
          <div class="thumb soft-card">
            <img :src="img" alt="gallery item" />
          </div>
        </div>
      </div>

      <!-- Audio list + Big player -->
      <div class="row g-4 align-items-start">
        <div class="col-lg-7">
          <div class="d-flex flex-column" style="gap: 2.4rem">
            <AudioMini v-for="(a, i) in audios" :key="'a' + i" :src="a" />
          </div>
        </div>
        <div class="col-lg-5">
          <BigPlayer
            :src="audios?.[0]"
            :cover="cover"
            :title="playerTitle"
            :subtitle="playerSubtitle"
          />
        </div>
      </div>
    </div>

    <!-- Fallback fullscreen modal -->
    <div class="modal fade" id="advVideoModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content border-0 bg-black">
          <div class="ratio ratio-16x9">
            <iframe
              v-if="currentId"
              class="w-100 h-100 border-0"
              :src="modalUrl"
              title="Fullscreen video"
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
import AudioMini from "@/components/AudioMini.vue";
import BigPlayer from "@/components/BigPlayer.vue";

type Props = {
  /** YouTube video IDs for the top two cards */
  videoIds?: string[];
  gallery4?: string[];
  audios?: string[];
  cover?: string;
  playerTitle?: string;
  playerSubtitle?: string;
};

const props = withDefaults(defineProps<Props>(), {
  // O'zingizning videolaringiz IDlarini qo'ying
  videoIds: () => ["pRV-sBORRfI", "2M6Uui9OWT8"],
  gallery4: () => [
    "/images/advise1.webp",
    "/images/advise2.webp",
    "/images/advise3.webp",
    "/images/advise4.webp",
  ],
  audios: () =>
    Array.from(
      { length: 8 },
      () => "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav"
    ),
  cover: "https://picsum.photos/900/700?random=31",
  playerTitle: "Оvozли Натижалар",
  playerSubtitle: "Nevroslim",
});

/* ---- ExpertsSection dagidek boshqaruvlar ---- */
const playingId = ref<string | null>(null);
const inlineUrl = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&playsinline=1&controls=0&modestbranding=1&rel=0`;

const playInline = (id: string) => {
  playingId.value = id;
};

/* pause/play — YouTube API’siz: iframe’ni olib tashlab qayta qo’yish */
const togglePlay = (id: string) => {
  playingId.value = playingId.value === id ? null : id;
};

/* Shorts */
const openShorts = (id: string) =>
  window.open(`https://www.youtube.com/shorts/${id}`, "_blank");

/* Fullscreen (true fullscreen → modal fallback) */
const currentId = ref<string | null>(null);
const modalUrl = computed(() =>
  currentId.value
    ? `https://www.youtube.com/embed/${currentId.value}?autoplay=1&mute=0&rel=0&modestbranding=1`
    : ""
);

const goFullscreen = async (id: string) => {
  const iframe = document.getElementById(
    `adv-player-${id}`
  ) as HTMLIFrameElement | null;
  if (iframe && iframe.requestFullscreen) {
    try {
      await iframe.requestFullscreen();
      return;
    } catch {}
  }
  // Fallback: Bootstrap modal
  currentId.value = id;
  const el = document.getElementById("advVideoModal")!;
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
    // Eng oddiy fallback
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
</script>

<style scoped>
.section-title {
  font-weight: 500;
  font-size: 40px;
  letter-spacing: 0.5px;
}
.accent {
  color: #0000ff;
}

.video-card {
  min-height: 477px; /* rasm/iframe uchun konteyner balandligi */
  margin-bottom: 2rem;
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: transparent;
}

.play-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  display: grid;
  place-items: center;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.soft-card {
  background: #e8efff;
  border-radius: 24px;
}

.thumb {
  background: #eef3ff;
  border-radius: 18px;
  border: 1px solid #e6ecf5;
  overflow: hidden;
}
.thumb img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

/* YouTube iframeni "cover" qilib joylashtirish */
.embed-cover {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
  width: 177.78%;
  transform: translate(-50%, -50%);
  border: 0;
}

/* Video ustiga bosib pause/play qilish uchun shaffof qatlam */
.click-catcher {
  position: absolute;
  inset: 0;
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

/* Overlay controls (faqat playing paytida) */
.overlay-controls {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  padding: 6px 10px;
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

@media (min-width: 992px) {
  .gallery .thumb img {
    height: 200px;
  }
}
@media (max-width: 600px) {
  .section-title {
    font-size: 24px;
  }
  .video-card[data-v-0cb8c9e8] {
    min-height: 250px !important;
  }
}
</style>
