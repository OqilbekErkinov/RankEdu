<!-- components/HeroSection.vue -->
<template>
  <section id="hero" class="hero position-relative overflow-hidden py-5">
    <!-- dekor nuqtalar -->
    <div class="dots dots-left"></div>
    <div class="dots dots-right"></div>

    <div class="container hero-inner text-center position-relative">
      <!-- Chapdagi kichik bubble'lar -->
      <div class="bubble bubble-1 d-none d-md-flex">
        <span>Асабларни тинчлантиришга</span>
      </div>
      <div class="bubble bubble-2 d-none d-lg-flex align-items-center gap-2">
        <span>Шифокор маслаҳатига биноан қабул...</span>
        <img src="/images/avatar1.png" alt="user" class="rounded-circle" width="28" height="28" />
      </div>

      <!-- O'ngdagi suzuvchi kartalar -->
      <div class="float-card card-dna d-none d-md-flex flex-column align-items-center">
        <span class="close-x">×</span>
        <div class="dna">✣✣✣</div>
        <small class="text-muted mt-1">таркиби</small>
      </div>
      <div class="float-card card-100 d-none d-lg-flex flex-column align-items-center">
        <span class="close-x">×</span>
        <div class="ring">100%</div>
        <small class="text-muted mt-1">табиий</small>
      </div>

      <!-- Headline -->
      <h1 class="display-title mx-auto">
        Асаб касалликларига<br />
        <span class="text-gradient">табобий</span> ва
        <span class="text-gradient">табиий</span> ечим
      </h1>
      <p class="lead-sub mx-auto">
        Энг илғор ва таъсирли формулани маҳсулотимиз билан сезинг.
        Ўзингизни яхш ҳис қилиб, ҳаётингизни қайтадан тўлдиринг!
      </p>

      <!-- CTA -->
      <button class="btn btn-cta mt-2" data-bs-toggle="modal" data-bs-target="#orderModal">
        Биз билан боғланиш
        <svg width="18" height="18" viewBox="0 0 24 24" class="ms-2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.89.33 1.76.63 2.58a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.59-1.18a2 2 0 0 1 2.11-.45c.82.3 1.69.51 2.58.63A2 2 0 0 1 22 16.92z" fill="currentColor"/>
        </svg>
      </button>

      <!-- Bitta kompozit rasm (ayol + dorilar + yozuvlar) -->
      <figure class="hero-picture mt-5 mx-auto">
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
:root{
  --brand:#0B5FFF; --brand-2:#1E2DFF; --ink:#0c2a4a; --muted:#6a7c98;
}

.hero{ background:#f6f9ff; }
.display-title{
  font-weight:800; line-height:1.15; max-width:980px;
  font-size:clamp(28px,5.2vw,64px); color:var(--ink);
}
.text-gradient{
  background:linear-gradient(90deg,var(--brand),var(--brand-2));
  -webkit-background-clip:text; background-clip:text; color:transparent;
}
.lead-sub{ color:var(--muted); max-width:760px; font-size:clamp(14px,1.4vw,18px); }

.btn-cta{
  background:var(--brand); color:#fff; border:0; padding:.9rem 1.4rem;
  border-radius:14px; font-weight:700; box-shadow:0 8px 24px rgba(11,95,255,.25);
}
.btn-cta:hover{ filter:brightness(.95); }

.dots{
  position:absolute; width:520px; height:320px; opacity:.45; pointer-events:none;
  background-image:radial-gradient(#c8d7ff 1.2px, transparent 1.2px);
  background-size:14px 14px; filter:blur(.2px);
}
.dots-left{ top:40px; left:0; }
.dots-right{ top:120px; right:-80px; }

.bubble{
  position:absolute; left:24px; background:#fff; color:#2a3553; border-radius:999px;
  padding:.65rem 1rem; box-shadow:0 10px 24px rgba(26,42,96,.12); border:1px solid #edf2ff; font-weight:600;
}
.bubble-1{ top:160px; }
.bubble-2{ top:220px; }
.bubble-2 img{ object-fit:cover; }

.float-card{
  position:absolute; right:40px; background:#fff; border-radius:14px;
  width:120px; height:140px; box-shadow:0 18px 34px rgba(16,32,96,.14);
  border:1px solid #e9efff; justify-content:center;
}
.card-dna{ top:130px; transform:rotate(10deg); }
.card-100{ top:220px; right:120px; transform:rotate(-8deg); }
.close-x{
  position:absolute; right:10px; top:8px; width:18px; height:18px; display:grid; place-items:center;
  border-radius:50%; background:#ebf2ff; color:#2a55ff; font-weight:700; line-height:1;
}
.dna{ font-size:28px; letter-spacing:4px; color:#2f54ff; opacity:.9; }
.ring{ width:68px; height:68px; display:grid; place-items:center; border-radius:50%;
  border:3px dashed #2f54ff; font-weight:800; color:#2f54ff; }

/* Katta kompozit rasm */
.hero-picture{
  max-width:980px; border-radius:24px; overflow:hidden; position:relative;
  box-shadow:0 30px 60px rgba(11,34,97,.12);
  border:1px solid #e8eeff;
}
.hero-picture__img{ width:100%; height:auto; display:block; }

@media (max-width: 991.98px){
  .bubble-1{ top:120px; left:12px; transform:scale(.95); }
  .bubble-2{ top:170px; left:12px; transform:scale(.95); }
  .card-dna{ top:110px; right:16px; }
  .card-100{ top:190px; right:96px; }
}
@media (max-width: 767.98px){
  .hero{ padding-top:3.25rem; }
  .dots{ opacity:.25; }
  .btn-cta{ padding:.8rem 1.15rem; }
  .bubble, .float-card{ display:none !important; }
}
</style>
