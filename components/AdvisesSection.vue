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

      <!-- Top video cards -->
      <div class="row g-4 mb-2">
        <div class="col-lg-6" v-for="(thumb, i) in videoThumbs2" :key="'v'+i">
          <div class="soft-card position-relative overflow-hidden video-card">
            <img class="w-100 h-100 object-fit-cover" :src="thumb" alt="thumb" />
            <button class="play-overlay btn p-0 border-0" type="button">
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
          :key="'g'+i"
          class="col-12 col-md-6 col-lg-3"
        >
          <div class="thumb soft-card">
            <img :src="img" alt="gallery item" />
          </div>
        </div>
      </div>

      <!-- Audio list + Big player -->
      <div class="row g-4 align-items-start">
        <!-- Left list -->
        <div class="col-lg-7">
          <div class="d-flex flex-column gap-3">
            <AudioMini v-for="(a,i) in audios" :key="'a'+i" :src="a" />
          </div>
        </div>

        <!-- Right big player -->
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
  </section>
</template>

<script setup lang="ts">
import AudioMini from '@/components/AudioMini.vue'
import BigPlayer from '@/components/BigPlayer.vue'

type Props = {
  videoThumbs2?: string[]
  gallery4?: string[]
  audios?: string[]
  cover?: string
  playerTitle?: string
  playerSubtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  videoThumbs2: () => [
    '/images/advise1.png',
    '/images/advise2.png'
  ],
  gallery4: () => [
    '/images/advise1.png',
    '/images/advise2.png',
    '/images/advise3.png',
    '/images/advise4.png'
  ],
  audios: () =>
    Array.from({ length: 8 }, () => 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav'),
  cover: 'https://picsum.photos/900/700?random=31',
  playerTitle: 'Овозли Натижалар',
  playerSubtitle: 'Nevroslim'
})
</script>


<style scoped>
.section-title{
  font-weight: 500;
  font-size: 40px;
  letter-spacing: .5px;
}
.accent {
  color: #0000ff;
}

.video-card{
  min-height: 320px;
}

.play-overlay{
  position:absolute; inset:0;
  display:grid; place-items:center;
  background: transparent;
}

.play-btn{
  width: 56px; height:56px;
  border-radius: 50%;
  background: rgba(255,255,255,.85);
  display:grid; place-items:center;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(0,0,0,.06);
}

.soft-card{
  background: #E8EFFF;
  border-radius: 24px;
  box-shadow: 0 6px 24px rgba(6,24,44,.06);
}

.thumb{
  background: #eef3ff;
  border-radius: 18px;
  border: 1px solid #e6ecf5;
  overflow: hidden;
}

.thumb img{
  width:100%;
  height: 220px;
  object-fit: cover;
}

@media (min-width: 992px){
  .gallery .thumb img{ height: 200px; }
}
</style>
