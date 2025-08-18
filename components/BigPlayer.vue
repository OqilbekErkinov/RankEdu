<template>
  <div class="soft-card p-4 big-player">
    <!-- Cover -->
    <div class="big-cover mb-3">
      <img src="/images/player.webp" alt="" class="w-100" />
    </div>

    <h5 class="fw-semibold mb-1">{{ title }}</h5>
    <div class="text-muted small mb-2">{{ subtitle }}</div>

    <!-- Progress -->
    <div class="progress progress-sm my-3">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: pct + '%' }"
      ></div>
    </div>

    <!-- Controls -->
    <div class="d-flex align-items-center gap-2 my-3 justify-content-center">
      <button
        style="border: none !important; color: #003262; background: transparent"
        class="icon-btn"
        @click="shuffle = !shuffle"
      >
        <i
          style="border: none !important; color: #003262"
          class="bi bi-shuffle"
        ></i>
      </button>
      <button
        style="border: none !important; color: #003262; background: transparent"
        class="icon-btn"
        @click="mute"
      >
        <i
          class="ms-2 me-5"
          style="border: none !important; color: #003262"
          :class="muted ? 'bi bi-volume-mute' : 'bi bi-volume-up'"
        ></i>
      </button>

      <button
        class="btn btn-primary rounded-circle d-grid place-items-center"
        style="width: 56px; height: 56px"
        @click="toggle"
      >
        <i
          class="ms-0 mt-1"
          :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"
        ></i>
      </button>

      <button
        style="border: none !important; color: #003262; background: transparent"
        class="icon-btn"
      >
        <i
          style="border: none !important; color: #003262"
          class="bi bi-music-note-beamed me-3 ms-5"
        ></i>
      </button>
      <button
        style="border: none !important; color: #003262; background: transparent"
        class="icon-btn"
        @click="loop = !loop"
      >
        <i
          style="border: none !important; color: #003262"
          class="bi bi-arrow-repeat"
        ></i>
      </button>
    </div>

    <audio
      ref="audio"
      :src="src"
      :loop="loop"
      @timeupdate="onTick"
      @ended="isPlaying = false"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  src: string;
  cover: string;
  title: string;
  subtitle?: string;
}>();

const audio = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const shuffle = ref(false);
const loop = ref(false);
const muted = ref(false);
const pct = ref(0);

function toggle() {
  if (!audio.value) return;
  if (isPlaying.value) audio.value.pause();
  else audio.value.play();
  isPlaying.value = !isPlaying.value;
}

function mute() {
  if (!audio.value) return;
  audio.value.muted = !audio.value.muted;
  muted.value = audio.value.muted;
}

function onTick() {
  if (!audio.value || !audio.value.duration) return;
  pct.value = (audio.value.currentTime / audio.value.duration) * 100;
}
</script>
<style scoped>
.bi {
  font-size: 30px !important;
  margin-left: 2.4rem;
  margin-right: 2.4rem;
}
</style>
