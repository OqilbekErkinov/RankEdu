<!-- components/AboutSection.vue -->
<template>
  <section
    id="about"
    class="about-wrap pb-5 position-relative"
    ref="sectionRef"
  >
    <div class="classformargin mb-5">
      <div class="extracts-box mx-auto">
        <div class="extracts-head text-center">
          <h2 class="display-title section-title mb-0">
            <span class="duo"
              >Маҳсулот таркибидаги “Экстракт”ларнинг организмга фойдалари</span
            >
          </h2>
        </div>

        <div class="row g-3 extracts-grid">
          <!-- chap ustun -->
          <div class="col-12 col-lg-6">
            <div class="extract-item reveal-left">
              <div class="thumb">
                <img src="/images/ginkgo.webp" alt="Гинкго билоба" />
              </div>
              <div class="text">
                <h5 class="item-title">Гинкго билоба</h5>
                <p class="item-desc">
                  Қон айланишини яхшилайди ва қон томирларда тиқилмаларни очиб
                  беради.
                </p>
              </div>
            </div>

            <div class="extract-item reveal-left">
              <div class="thumb">
                <img src="/images/blackroot.webp" alt="Қора андиз" />
              </div>
              <div class="text">
                <h5 class="item-title">Қора андиз</h5>
                <p class="item-desc">
                  Қонни суюлтирувчи, мияда қон айланишини яхшилаб беради.
                </p>
              </div>
            </div>

            <div class="extract-item mb-0 reveal-left">
              <div class="thumb">
                <img src="/images/mumie.webp" alt="Мумийё" />
              </div>
              <div class="text">
                <h5 class="item-title">Мумийё</h5>
                <p class="item-desc">
                  Суякларни мустаҳкамлаб беради, эрта қаришни олдини олади.
                </p>
              </div>
            </div>
          </div>

          <!-- o‘ng ustun -->
          <div class="col-12 col-lg-6">
            <div class="extract-item reveal-right">
              <div class="thumb">
                <img src="/images/valeriana.webp" alt="Валериана" />
              </div>
              <div class="text">
                <h5 class="item-title">Валериана</h5>
                <p class="item-desc">
                  Стрессни енгиллаштириб, дам олишга ёрдам беради ва уйқу сифати
                  ни яхшилайди.
                </p>
              </div>
            </div>

            <div class="extract-item reveal-right">
              <div class="thumb">
                <img src="/images/ginger.webp" alt="Занжабил" />
              </div>
              <div class="text">
                <h5 class="item-title">Занжабил</h5>
                <p class="item-desc">
                  Занжабил таркибидаги моддалар иммунитет тизимини
                  мустаҳкамлайди.
                </p>
              </div>
            </div>

            <div class="extract-item mb-0 reveal-right">
              <div class="thumb">
                <img src="/images/cinnamon.webp" alt="Долчин" />
              </div>
              <div class="text">
                <h5 class="item-title">Долчин</h5>
                <p class="item-desc">
                  Суяклар соғлигини ва қон босимини яхшилайди, инфекцияларда
                  ёрдам беради.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="extracts-foot"></div>
      </div>
    </div>

    <!-- ============ 2) Сертификатланган sahnasi ============ -->
    <div class="classformargin">
      <div class="cert-box mx-auto">
        <div class="row align-items-center g-4">
          <!-- chap: timeline (typing) -->
          <div class="col-12 col-lg-5">
            <h3 class="section-title mb-4">Сертификатланган</h3>

            <ul class="timeline list-unstyled" ref="timelineRef">
              <li class="titem">
                <div class="dot"></div>
                <div>
                  <div class="t-title">4 йилдан бери</div>
                  <div class="t-desc">
                    Халқимиз томонидан севиб истеъмол қилинади.
                  </div>
                </div>
              </li>

              <li class="titem">
                <div class="dot"></div>
                <div>
                  <div class="t-title">1000+</div>
                  <div class="t-desc">Натижа кўрган беморларимиз</div>
                </div>
              </li>

              <li class="titem">
                <div class="dot"></div>
                <div>
                  <div class="t-title">Органик</div>
                  <div class="t-desc">
                    ГМО қўшимчалари ва бўёқлар қўшилмаган
                  </div>
                </div>
              </li>

              <li class="titem">
                <div class="dot"></div>
                <div>
                  <div class="t-title">Етказиб бериш</div>
                  <div class="t-desc">
                    Ўзбекистон бўйлаб етказиб бериш хизмати мутлақо бепул
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- o‘ng: sahna/slider -->
          <div class="col-12 col-lg-7">
            <div class="cert-stage">
              <img
                class="doc doc-bg doc-1"
                :src="certs[(certIndex + 1) % certs.length]"
                alt="certificate bg"
                draggable="false"
              />
              <img
                class="doc doc-fg doc-2"
                :src="certs[certIndex]"
                alt="certificate"
                draggable="false"
              />

              <button
                class="nav in left ps-2"
                @click="prevCert"
                aria-label="Prev"
              >
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.63965C6.47715 2.63965 2 7.1168 2 12.6396C2 18.1625 6.47715 22.6396 12 22.6396C17.5228 22.6396 22 18.1625 22 12.6396C22 7.1168 17.5228 2.63965 12 2.63965Z"
                    stroke="#0070FF"
                    stroke-width="2"
                  />
                  <path
                    d="M13.4999 16.6399C13.4999 16.6399 10.4999 13.6939 10.4999 12.6399C10.4999 11.5858 13.4999 8.63989 13.4999 8.63989"
                    stroke="#0070FF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button
                class="nav in right ps-2"
                @click="nextCert"
                aria-label="Next"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.7816 22.6396C18.3045 22.6396 22.7816 18.1625 22.7816 12.6396C22.7816 7.1168 18.3045 2.63965 12.7816 2.63965C7.25877 2.63965 2.78162 7.1168 2.78162 12.6396C2.78162 18.1625 7.25877 22.6396 12.7816 22.6396Z"
                    stroke="#0070FF"
                    stroke-width="2"
                  />
                  <path
                    d="M11.2815 8.63989C11.2815 8.63989 14.2815 11.5859 14.2815 12.6399C14.2815 13.694 11.2815 16.6399 11.2815 16.6399"
                    stroke="#0070FF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              <div class="pager">
                <span
                  v-for="(c, i) in certs"
                  :key="c"
                  class="dot-pg"
                  :class="{ active: i === certIndex }"
                  @click="certIndex = i"
                />
              </div>

              <button
                class="zoom"
                @click="openZoom(certs[certIndex])"
                aria-label="Zoom"
              >
                <svg
                  class="zoom-icon"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.98031 22.0198C9.21391 21.2534 9.34131 17.9975 9.34131 17.9975M9.98031 22.0198C10.7467 22.7862 14.0026 22.6586 14.0026 22.6586M9.98031 22.0198L14.6667 17.3333M22.0199 9.98008C21.2535 9.21367 17.9976 9.3412 17.9976 9.3412M22.0199 9.98008C22.7863 10.7465 22.6587 14.0023 22.6587 14.0023M22.0199 9.98008L17.3334 14.6666"
                    stroke="#0070FF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3.33337 15.9999C3.33337 10.0288 3.33337 7.04324 5.18836 5.18824C7.04336 3.33325 10.0289 3.33325 16 3.33325C21.9711 3.33325 24.9567 3.33325 26.8118 5.18824C28.6667 7.04324 28.6667 10.0288 28.6667 15.9999C28.6667 21.971 28.6667 24.9566 26.8118 26.8117C24.9567 28.6666 21.9711 28.6666 16 28.6666C10.0289 28.6666 7.04336 28.6666 5.18836 26.8117C3.33337 24.9566 3.33337 21.971 3.33337 15.9999Z"
                    stroke="#0070FF"
                    stroke-width="2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Zoom modal -->
    <div v-if="zoomSrc" class="zoom-backdrop" @click="zoomSrc = null">
      <img :src="zoomSrc" class="zoom-img" alt="certificate large" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

/* ====== Slider images ====== */
const certs = ["/images/cert1.webp", "/images/cert2.webp"];
const certIndex = ref(0);
const nextCert = () => (certIndex.value = (certIndex.value + 1) % certs.length);
const prevCert = () =>
  (certIndex.value = (certIndex.value - 1 + certs.length) % certs.length);

/* ====== Zoom ====== */
const zoomSrc = ref<string | null>(null);
const openZoom = (src: string) => (zoomSrc.value = src);

/* ====== Scroll animations ====== */
const sectionRef = ref<HTMLElement | null>(null);
const timelineRef = ref<HTMLElement | null>(null);
const typedOnce = ref(false);

function typeOne(el: HTMLElement, cps = 18) {
  return new Promise<void>((resolve) => {
    const full = (el.getAttribute("data-full") ?? el.textContent ?? "").trim();
    el.setAttribute("data-full", full);
    el.textContent = "";
    let i = 0;
    const period = Math.max(15, Math.round(1000 / cps));
    const timer = window.setInterval(() => {
      // caret effekt
      el.textContent =
        full.slice(0, i) + (i < full.length ? (i % 2 ? "|" : " ") : "");
      i++;
      if (i > full.length) {
        window.clearInterval(timer);
        el.textContent = full;
        resolve();
      }
    }, period);
  });
}

async function runTyping() {
  if (!timelineRef.value) return;
  const items = Array.from(
    timelineRef.value.querySelectorAll<HTMLElement>(".titem")
  );
  for (const li of items) {
    const title = li.querySelector<HTMLElement>(".t-title");
    const desc = li.querySelector<HTMLElement>(".t-desc");
    if (title) await typeOne(title, 16);
    if (desc) await typeOne(desc, 22);
  }
}

onMounted(() => {
  const root = sectionRef.value;
  if (!root) return;

  // 1) Reveal (chap/o‘ng) — extract kartalari
  const revealEls = Array.from(
    root.querySelectorAll<HTMLElement>(".reveal-left, .reveal-right")
  );
  const ioReveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("in");
          ioReveal.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealEls.forEach((el) => ioReveal.observe(el));

  // 2) Typing — timeline faqat bir marta
  if (timelineRef.value) {
    const ioType = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !typedOnce.value) {
          typedOnce.value = true;
          runTyping();
          ioType.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    ioType.observe(timelineRef.value);
  }
});
</script>

<style scoped>
:root {
  --ink: #10305a;
  --muted: #5b6b8b;
  --border: #2a66a3;
  --soft: #eef4ff;
  --brand: #0b5fff;
}

/* umumiy fon */
.about-wrap {
  background: #f4f7ff;
}

/* SECTION TITLES */
.section-title {
  color: #003262;
  font-weight: 500;
  line-height: 1.2;
  font-size: 40px;
  max-width: 999px;
  margin: auto;
}

/* ====== EXTRACTS ====== */
.extracts-box {
  border: 2px solid var(--border);
  border-radius: 14px;
  background: #f4f7ff;
  padding: 30px 0;
  position: relative;
}
.extracts-head {
  padding: 0.5rem 1rem 1rem;
}
.extracts-grid {
  padding: 10px 8px;
}

.extract-item {
  display: flex;
  gap: 14px;
  align-items: center;
  background: #fdfeff;
  border: 1px solid #e4eeff;
  border-radius: 14px;
  padding: 8px;
  margin-bottom: 14px;
  transition: transform 0.35s ease, background 0.35s ease, opacity 0.35s ease;
}
.extract-item:hover {
  background: #e8efff;
  transform: translateY(-5px);
}
.thumb {
  flex: 0 0 140px;
  background: var(--soft);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 110px;
}
.thumb img {
  max-height: 110px;
  width: auto;
}
.text {
  flex: 1;
}
.item-title {
  color: #003262;
  font-weight: 500;
  margin-bottom: 0.25rem;
  font-size: 22px;
}
.item-desc {
  color: #01101e;
  margin: 0;
  font-size: 16px;
}
.extracts-foot {
  height: 10px;
  margin: 6px 6px 0;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

/* ====== CERTIFIED (container) ====== */
.cert-box {
  border: 2px solid var(--border);
  border-radius: 14px;
  background: #f4f7ff;
}

/* Timeline bullets */
.timeline {
  position: relative;
  margin: 0;
  padding-left: 22px;
}
.timeline::before {
  content: "";
  position: absolute;
  left: 7px;
  top: 4px;
  bottom: 4px;
  width: 2px;
  background: #b9d2f3;
}
.titem {
  display: flex;
  gap: 12px;
  margin-bottom: 4.5rem;
  position: relative;
}
.titem:last-child {
  margin-bottom: 0;
}
.dot {
  position: absolute;
  left: -2px;
  top: 12px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #7eacde;
}
.t-title {
  color: #003262;
  font-weight: 500;
  font-size: 28px;
  line-height: 1.2;
}
.t-desc {
  color: #003262;
  font-size: 16px;
}
.t-title,
.t-desc {
  margin-left: 1.5rem;
}

/* === CERT stage === */
.cert-stage {
  position: relative;
  border-radius: 16px;
  padding: 18px 18px 42px;
  overflow: hidden;
  min-height: 620px;
}
.doc {
  width: 58%;
  height: auto;
  display: block;
  position: absolute;
  left: 60%;
  top: 6%;
  transform-origin: center;
  user-select: none;
}
.doc-bg {
  transform: translateX(-50%) rotate(-2deg);
  opacity: 0.75;
  width: 53%;
  top: 10%;
}
.doc-fg {
  transform: translateX(-50%) rotate(0deg);
  border-radius: 10px;
}
.doc-1 {
  left: 40%;
}

/* inner navs */
.nav.in {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 43px;
  height: 36px;
  border-radius: 50%;
  border: none;
  color: #0070ff;
  display: grid;
  place-items: center;
  font-size: 22px;
  z-index: 3;
  padding-bottom: 2.5rem !important;
  background: transparent;
}
.nav.in.left {
  left: 50px;
}
.nav.in.right {
  right: 50px;
}

/* pager */
.pager {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 3;
}
.dot-pg {
  width: 36px;
  height: 6px;
  background: #cfe0fb;
  border-radius: 999px;
  transition: all 0.25s ease;
  cursor: pointer;
}
.dot-pg.active {
  width: 60px;
  background: #7fb0ff;
}

/* zoom button */
.zoom {
  position: absolute;
  right: 52px;
  bottom: 10px;
  border: 0;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  color: #0070ff;
  background: transparent;
}

/* zoom modal */
.zoom-backdrop {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 1055;
}
.zoom-img {
  max-width: 92vw;
  max-height: 92vh;
  border-radius: 12px;
}

/* ====== Scroll reveal (chap/o‘ng) ====== */
.reveal-left,
.reveal-right {
  opacity: 0;
  transform: translateX(var(--dx, 0));
}
.reveal-left {
  --dx: -40px;
}
.reveal-right {
  --dx: 40px;
}
.reveal-left.in,
.reveal-right.in {
  opacity: 1;
  transform: translateX(0);
  transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.7s;
}

/* Reduce motion: typing caret o‘rniga oddiy fade */
@media (prefers-reduced-motion: reduce) {
  .reveal-left,
  .reveal-right {
    transition: opacity 0.1s ease;
    transform: none !important;
  }
}

/* ====== RESPONSIVE ====== */
@media (max-width: 767.98px) {
  .extracts-box {
    padding: 20px 12px 8px;
  }
}
@media (max-width: 600px) {
  .section-title {
    font-size: 24px;
  }
  .extracts-box {
    padding: 0;
  }
  .extracts-grid {
    padding: 0;
  }
  .item-title {
    font-size: 16px;
  }
  .item-desc {
    font-size: 12px;
  }
  .extract-item {
    border-radius: 8px;
  }
  .titem {
    margin-bottom: 2.5rem;
  }
  .t-title {
    font-size: 18px;
  }
  .t-desc {
    font-size: 14px;
  }
  .cert-box {
    padding: 0;
  }
  .cert-stage {
    min-height: 500px;
    padding: 12px 12px 38px;
  }
  .doc {
    width: 78%;
    top: 8%;
  }
  .doc-bg {
    width: 74%;
  }
  .nav.in {
    width: 40px;
    height: 15px;
    font-size: 20px;
    font-weight: 800;
  }
  .nav.in.left {
    left: 0px;
  }
  .nav.in.right {
    right: 0px;
  }
  .zoom {
    right: 33px;
    bottom: 6.5rem;
  }
  .zoom-icon {
    width: 25px;
    height: 25px;
  }
  .dot-pg {
    width: 28px;
  }
  .dot-pg.active {
    width: 44px;
  }
}
</style>
