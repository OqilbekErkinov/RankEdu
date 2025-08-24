<template>
  <section
    id="about"
    class="about-wrap pb-5 position-relative"
    ref="sectionRef"
  >
    <IconsAboutDna />

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
                <NuxtImg
                  loading="lazy"
                  src="/images/ginkgo.webp"
                  alt="Гинкго билоба"
                />
              </div>
              <div class="text">
                <h3 class="item-title">Гинкго билоба</h3>
                <p class="item-desc">
                  Қон айланишини яхшилайди ва қон томирларда тиқилмаларни очиб
                  беради.
                </p>
              </div>
            </div>

            <div class="extract-item reveal-left">
              <div class="thumb">
                <NuxtImg
                  loading="lazy"
                  src="/images/blackroot.webp"
                  alt="Қора андиз"
                />
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
                <NuxtImg loading="lazy" src="/images/mumie.webp" alt="Мумийё" />
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
                <NuxtImg
                  loading="lazy"
                  src="/images/valeriana.webp"
                  alt="Валериана"
                />
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
                <NuxtImg
                  loading="lazy"
                  src="/images/ginger.webp"
                  alt="Занжабил"
                />
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
                <NuxtImg
                  loading="lazy"
                  src="/images/cinnamon.webp"
                  alt="Долчин"
                />
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

    <!-- fon bezak -->
    <svg
      class="aboutdna2"
      width="396"
      height="206"
      viewBox="0 0 396 206"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 205.04C1 205.04 71.5 184.74 86.5 124.74C92.1 102.44 115.6 25.1402 148.3 43.6402C180.9 62.1402 192.3 124.74 223.2 100.14C254.1 75.4402 270.8 -4.85986 300.8 1.34014C330.8 7.54014 348.4 81.5402 371.4 85.9402C394.3 90.4402 412.8 54.2402 412.8 54.2402"
        stroke="#5D8AA8"
        stroke-opacity="0.15"
        stroke-width="2"
        stroke-miterlimit="10"
      />
      <path
        d="M1.5 191.04C1.5 191.04 103.9 197.94 134.3 154.24C170 102.84 176.7 -5.45981 208 16.9402C239.2 39.2402 268.3 141.94 308.4 129.64C348.6 117.34 394.4 2.44019 394.4 2.44019"
        stroke="#5D8AA8"
        stroke-opacity="0.15"
        stroke-width="2"
        stroke-miterlimit="10"
      />
    </svg>

    <!-- ===== CERT SECTION ===== -->
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
              <!-- Har ikki rasm ham kliklanadi va fullscreen modal ochadi -->
              <NuxtImg
                loading="lazy"
                class="doc doc-bg doc-1 pointer"
                :src="certs[(certIndex + 1) % certs.length]"
                alt="certificate bg"
                draggable="false"
                @click="
                  openImageFullscreen(certs[(certIndex + 1) % certs.length])
                "
              />
              <NuxtImg
                loading="lazy"
                class="doc doc-fg doc-2 pointer"
                :src="certs[certIndex]"
                alt="certificate"
                draggable="false"
                @click="openImageFullscreen(certs[certIndex])"
              />

              <!-- ichki prev/next -->
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
                    d="M12 2.63965C6.477 2.63965 2 7.1168 2 12.6396C2 18.1625 6.477 22.6396 12 22.6396C17.5228 22.6396 22 18.1625 22 12.6396C22 7.1168 17.5228 2.63965 12 2.63965Z"
                    stroke="#0070FF"
                    stroke-width="2"
                  />
                  <path
                    d="M13.5 16.64C13.5 16.64 10.5 13.694 10.5 12.64C10.5 11.586 13.5 8.63989 13.5 8.63989"
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- === Image fullscreen modal (gallery’dagi kabi) === -->
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
            <NuxtImg
              loading="lazy"
              v-if="currentImg"
              :src="currentImg"
              class="img-fs"
              alt="certificate preview"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import IconsAboutDna from "~/components/Icons/AboutDna.vue";

/* ====== Slider images ====== */
const certs = ["/images/cert1.webp", "/images/cert2.webp"];
const certIndex = ref(0);
const nextCert = () => (certIndex.value = (certIndex.value + 1) % certs.length);
const prevCert = () =>
  (certIndex.value = (certIndex.value - 1 + certs.length) % certs.length);

/* ====== Image fullscreen (gallery bilan bir xil mantiq) ====== */
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
    // Fallback
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

  // 1) Reveal (chap/o‘ng)
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

  // 2) Typing — faqat bir marta
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

onBeforeUnmount(() => {
  document.removeEventListener("keydown", escClose);
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
  padding: 30px 0;
  position: relative;
}
.extracts-head {
  padding: 0.5rem 1rem 1rem;
}
.extracts-grid {
  padding: 10px 8px;
}

.aboutdna,
.aboutdna2 {
  position: absolute;
}
.aboutdna {
  margin-top: -3rem;
}
.aboutdna2 {
  margin-top: -6rem;
  right: 0;
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

/* ====== CERT ====== */
.cert-box {
  border: 2px solid var(--border);
  border-radius: 14px;
  background: #f4f7ff;
}

/* Timeline */
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

/* CERT stage */
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
.pointer {
  cursor: zoom-in;
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

/* === Fullscreen image modal (gallery uslubi) === */
.img-fs {
  max-width: 100%;
  max-height: 100vh;
  object-fit: contain;
}
#imgFullscreen .modal-content {
  position: relative;
}
.fs-close {
  position: absolute;
  top: 12px;
  right: 7rem;
  z-index: 2;
  filter: invert(1);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 24px;
  }
  .extracts-box {
    padding: 20px 12px 8px;
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
    left: 0;
  }
  .nav.in.right {
    right: 0;
  }
  .dot-pg {
    width: 28px;
  }
  .dot-pg.active {
    width: 44px;
  }
}

/* ====== Scroll reveal ====== */
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

@media (prefers-reduced-motion: reduce) {
  .reveal-left,
  .reveal-right {
    transition: opacity 0.1s ease;
    transform: none !important;
  }
}
</style>
