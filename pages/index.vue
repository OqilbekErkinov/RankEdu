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
</template>

<script setup>
definePageMeta({ layout: "default" });
</script>
