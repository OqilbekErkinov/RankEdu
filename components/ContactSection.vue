<template>
  <section id="contact" class="contact-page py-4 py-lg-5">
    <!-- top promo ticker -->
    <div class="promo-ticker text-dark fw-bold">
      <div class="track">
        <span v-for="n in 8" :key="n">-50% ЧЕГИРМАГА ЭГА БЎЛИНГ&nbsp;&nbsp;</span>
      </div>
    </div>

    <div class="container">
      <!-- COUNTDOWN + FORM -->
      <div class="soft-card p-4 p-lg-5 mb-5 position-relative border-2 border-primary rounded-4">
        <div class="row g-4 align-items-start">
          <!-- timer -->
          <div class="col-lg-7">
            <div class="timer soft-inner px-3 py-2 py-md-3 rounded-3">
              <div class="d-flex align-items-end gap-4 gap-md-5">
                <div class="time-block">
                  <div class="digits">{{ padLeft(left.days) }}</div>
                  <div class="legend">КУН</div>
                </div>
                <div class="time-block">
                  <div class="digits">{{ padLeft(left.hours) }}</div>
                  <div class="legend">СОАТ</div>
                </div>
                <div class="time-block">
                  <div class="digits">{{ padLeft(left.minutes) }}</div>
                  <div class="legend">ДАҚИҚА</div>
                </div>
                <div class="time-block">
                  <div class="digits">{{ padLeft(left.seconds) }}</div>
                  <div class="legend">СОНИЯ</div>
                </div>
              </div>
            </div>

            <p class="mt-4 small text-muted">
              Асабингизни табиий экстрактлар орқали тузатиб шифо топинг.
              Ўзингиз ва яқинларингиз соғлигига бефарқ бўлманг
            </p>
          </div>

          <!-- form -->
          <div class="col-lg-5">
            <div class="soft-inner p-3 rounded-3">
              <div class="mb-2">
                <input type="text" class="form-control" placeholder="Исмиңиз" v-model="form.name" />
              </div>
              <div class="mb-3">
                <input type="tel" class="form-control" placeholder="+998" v-model="form.phone" />
              </div>
              <button class="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                      @click="submit">
                Биз билан боғланиш
                <i class="bi bi-telephone"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- VIDEO CALL MOCK -->
      <div class="soft-card p-3 p-lg-4 rounded-4">
        <!-- main video -->
        <div class="position-relative rounded-4 overflow-hidden main-video mb-3" style="height: 521px;">
          <img
            class="w-100 object-fit-cover"
            src="/images/record.jpg"
            alt="agent"
          />
          <!-- top-left timer badge -->
          <div class="position-absolute top-0 start-0 m-3 badge-pill">
            <span class="dot"></span>
            24:01:45
          </div>

          <!-- top-right icons -->
          <div class="position-absolute top-0 end-0 m-3 d-flex gap-2">
            <button class="icon-btn"><i class="bi bi-arrows-fullscreen"></i></button>
          </div>

          <!-- right middle icon -->
          <div class="position-absolute top-50 end-0 translate-middle-y me-3">
            <button class="icon-btn"><i class="bi bi-sliders2-vertical"></i></button>
          </div>

          <!-- bottom-left role -->
          <div class="position-absolute bottom-0 start-0 m-3">
            <div class="role-chip">Админ</div>
          </div>
        </div>

        <!-- participants -->
        <div class="row g-3 mb-3">
          <div v-for="(p,i) in participants" :key="i" class="col-12 col-md-6 col-xl-3">
            <div class="rounded-3 overflow-hidden position-relative participant">
              <img :src="p.img" class="w-100 h-100 object-fit-cover" :alt="p.name">
              <div class="position-absolute bottom-0 start-0 end-0 p-2 d-flex align-items-center justify-content-between bg-gradient">
                <span class="small text-white-50">{{ p.name }}</span>
                <div class="d-flex gap-2">
                  <span class="icon-badge"><i class="bi bi-mic{{ p.muted ? '-mute' : '' }}"></i></span>
                  <span class="icon-badge"><i class="bi bi-record-fill"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- controls -->
        <div class="soft-inner rounded-4 py-3 px-2 px-md-4 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2 gap-md-3">
            <button class="circle-btn active"><i class="bi bi-mic-fill"></i></button>
            <button class="circle-btn"><i class="bi bi-camera-video"></i></button>
            <button class="circle-btn"><i class="bi bi-people"></i></button>
            <button class="circle-btn record"><i class="bi bi-record-circle"></i></button>
            <button class="circle-btn"><i class="bi bi-chat-dots"></i></button>
            <button class="circle-btn"><i class="bi bi-three-dots"></i></button>
          </div>

          <button class="btn btn-danger rounded-pill px-4 fw-semibold">
            Якунлаш
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive } from 'vue'

/* COUNTDOWN (default: 12 soat) */
const target = new Date()
target.setHours(target.getHours() + 12)

const left = reactive({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let t: number | undefined

function tick () {
  const now = new Date().getTime()
  const diff = Math.max(0, target.getTime() - now)

  left.days = Math.floor(diff / (1000 * 60 * 60 * 24))
  left.hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  left.minutes = Math.floor((diff / (1000 * 60)) % 60)
  left.seconds = Math.floor((diff / 1000) % 60)
}

function padLeft(n: number) {
  return n.toString().padStart(2, '0')
}

onMounted(() => {
  tick()
  t = window.setInterval(tick, 1000)
})
onBeforeUnmount(() => {
  if (t) window.clearInterval(t)
})

/* FORM */
const form = reactive({ name: '', phone: '' })
function submit() {
  // shu yerda real submit qilishingiz mumkin
  alert(`Qabul qilindi:\nIsm: ${form.name}\nTelefon: ${form.phone}`)
}

/* PARTICIPANTS MOCK */
const participants = [
  {
    name: 'Cassie Jung',
    img: '/images/call1.png',
    muted: true
  },
  {
    name: 'Alice Wong',
    img: '/images/call2.png',
    muted: false
  },
  {
    name: 'Theresa Webb',
    img: '/images/call3.png',
    muted: false
  },
  {
    name: 'Christian Wong',
    img: '/images/call4.png',
    muted: true
  }
]
</script>

<style scoped>
/* global soft look */
.soft-card{
}
.soft-inner{
}

/* promo ticker */
.promo-ticker{
  background:#ffc107;
  overflow:hidden;
  white-space:nowrap;
}
.promo-ticker .track{
  display:inline-block;
  padding-block:6px;
  animation: scroll 16s linear infinite;
}
@keyframes scroll{
  from{ transform: translateX(0); }
  to{ transform: translateX(-50%); }
}

/* timer */
.timer .time-block .digits{
  font-size: clamp(42px, 6vw, 82px);
  line-height: 1;
  font-weight: 800;
  color:#0b315a;
}
.timer .time-block .legend{
  font-size:.75rem;
  color:#6b7a99;
  letter-spacing:.12em;
  text-transform:uppercase;
  text-align:center;
  margin-top:.25rem;
}

/* video */
.main-video{ height: 420px; }
@media (max-width: 991.98px){
  .main-video{ height: 280px; }
}

.badge-pill{
  background: rgba(255,255,255,.85);
  padding:6px 12px;
  border-radius:20px;
  font-weight:600;
  display:flex; align-items:center; gap:8px;
}
.badge-pill .dot{
  width:8px; height:8px; background:#ef4444; border-radius:50%;
  box-shadow:0 0 0 3px rgba(239,68,68,.25);
}

.icon-btn{
  width:36px; height:36px; border-radius:10px;
  border:1px solid #e6ecf5; background:#fff;
  display:grid; place-items:center;
}

.role-chip{
  background: rgba(0,0,0,.35);
  color:#fff; padding:.35rem .6rem; border-radius:14px; font-size:.85rem;
}

.participant{ height: 140px; background:#eee; }
@media (max-width: 767.98px){ .participant{ height: 120px; } }

.bg-gradient{
  background: linear-gradient(transparent, rgba(0,0,0,.65));
}
.icon-badge{
  width:24px; height:24px; border-radius:50%;
  background: rgba(255,255,255,.9);
  display:grid; place-items:center; font-size:12px;
}

/* controls */
.circle-btn{
  width:44px; height:44px; border-radius:50%;
  border:1px solid #e6ecf5; background:#fff;
  display:grid; place-items:center;
}
.circle-btn.active{ background:#eaf1ff; border-color:#d9e4ff; }
.circle-btn.record{ background:#ffecec; border-color:#ffd2d2; }

</style>
