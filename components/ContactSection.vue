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

    <div class="classformargin">
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

          <!-- lead text + form -->
          <div class="col-lg-4">
            <p
              class="mb-5 timer-text"
              style="
                max-width: 432px;
                color: #01101e;
                font-size: 18px;
                margin-top: -2rem;
              "
            >
              Асабингизни табиий экстрактлар орқали тузатиб шифо топинг. Ўзингиз
              ва яқинларингиз соғлигига бефарқ бўлманг
            </p>
          </div>

          <div class="col-lg-4">
            <div class="soft-inner p-3 rounded-3">
              <div class="mb-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Исмингиз"
                  v-model="form.name"
                  style="color: #003262 !important; border: 1px solid #b3c8d8"
                />
              </div>
              <div class="mb-4">
                <input
                  type="tel"
                  class="form-control"
                  placeholder="+998"
                  v-model="form.phone"
                  style="color: #003262 !important; border: 1px solid #b3c8d8"
                />
              </div>
              <button
                class="btn w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                @click="submit"
                style="background: #0000ff; color: #fdfeff"
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
import { onMounted, onBeforeUnmount, reactive, ref } from "vue";

/* ===== COUNTDOWN: Random 1h–2h per session ===== */
const SESSION_KEY_DEADLINE = "nevro_countdown_deadline_v2";
const MIN_MS = 1 * 60 * 60 * 1000; // 1 soat
const MAX_MS = 2 * 60 * 60 * 1000; // 2 soat

const left = reactive({ days: 0, hours: 0, minutes: 0, seconds: 0 });
const deadlineMs = ref<number>(0);
let intervalId: number | undefined;

function randomDurationMs() {
  // [1h .. 2h] diapazonda tasodifiy
  return Math.floor(MIN_MS + Math.random() * (MAX_MS - MIN_MS));
}

/** Sessiya uchun deadline’ni o‘rnatish yoki sessionStorage’dan olish */
function initDeadline() {
  const now = Date.now();
  const saved = sessionStorage.getItem(SESSION_KEY_DEADLINE);
  const parsed = saved ? parseInt(saved, 10) : NaN;

  if (!Number.isFinite(parsed) || parsed <= now) {
    // Yangi sessiya yoki tugagan — 1..2 soatdan random beramiz
    deadlineMs.value = now + randomDurationMs();
    sessionStorage.setItem(SESSION_KEY_DEADLINE, String(deadlineMs.value));
  } else {
    deadlineMs.value = parsed;
  }
}

/** Har 1 soniyada yangilash */
function tick() {
  const now = Date.now();
  let diff = deadlineMs.value - now;

  if (diff <= 0) {
    // Nolga yetganda yana 1..2 soat random bilan qayta start
    deadlineMs.value = now + randomDurationMs();
    sessionStorage.setItem(SESSION_KEY_DEADLINE, String(deadlineMs.value));
    diff = deadlineMs.value - now;
  }

  left.days = Math.floor(diff / 86400000);
  left.hours = Math.floor((diff % 86400000) / 3600000);
  left.minutes = Math.floor((diff % 3600000) / 60000);
  left.seconds = Math.floor((diff % 60000) / 1000);
}

function padLeft(n: number) {
  return n.toString().padStart(2, "0");
}

onMounted(() => {
  initDeadline();
  tick();
  intervalId = window.setInterval(tick, 1000);
});

onBeforeUnmount(() => {
  if (intervalId) window.clearInterval(intervalId);
});

/* ===== FORM (demo) ===== */
const form = reactive({ name: "", phone: "" });
function submit() {
  alert(`Qabul qilindi:\nIsm: ${form.name}\nTelefon: ${form.phone}`);
}

/* (ixtiyoriy) Mock participants */
const participants = [
  { name: "Cassie Jung", img: "/images/call1.webp", muted: true },
  { name: "Alice Wong", img: "/images/call2.webp", muted: false },
  { name: "Theresa Webb", img: "/images/call3.webp", muted: false },
  { name: "Christian Wong", img: "/images/call4.webp", muted: true },
];
</script>

<style scoped>
:host {
  --c-primary: #0000ff;
  --c-text: #01101e;
  --c-accent: #003262;
  --c-border: #b3c8d8;
  --c-soft-bg: #f4f8ff;
  --c-card: #ffffff;
}

/* ---- Promo ticker ---- */
.promo-ticker {
  background: #ffc107;
  color: #111827;
  overflow: hidden;
  white-space: nowrap;
}
.promo-ticker .track {
  display: inline-block;
  padding-block: 6px;
  animation: scroll 16s linear infinite;
  will-change: transform;
}
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* ---- Cardlar ---- */
.soft-card {
  background: var(--c-soft-bg);
  border-radius: 24px;
}
.soft-inner {
  background: var(--c-card);
  border-radius: 16px;
}

/* ---- Timer ---- */
.timer {
  padding-block: 0.75rem;
}
.timer .time-block {
  text-align: center;
}
.timer .time-block .digits {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-weight: 500;
  line-height: 1;
  color: var(--c-accent);
  font-size: clamp(40px, 9vw, 109px);
}
.timer .time-block .legend {
  font-size: 0.75rem;
  color: #6b7a99;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 0.25rem;
}

/* ---- Lead matn ---- */
.timer-text {
  max-width: 432px;
  color: var(--c-text);
  font-size: clamp(16px, 1.6vw, 18px);
  margin-top: -2rem;
}

/* ---- Form ---- */
.contact-page .form-control {
  color: var(--c-accent);
  border: 1px solid var(--c-border);
  padding: 0.8rem 0.9rem;
  border-radius: 12px;
}
.contact-page .form-control::placeholder {
  color: #7a96ad;
}
.contact-page .form-control:focus {
  border-color: var(--c-primary);
  box-shadow: 0 0 0 0.2rem rgba(0, 0, 255, 0.12);
}

/* ---- Submit tugma ---- */
.contact-page .btn {
  background: var(--c-primary);
  color: #fdfeff;
  border-radius: 12px;
  font-weight: 600;
}
.contact-page .btn:hover {
  filter: brightness(0.95);
}
.contact-page .btn:active {
  transform: translateY(1px);
}

/* ---- Responsive ---- */
@media (max-width: 992px) {
  .timer-text {
    margin-top: 0;
    max-width: none;
  }
}
@media (max-width: 600px) {
  .timer .time-block .digits {
    font-size: 56px;
  }
  .soft-inner {
    padding: 0;
  }
  .timer-text {
    margin-top: 2rem !important;
  }
}
</style>
