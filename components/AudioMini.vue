<template>
  <div class="audio-mini d-flex align-items-center gap-3 p-2 soft-card" style="z-index: 100">
    <!-- Play/Pause -->
    <button aria-label="pause"
      class="btn rounded-circle p-0 d-grid place-items-center"
      style="width: 36px; height: 36px"
      @click="toggle"
    >
      <i
        style="margin-top: 6px; color: #003262"
        :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"
      ></i>
    </button>
    <span style="color: #003262" class="me-2 voise-time"
      >{{ currentTime }}/{{ duration }}</span
    >

    <!-- Progress -->
    <div class="flex-grow-1">
      <div class="d-flex"></div>
      <div class="progress progress-sm mt-1">
        <div
        aria-label="Audio loading progress"
          style="--bs-progress-bg: #74afff"
          class="progress-bar"
          role="progressbar"
          :style="{ width: pct + '%' }"
        ></div>
      </div>
    </div>

    <!-- Volume -->
    <button aria-label="dots" class="btn btn-link text-muted p-0" @click="mute">
      <i
        style="color: #003262"
        :class="muted ? 'bi bi-volume-mute' : 'bi bi-volume-up'"
      ></i>
      <i style="color: #003262" class="bi bi-three-dots-vertical"></i>
    </button>

    <audio
      ref="audio"
      :src="src"
      @timeupdate="onTick"
      @ended="isPlaying = false"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{ src: string }>();
const audio = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const muted = ref(false);
const pct = ref(0);

const currentTime = computed(() => format(audio.value?.currentTime || 0));
const duration = computed(() => format(audio.value?.duration || 0));

function format(s: number) {
  const m = Math.floor(s / 60).toString();
  const ss = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${ss}`;
}

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
<style>
.progress {
  --bs-progress-bg: #74afff;
  --bs-progress-height: 0.5rem;
}
.voise-time {
  font-size: 10px;
  margin-right: 0;
  margin-left: -1rem;
}
</style>
