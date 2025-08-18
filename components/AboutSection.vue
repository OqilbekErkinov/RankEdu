<template>
  <section id="about" class="about-wrap pb-5 position-relative">
    <div class="container mb-5">
      <div class="extracts-box mx-auto">
        <div class="extracts-head text-center">
          <h2 class="section-title mb-0">
            Маҳсулот таркибидаги
            <span class="text-accent">“Экстракт”</span>ларнинг организмга
            фойдалари
          </h2>
        </div>

        <div class="row g-3 extracts-grid">
          <!-- chap ustun -->
          <div class="col-12 col-lg-6">
            <div class="extract-item">
              <div class="thumb">
                <img src="/images/ginkgo.png" alt="Гинкго билоба" />
              </div>
              <div class="text">
                <h5 class="item-title">Гинкго билоба</h5>
                <p class="item-desc">
                  Қон айланишини яхшилайди ва қон томирларда тиқилмаларни очиб
                  беради.
                </p>
              </div>
            </div>

            <div class="extract-item">
              <div class="thumb">
                <img src="/images/blackroot.png" alt="Қора андиз" />
              </div>
              <div class="text">
                <h5 class="item-title">Қора андиз</h5>
                <p class="item-desc">
                  Қонни суюлтирувчи, мияда қон айланишини яхшилаб беради.
                </p>
              </div>
            </div>

            <div class="extract-item mb-0">
              <div class="thumb">
                <img src="/images/mumie.png" alt="Мумийё" />
              </div>
              <div class="text">
                <h5 class="item-title">Мумийё</h5>
                <p class="item-desc">
                  Суякларни мустаҳкамлаб беради, эрта қаришни олдини олади.
                </p>
              </div>
            </div>
          </div>

          <!-- o'ng ustun -->
          <div class="col-12 col-lg-6">
            <div class="extract-item">
              <div class="thumb">
                <img src="/images/valeriana.png" alt="Валериана" />
              </div>
              <div class="text">
                <h5 class="item-title">Валериана</h5>
                <p class="item-desc">
                  Стрессни енгиллаштириб, дам олишга ёрдам беради ва уйқу
                  сифатини яхшилайди.
                </p>
              </div>
            </div>

            <div class="extract-item">
              <div class="thumb">
                <img src="/images/ginger.png" alt="Занжабил" />
              </div>
              <div class="text">
                <h5 class="item-title">Занжабил</h5>
                <p class="item-desc">
                  Занжабил таркибидаги моддалар иммунитет тизимини
                  мустаҳкамлайди.
                </p>
              </div>
            </div>

            <div class="extract-item mb-0">
              <div class="thumb">
                <img src="/images/cinnamon.png" alt="Долчин" />
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

        <!-- pastki chiziq (figmadagi borderga o‘xshash) -->
        <div class="extracts-foot"></div>
      </div>
    </div>

    <!-- ============ 2) Сертификатланган ============ -->
    <div class="container">
      <div class="cert-box mx-auto">
        <div class="row align-items-center g-4">
          <!-- chap: timeline -->
          <div class="col-12 col-lg-5">
            <h3 class="section-title mb-4">Сертификатланган</h3>

            <ul class="timeline list-unstyled">
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

          <!-- o‘ng: sertifikat rasmi/slider -->
          <div class="col-12 col-lg-7">
            <div
              id="certCarousel"
              class="carousel slide cert-view"
              data-bs-ride="false"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    class="cert-img"
                    src="/images/cert1.png"
                    alt="Certificate 1"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    class="cert-img"
                    src="/images/cert2.png"
                    alt="Certificate 2"
                  />
                </div>
              </div>

              <button
                class="carousel-control-prev cert-nav"
                type="button"
                data-bs-target="#certCarousel"
                data-bs-slide="prev"
              >
                <span class="visually-hidden">Prev</span>
                ‹
              </button>
              <button
                class="carousel-control-next cert-nav"
                type="button"
                data-bs-target="#certCarousel"
                data-bs-slide="next"
              >
                <span class="visually-hidden">Next</span>
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// presentational component
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
  /* background-image: url("/icons/DNA.svg"); */
}

/* SECTION TITLES */
.section-title {
  color: #003262;
  font-weight: 500;
  line-height: 1.2;
  font-size: 40px;
}
.text-accent {
  color: #0000ff;
}

/* ====== EXTRACTS ====== */
.extracts-box {
  border: 2px solid var(--border);
  border-radius: 14px;
  background: #f4f7ff;
  padding: 28px 18px 10px;
  position: relative;
  max-width: 1080px;
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

/* ====== CERTIFIED ====== */
.cert-box {
  border: 2px solid var(--border);
  border-radius: 14px;
  background: #f4f7ff;
  padding: 0 18px;
  max-width: 1080px;
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
/* certificate viewer / carousel */
.cert-view {
  border-radius: 14px;
  padding: 14px;
  position: relative;
}
.cert-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
  transform: rotate(-3deg);
}
.cert-nav {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid #bfd6f7;
  background: #fff;
  color: #3266a6;
  display: grid;
  place-items: center;
  font-size: 22px;
}
.cert-nav.carousel-control-prev {
  left: -2rem;
}
.cert-nav.carousel-control-next {
  right: -10px;
}

/* ====== RESPONSIVE ====== */
@media (max-width: 767.98px) {
  .extracts-box {
    padding: 20px 12px 8px;
  }
  .cert-nav {
    width: 34px;
    height: 34px;
    font-size: 20px;
  }
  .cert-nav.carousel-control-prev {
    left: 4px;
  }
  .cert-nav.carousel-control-next {
    right: 4px;
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
  .cert-view {
    padding: 0;
  }
  .cert-box {
    padding: 0;
  }
}
</style>
