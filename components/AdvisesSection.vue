<!-- components/AdvisesSection.vue -->
<template>
  <section id="results" class="advises pb-5">
    <div class="classformargin">
      <!-- Title -->
      <div class="text-center mb-4 mb-lg-5">
        <h1 class="display-title section-title">
          <span class="duo"
            >Мижозларимиз “Неврослим” ҳақида нима дейишади?</span
          >
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

            <!-- Inline iframe (YouTube controls ON) -->
            <div v-else class="ratio ratio-16x9">
              <iframe
                :id="`adv-player-${id}`"
                class="yt-iframe"
                :src="inlineUrl(id)"
                title="video"
                allow="autoplay; fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              />
            </div>

            <!-- Markaziy play tugmasi (videoni boshlash uchun) -->
            <button
              v-if="playingId !== id"
              class="play-overlay btn p-0 border-0"
              type="button"
              @click.stop="playInline(id)"
            >
              <span class="play-btn">
                <svg height="100%" viewBox="0 0 68 48" width="100%">
                  <path
                    class="ytp-large-play-button-bg"
                    d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                    fill="#f03"
                  />
                  <path d="M45,24 27,14 27,34" fill="#fff"></path>
                </svg>
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
          <div
            class="thumb soft-card"
            @click="openImageFullscreen(img)"
            role="button"
          >
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

    <!-- (Video) Fallback fullscreen modal — hozircha ishlatilmaydi, lekin qoldirdik -->
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

    <!-- Image fullscreen modal -->
    <div class="modal fade" id="imgFullscreen" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content border-0 bg-black">
          <!-- Close button -->
          <button
            type="button"
            class="btn-close btn-close-white fs-close"
            aria-label="Close"
            data-bs-dismiss="modal"
            @click="closeImageFullscreen"
          ></button>

          <div class="d-flex align-items-center justify-content-center h-100">
            <img
              v-if="currentImg"
              :src="currentImg"
              class="img-fs"
              alt="preview"
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

/* ---- Video boshqaruvlari ---- */
const playingId = ref<string | null>(null);

/* YouTube inline URL: controls=1 → YouTube ikonkalari ko‘rinadi */
const inlineUrl = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&controls=1&modestbranding=1&rel=0&fs=1&enablejsapi=1&origin=${location.origin}`;

const playInline = (id: string) => {
  playingId.value = id;
};

/* Fullscreen (true fullscreen → modal fallback) — qoldirilgan */
const currentId = ref<string | null>(null);
const modalUrl = computed(() =>
  currentId.value
    ? `https://www.youtube.com/embed/${currentId.value}?autoplay=1&mute=0&rel=0&modestbranding=1`
    : ""
);

/* ---- Image fullscreen ---- */
const currentImg = ref<string | null>(null);

const escClose = (e: KeyboardEvent) => {
  if (e.key === "Escape") closeImageFullscreen();
};

const closeImageFullscreen = () => {
  const el = document.getElementById("imgFullscreen")!;
  // @ts-ignore
  const BS = (window as any).bootstrap;
  if (BS?.Modal) {
    const inst = BS.Modal.getInstance(el) || BS.Modal.getOrCreateInstance(el);
    inst.hide();
  } else {
    el.classList.remove("show");
    el.style.display = "none";
    el.setAttribute("aria-hidden", "true");
  }
  currentImg.value = null;
  document.removeEventListener("keydown", escClose);
};

const openImageFullscreen = (src: string) => {
  currentImg.value = src;
  const el = document.getElementById("imgFullscreen")!;
  // @ts-ignore
  const BS = (window as any).bootstrap;

  if (BS?.Modal) {
    const modal = BS.Modal.getOrCreateInstance(el);
    modal.show();
    el.addEventListener(
      "hidden.bs.modal",
      () => {
        currentImg.value = null;
        document.removeEventListener("keydown", escClose);
      },
      { once: true }
    );
  } else {
    // Fallback
    el.classList.add("show");
    el.style.display = "block";
    el.removeAttribute("aria-hidden");

    const backdropClose = (e: MouseEvent) => {
      if (e.target === el) closeImageFullscreen();
    };
    el.addEventListener("click", backdropClose, { once: true });
  }

  // ESC bilan yopish
  document.addEventListener("keydown", escClose);
};
</script>

<style scoped>
.section-title {
  font-weight: 500;
  font-size: 40px;
  letter-spacing: 0.5px;
  margin: auto;
}
.accent {
  color: #0000ff;
}

.video-card {
  min-height: 477px; /* konteyner balandligi (thumb/iframe) */
  margin-bottom: 2rem;
}

/* YouTube iframe to‘liq ko‘rinsin, ichida o‘z controls chiqadi */
.yt-iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

/* Markaziy play overlay */
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
  background: transparent;
  display: grid;
  place-items: center;
  border: none;
}

/* Cardlar */
.soft-card {
  background: #e8efff;
  border-radius: 24px;
}

.thumb {
  background: #eef3ff;
  border-radius: 18px;
  border: 1px solid #e6ecf5;
  overflow: hidden;
  cursor: pointer;
}
.thumb img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

/* Fullscreen image styling */
.img-fs {
  max-width: 100%;
  max-height: 100vh;
  object-fit: contain;
}
/* Modal kontent nisbiy bo‘lsin — tugma joylashishi uchun */
#imgFullscreen .modal-content {
  position: relative;
}

/* Close button (oq x) */
.fs-close {
  position: absolute;
  top: 12px;
  right: 7rem;
  z-index: 2;
  filter: invert(1); /* qorong‘i fon ustida oq bo‘lib ko‘rinsin */
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
  .video-card {
    min-height: 250px !important;
  }
}
.ratio-16x9 {
  --bs-aspect-ratio: 75%;
}
</style>
