<!-- components/HeroSection.vue -->
<template>
  <section id="hero" class="hero position-relative overflow-hidden pb-5">
    <!-- dekor nuqtalar -->
    <div class="dots dots-left"></div>
    <div class="dots dots-right"></div>

    <div class="container hero-inner text-center position-relative">
      <!-- Chapdagi kichik bubble'lar -->
      <div class="mt-4">
        <div class="bubble bubble-1 d-none d-md-flex">
          <span>Асабларни тинчлантиришга</span>
        </div>
        <div class="bubble bubble-2 d-none d-lg-flex align-items-center gap-2">
          <span>Шифокор маслаҳатига биноан қабул...</span>
          <img
            src="/images/avatar1.png"
            alt="user"
            class="rounded-circle"
            width="28"
            height="28"
          />
        </div>
      </div>

      <!-- O'ngdagi suzuvchi kartalar -->
            <div
        class="float-card card-100 d-none d-lg-flex flex-column align-items-center"
      >
        <div style="display: flex;"><small class="text-muted me-4" style="color: #003262 !important">Табиий...</small>
        <span class="close-x">×</span></div>
        <div class="ring">100%</div>
        <small class="mt-3" style="color: #003262">таркиби</small>
      </div>
      <div
        class="float-card card-dna d-none d-md-flex flex-column align-items-center"
      >
        <div style="display: flex; margin-top: 0.3rem"><small class="text-muted me-4" style="color: #003262 !important">Табиий...</small>
        <span class="close-x">×</span></div>
        <div class="dna">✣✣✣</div>
        <small class="mt-5" style="color: #003262">таркиби</small>
      </div>

      <!-- Headline -->
      <h1 class="display-title mx-auto">
        Асаб касалликларига<br />
        <span class="text-gradient">табобий</span> ва
        <span class="text-gradient">табиий</span> ечим
      </h1>
      <p class="lead-sub mx-auto">
        Энг илғор ва таъсирли формулани маҳсулотимиз билан сезинг. Ўзингизни яхш
        ҳис қилиб, ҳаётингизни қайтадан тўлдиринг!
      </p>

      <!-- CTA -->
      <button
        class="btn btn-cta mt-2"
        data-bs-toggle="modal"
        data-bs-target="#orderModal"
      >
        Биз билан боғланиш
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.6585 3.71223L7.25584 2.80625C6.99256 2.21388 6.86092 1.91768 6.66405 1.69101C6.41732 1.40694 6.09571 1.19794 5.73592 1.08785C5.44883 1 5.1247 1 4.47645 1C3.52815 1 3.054 1 2.65597 1.18229C2.18711 1.39702 1.76368 1.86328 1.59497 2.3506C1.45175 2.76429 1.49278 3.18943 1.57482 4.0397C2.44815 13.0902 7.41006 18.0521 16.4605 18.9254C17.3108 19.0075 17.736 19.0485 18.1496 18.9053C18.637 18.7366 19.1032 18.3131 19.318 17.8443C19.5002 17.4462 19.5002 16.9721 19.5002 16.0238C19.5002 15.3755 19.5002 15.0514 19.4124 14.7643C19.3023 14.4045 19.0933 14.0829 18.8092 13.8362C18.5826 13.6393 18.2864 13.5077 17.694 13.2444L16.788 12.8417C16.1465 12.5566 15.8257 12.4141 15.4998 12.3831C15.1878 12.3534 14.8733 12.3972 14.5813 12.5109C14.2762 12.6297 14.0066 12.8544 13.4672 13.3038C12.9304 13.7512 12.662 13.9749 12.334 14.0947C12.0432 14.2009 11.6588 14.2403 11.3526 14.1951C11.0071 14.1442 10.7426 14.0029 10.2135 13.7201C8.5675 12.8405 7.65977 11.9328 6.78011 10.2867C6.49738 9.7577 6.35602 9.4931 6.30511 9.1477C6.25998 8.8414 6.29932 8.457 6.40554 8.1663C6.52536 7.83828 6.74905 7.56986 7.19643 7.033C7.64586 6.49368 7.87058 6.22402 7.98939 5.91891C8.10309 5.62694 8.14686 5.3124 8.11719 5.00048C8.08618 4.67452 7.94362 4.35376 7.6585 3.71223Z"
            stroke="#FDFEFF"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <!-- Bitta kompozit rasm (ayol + dorilar + yozuvlar) -->
      <figure class="hero-picture mx-auto">
        <img
          src="/images/hero-composite.png"
          alt="Nevroslim hero"
          class="hero-picture__img"
          loading="eager"
        />
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
// presentational only
</script>

<style scoped>
:root {
  --brand: #0000ff;
  --brand-2: #1e2dff;
  --ink: #003262;
  --muted: #6a7c98;
}

.display-title {
  font-weight: 600;
  line-height: 1.15;
  max-width: 980px;
  font-size: 54px;
  color: #003262;
}
.text-gradient {
  /* background: linear-gradient(90deg, var(--brand), var(--brand-2));
  -webkit-background-clip: text;
  background-clip: text; */
  color: #0000ff;
}
.lead-sub {
  color: #01101e;
  max-width: 760px;
  font-size: 18px;
}

.btn-cta {
  background: var(--brand);
  color: #fff;
  border: 0;
  padding: 0.9rem 1.4rem;
  border-radius: 14px;
  font-weight: 700;
  box-shadow: 0 8px 24px rgba(11, 95, 255, 0.25);
}
.btn-cta:hover {
  filter: brightness(0.95);
}

.dots {
  position: absolute;
  width: 520px;
  height: 320px;
  opacity: 0.45;
  pointer-events: none;
  background-image: radial-gradient(#c8d7ff 1.2px, transparent 1.2px);
  background-size: 14px 14px;
  filter: blur(0.2px);
}
.dots-left {
  top: 40px;
  left: 0;
}
.dots-right {
  top: 120px;
  right: -80px;
}

.bubble {
  position: absolute;
  left: 24px;
  background: #fff;
  color: #2a3553;
  border-radius: 999px;
  padding: 0.65rem 1rem;
  box-shadow: 0 10px 24px rgba(26, 42, 96, 0.12);
  border: 1px solid #edf2ff;
  font-weight: 600;
}
.bubble-1 {
  top: 190px;
}
.bubble-2 {
  top: 250px;
}
.bubble-2 img {
  object-fit: cover;
}

.float-card {
  position: absolute;
  right: 40px;
  background: #fff;
  border-radius: 14px;
  width: 120px;
  height: 140px;
  box-shadow: 0 18px 34px rgba(16, 32, 96, 0.25);
  border: 1px solid #e9efff;
  justify-content: center;
}
.card-dna {
  top: 130px;
  transform: rotate(15deg);
}
.card-100 {
  top: 200px;
  right: 160px;
  transform: rotate(-10deg);
}
.close-x {
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #0472FF;
  color: #fefefe;
  font-weight: 700;
  line-height: 1;
  padding-bottom: 10px;
}
.dna {
  font-size: 28px;
  letter-spacing: 4px;
  color: #2f54ff;
  opacity: 0.9;
}
.ring {
  width: 68px;
  height: 68px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 3px solid #2f54ff;
  font-weight: 800;
  color: #2f54ff;
}

/* Katta kompozit rasm */
.hero-picture {
  max-width: 980px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  border: 1px solid #e8eeff;
  margin-top: 6.5rem
}
.hero-picture__img {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 991.98px) {
  .bubble-1 {
    top: 120px;
    left: 12px;
    transform: scale(0.95);
  }
  .bubble-2 {
    top: 170px;
    left: 12px;
    transform: scale(0.95);
  }
  .card-dna {
    top: 110px;
    right: 16px;
  }
  .card-100 {
    top: 190px;
    right: 96px;
  }
}
@media (max-width: 767.98px) {
  .hero {
    padding-top: 3.25rem;
  }
  .dots {
    opacity: 0.25;
  }
  .btn-cta {
    padding: 0.8rem 1.15rem;
  }
  .bubble,
  .float-card {
    display: none !important;
  }
}
</style>
