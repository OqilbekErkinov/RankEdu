<template>
  <section class="hero-frame">
    <div class="row g-4 align-items-center">
      <div class="col-lg-7">
        <div class="badge bg-light text-primary fw-semibold mb-3">
          UZ O‘zbekiston milliy ta’lim platformasi
        </div>
        <h1 class="display-5 fw-bolder lh-sm mb-3">
          Bilimga baho emas,
          <span class="text-primary">o‘sishga daraja</span> beramiz
        </h1>
        <p class="text-muted mb-4">
          Raqobat qiling, o‘sishing va e’tirof oling. Yutuqlaringizni XP ga
          aylantiring va reytingda yuqoriga ko‘tariling.
        </p>
        <div class="d-flex gap-3">
          <button class="btn btn-primary btn-lg">Boshlash</button>
          <button class="btn btn-outline-secondary btn-lg">
            Reytingni ko‘rish
          </button>
        </div>

        <div class="d-flex gap-5 mt-4">
          <div>
            <div class="h4 fw-bold mb-0 text-primary">10K+</div>
            <div class="small text-muted">Faol Talabalar</div>
          </div>
          <div>
            <div class="h4 fw-bold mb-0 text-primary">50+</div>
            <div class="small text-muted">Universitetlar</div>
          </div>
          <div>
            <div class="h4 fw-bold mb-0 text-primary">1M+</div>
            <div class="small text-muted">Ishlab topilgan XP</div>
          </div>
        </div>
      </div>

      <div class="col-lg-5">
        <div class="illustration">
          <span class="illus-text">Platforma Illustratsiya</span>
        </div>
      </div>
    </div>
  </section>

  <section class="mt-4">
    <div class="row g-3">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 p-3">
          <div class="d-flex align-items-center gap-2 mb-2">
            <i class="bi bi-graph-up-arrow fs-4"></i>
            <h6 class="mb-0">Yutuqlar</h6>
          </div>
          <p class="text-muted mb-0">
            Keyingi iteratsiyada real ma’lumotlar bilan to‘ldiriladi.
          </p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 p-3">
          <div class="d-flex align-items-center gap-2 mb-2">
            <i class="bi bi-journal-text fs-4"></i>
            <h6 class="mb-0">So‘nggi kurslar</h6>
          </div>
          <p class="text-muted mb-0">
            Kurslar ro‘yxati backenddan kelganda bog‘lanadi.
          </p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 p-3">
          <div class="d-flex align-items-center gap-2 mb-2">
            <i class="bi bi-emoji-smile fs-4"></i>
            <h6 class="mb-0">AI tavsiyalar</h6>
          </div>
          <p class="text-muted mb-0">
            AI modul ulanishidan so‘ng bu blok faollashadi.
          </p>
        </div>
      </div>
    </div>
  </section>
  <!-- === Stipendiya kartalari (asosiy bo‘limlardan keyin qo‘ying) === -->
<section class="stipends mt-4">
  <div class="row g-0 dark-grid">
    <div
      v-for="s in stipends"
      :key="s.id"
      class="col-12 col-lg-4"
    >
      <div class="stip-card">
        <h5 class="title mb-3">{{ s.title }}</h5>
        <p class="desc mb-4">{{ s.brief }}</p>
        <button class="btn btn-outline-light neon-btn" @click="openStip(s)">
          O‘rganish
        </button>
      </div>
    </div>
  </div>
</section>

<!-- === Hi-tech Modal === -->
<transition name="fade">
  <div v-if="modal.open" class="stip-modal" @click.self="closeModal">
    <div class="stip-dialog">
      <button class="close-x" @click="closeModal" aria-label="Yopish">
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="glow-border"></div>

      <h4 class="mb-3">{{ modal.data.title }}</h4>
      <div class="text-muted mb-3">{{ modal.data.subtitle }}</div>

      <div v-for="(block, i) in modal.data.blocks" :key="i" class="mb-3">
        <h6 class="mb-2">{{ block.heading }}</h6>
        <ul class="mb-0">
          <li v-for="(li, j) in block.items" :key="j">{{ li }}</li>
        </ul>
      </div>

      <div class="d-flex justify-content-end gap-2 mt-4">
        <button class="btn btn-light" @click="closeModal">Yopish</button>
        <button class="btn btn-primary">Ariza topshirish</button>
      </div>
    </div>
  </div>
</transition>

</template>

<script setup>
import { ref } from 'vue'
definePageMeta({ layout: "default" });


/* 3 ta stipendiya ma’lumotlari */
const stipends = ref([
  {
    id: 'beruniy',
    title: 'Beruniy nomli stipendiya',
    // 2-rasmdagi "Kimlarga beriladi?" qisqartirilgan (3 qatordan oshmaydi)
    brief:
      "O‘zbekiston OTMlarining 3–4-kurs talabalari, o‘rtacha bahosi 4.5+ bo‘lgan va ilmiy-ijodiy ishlarda faol talabalar...",
    // Modal uchun to‘liq tarkib
    subtitle: 'Kimlarga beriladi?',
    blocks: [
      {
        heading: 'Asosiy talablar',
        items: [
          "O‘zbekiston OTMlarining 3–4-kurs talabalari (4 yillik ta’limda).",
          "O‘rtacha baho 4.5+ (a’lo baholar).",
          "Ilmiy yoki ijodiy ishlarda faollik (kamida 1 ta ilmiy maqola yoki ijodiy ish).",
          "Davlat tili va 1 ta xorijiy tilni bilish (ingliz, nemis, fransuz va b.)."
        ]
      },
      {
        heading: 'Cheklovlar',
        items: [
          "Akademik qarzdorligi bo‘lgan talabalar.",
          "Oxirgi 1 yilda intizom jazosi olganlar."
        ]
      }
    ]
  },
  {
    id: 'ibnsino',
    title: 'Ibn Sino nomli stipendiya',
    // 3-rasmdagi "Hujjatlar to‘plami"dan qisqa tavsif
    brief:
      "Ariza, akademik spravka, ilmiy-ijodiy ishlar hamda til sertifikati, shaxsni tasdiqlovchi hujjat nusxasi...",
    subtitle: "Hujjatlar to‘plami",
    blocks: [
      {
        heading: 'Topshiriladigan hujjatlar',
        items: [
          "Ariza (OTM shabloniga muvofiq).",
          "Akademik spravka (joriy o‘quv reytingi).",
          "Ilmiy yoki ijodiy ishlar (maqolalar, tezislar, loyihalar).",
          "Til sertifikati (OTM til kafedrasi hujjati yoki xalqaro sertifikat).",
          "Tavsiyanoma (2 ta o‘qituvchi yoki ilmiy rahbardan).",
          "Shaxsni tasdiqlovchi hujjat nusxasi."
        ]
      },
      {
        heading: 'Muhim eslatma',
        items: [
          "Hujjatlar 1–15 avgust oralig‘ida stipendiya.edu.uz tizimiga kiritiladi."
        ]
      }
    ]
  },
  {
    id: 'navoiy',
    title: 'Navoiy nomli stipendiya',
    // 5-rasmdagi "Tanlov bosqichlari"dan qisqa tavsif
    brief:
      "OTM darajasida komissiya tekshiruvlari va intervyu, so‘ng vazirlik tasdig‘i bilan yakuniy ro‘yxat tasdiqlanadi...",
    subtitle: 'Tanlov bosqichlari',
    blocks: [
      {
        heading: '1. OTM darajasida',
        items: [
          "Fakultet komissiyasi hujjatlarni tekshiradi.",
          "So‘rovnoma va intervyu o‘tkaziladi.",
          "Ilmiy kengash talabalarni baholaydi."
        ]
      },
      {
        heading: '2. Respublika darajasida',
        items: [
          "Vazirlik tomonidan yakuniy ro‘yxat tasdiqlanadi.",
          "OTM tavsiyanomalari 10–30 sentyabr kunlari ko‘rib chiqiladi."
        ]
      }
    ]
  }
])

/* Modal holati */
const modal = ref({
  open: false,
  data: { title: '', subtitle: '', blocks: [] }
})

function openStip(s) {
  modal.value = { open: true, data: s }
}
function closeModal() {
  modal.value.open = false
}
</script>
<style scoped>
/* Qoramtir kafel grid – RR uslubida */
.dark-grid{
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
}
.stip-card{
 background: #0d1324;
  color: #e9eef7;
  padding: 36px 28px;
  min-height: 220px;
  position: relative;
}
.stip-card + .stip-card{ border-left: 1px solid rgba(255,255,255,.06); }
.dark-grid > [class*='col-']:not(:last-child) .stip-card{
  border-right: 1px solid rgba(255,255,255,.08); /* vertikal ajratuvchi */
}
.stip-card .title{
  letter-spacing: .18em;
  text-transform: uppercase;
  color: #fafafa;
}
.stip-card .desc{
  color: #c7cbd4;
  max-height: 4.5em; /* ~3 qator */
  overflow: hidden;
}
.neon-btn{
  border-radius: 999px;
  padding: 10px 18px;
  border-color: rgba(255,255,255,.35);
  backdrop-filter: blur(2px);
}
.neon-btn:hover{
  box-shadow: 0 0 0 2px rgba(99, 157, 255, .25), 0 0 16px rgba(99, 157, 255, .35) inset;
  border-color: #8ec5ff;
  /* color: #eaf3ff; */
}

/* Hi-tech modal */
.stip-modal{
  position: fixed; inset: 0;
  background: rgba(6, 10, 20, .55);
  backdrop-filter: blur(6px);
  display: grid; place-items: center;
  z-index: 2000;
  padding: 16px;
}
.stip-dialog{
  position: relative;
  width: min(860px, 96vw);
  background: rgba(15, 20, 34, .88);
  color: #eaf0ff;
  border: 1px solid rgba(142, 197, 255, .25);
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,.35);
}
.stip-dialog h4{ color:#eaf3ff; }
.stip-dialog h6{ color:#9fd0ff; text-transform: none; }

.stip-dialog ul{
  padding-left: 1.1rem;
}
.stip-dialog li{
  margin: .2rem 0;
}

.glow-border{
  position: absolute; inset: -2px;
  border-radius: 20px;
  pointer-events: none;
  background:
    radial-gradient(1200px 300px at 0% 0%, rgba(83, 162, 255,.18), transparent 60%),
    radial-gradient(800px 300px at 100% 100%, rgba(0, 255, 199,.14), transparent 60%);
  mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
  padding: 2px;
}

.close-x{
  position: absolute; top: 10px; right: 10px;
  width: 36px; height: 36px; border-radius: 50%;
  display: grid; place-items: center;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.15);
  color: #fff;
}
.close-x:hover{ background: rgba(255,255,255,.15); }

/* Kirib chiqish animatsiyasi */
.fade-enter-active,.fade-leave-active{ transition: opacity .18s ease; }
.fade-enter-from,.fade-leave-to{ opacity: 0; }

@media (max-width: 992px){
  .stip-card{ padding: 24px 20px; }
  .dark-grid > [class*='col-'] .stip-card{ border-right: 0; }
}
</style>
