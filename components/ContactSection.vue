<template>
  <section id="contact" class="contact-page pt-5">
    <!-- top promo ticker -->
    <div class="promo-ticker text-dark fw-bold">
      <div class="track">
        <span v-for="n in 8" :key="n"
          >-50% ЧЕГИРМАГА ЭГА БЎЛИНГ&nbsp;&nbsp;</span
        >
      </div>
    </div>

    <div class="container">
      <!-- COUNTDOWN + FORM -->
      <div
        class="soft-card position-relative border-2 border-primary rounded-4"
      >
        <div class="row g-4 align-items-center justify-content-center">
          <!-- timer -->
          <div class="col-lg-12">
            <div class="timer soft-inner px-3 py-2 py-md-3 rounded-3">
              <div
                class="d-flex align-items-end justify-content-center gap-4 gap-md-5"
              >
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
          </div>

          <!-- form -->
          <div class="col-lg-6">
            <p class="mb-5" style="max-width: 432px; color: #01101E; font-size: 18px; margin-top: -2rem">
              Асабингизни табиий экстрактлар орқали тузатиб шифо топинг. Ўзингиз
              ва яқинларингиз соғлигига бефарқ бўлманг
            </p>
          </div>
          <div class="col-lg-6">
            <div class="soft-inner p-3 rounded-3">
              <div class="mb-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Исмиңиз"
                  v-model="form.name"
                  style="color: #003262 !important; border: 1px solid #B3C8D8;"
                />
              </div>
              <div class="mb-4">
                <input
                  type="tel"
                  class="form-control"
                  placeholder="+998"
                  v-model="form.phone"
                  style="color: #003262 !important; border: 1px solid #B3C8D8;"
                />
              </div>
              <button
                class="btn w-100 py-2 d-flex align-items-center justify-content-center gap-2" 
                @click="submit" style="background: #0000FF; color: #FDFEFF"
              >
                Биз билан боғланиш
                <i class="bi bi-telephone"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive } from "vue";

/* COUNTDOWN (default: 12 soat) */
const target = new Date();
target.setHours(target.getHours() + 12);

const left = reactive({ days: 0, hours: 0, minutes: 0, seconds: 0 });
let t: number | undefined;

function tick() {
  const now = new Date().getTime();
  const diff = Math.max(0, target.getTime() - now);

  left.days = Math.floor(diff / (1000 * 60 * 60 * 24));
  left.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  left.minutes = Math.floor((diff / (1000 * 60)) % 60);
  left.seconds = Math.floor((diff / 1000) % 60);
}

function padLeft(n: number) {
  return n.toString().padStart(2, "0");
}

onMounted(() => {
  tick();
  t = window.setInterval(tick, 1000);
});
onBeforeUnmount(() => {
  if (t) window.clearInterval(t);
});

/* FORM */
const form = reactive({ name: "", phone: "" });
function submit() {
  // shu yerda real submit qilishingiz mumkin
  alert(`Qabul qilindi:\nIsm: ${form.name}\nTelefon: ${form.phone}`);
}

/* PARTICIPANTS MOCK */
const participants = [
  {
    name: "Cassie Jung",
    img: "/images/call1.png",
    muted: true,
  },
  {
    name: "Alice Wong",
    img: "/images/call2.png",
    muted: false,
  },
  {
    name: "Theresa Webb",
    img: "/images/call3.png",
    muted: false,
  },
  {
    name: "Christian Wong",
    img: "/images/call4.png",
    muted: true,
  },
];
</script>

<style scoped>
/* global soft look */
.soft-card {
}
.soft-inner {
}

/* promo ticker */
.promo-ticker {
  background: #ffc107;
  overflow: hidden;
  white-space: nowrap;
}
.promo-ticker .track {
  display: inline-block;
  padding-block: 6px;
  animation: scroll 16s linear infinite;
}
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* timer */
.timer .time-block .digits {
  font-size: 109px;
  line-height: 1;
  font-weight: 500;
  color: #003262;
}
.timer .time-block .legend {
  font-size: 0.75rem;
  color: #6b7a99;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  margin-top: 0.25rem;
}

/* video */
.main-video {
  height: 420px;
}
@media (max-width: 991.98px) {
  .main-video {
    height: 280px;
  }
}

.badge-pill {
  background: rgba(255, 255, 255, 0.85);
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}
.badge-pill .dot {
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.25);
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #e6ecf5;
  background: #fff;
  display: grid;
  place-items: center;
}

.role-chip {
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  padding: 0.35rem 0.6rem;
  border-radius: 14px;
  font-size: 0.85rem;
}

.participant {
  height: 140px;
  background: #eee;
}
@media (max-width: 767.98px) {
  .participant {
    height: 120px;
  }
}

.bg-gradient {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.65));
}
.icon-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  display: grid;
  place-items: center;
  font-size: 12px;
}

/* controls */
.circle-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #e6ecf5;
  background: #fff;
  display: grid;
  place-items: center;
}
.circle-btn.active {
  background: #eaf1ff;
  border-color: #d9e4ff;
}
.circle-btn.record {
  background: #ffecec;
  border-color: #ffd2d2;
}
</style>
