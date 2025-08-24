<!-- components/BenefitSection.vue -->
<template>
  <section id="benefits" class="benefit-section position-relative py-5">
    <IconsBenefitDna />

    <div class="classformargin position-relative">
      <!-- title -->
      <div class="text-center mb-5">
        <h2 class="display-title section-title m-0">
          <span class="duo"
            >"Неврослим" ни неча ёшдан истеъмол қилса бўлади?</span
          >
        </h2>
      </div>

      <div class="row g-4">
        <!-- LEFT: Masonry-like two columns with small cards -->
        <div class="col-lg-7">
          <div class="row g-4 row-cols-1 row-cols-md-2">
            <div v-for="(card, i) in cards" :key="i" class="col">
              <div class="soft-card h-100 p-0">
                <!-- head -->
                <div
                  class="d-flex align-items-center justify-content-between px-3 pt-3"
                >
                  <div>
                    <div class="d-flex align-items-center gap-2">
                      <NuxtImg
                        loading="lazy"
                        :src="brandAvatar"
                        class="rounded-circle"
                        width="50"
                        height="50"
                        alt="brand"
                      />
                      <div
                        class="d-flex"
                        style="display: flex; flex-direction: column"
                      >
                        <div
                          class=""
                          style="
                            color: #000000;
                            font-size: 17px;
                            font-weight: 500;
                          "
                        >
                          {{ card.age }}
                        </div>
                        <span class="small" style="color: #5d8aa8"
                          >Al Hayat Med</span
                        >
                      </div>
                    </div>
                  </div>
                  <i
                    class="bi bi-three-dots-vertical mb-2"
                    style="font-size: 20px"
                  ></i>
                </div>

                <!-- cover -->
                <div class="ratio ratio-16x9 mt-2">
                  <NuxtImg
                    loading="lazy"
                    :src="card.img"
                    class="rounded-2 object-fit-cover w-100 h-100"
                    :class="i === 1 ? 'obj-center' : ''"
                    alt=""
                  />
                </div>

                <!-- bullets -->
                <div class="px-3 py-3">
                  <ul class="benefits list-unstyled m-0">
                    <li v-for="(b, bi) in card.bullets" :key="bi">{{ b }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Social post style card -->
        <div class="col-lg-5">
          <div class="soft-card p-0 h-80 d-flex flex-column">
            <!-- header -->
            <div
              class="d-flex align-items-center justify-content-between px-3 pt-3"
            >
              <div class="d-flex align-items-center gap-2">
                <NuxtImg
                  loading="lazy"
                  :src="brandAvatar"
                  class="rounded-circle"
                  width="50"
                  height="50"
                  alt="brand"
                />
                <div>
                  <div class="fw-semibold text-dark" style="font-size: 20px">
                    Al Hayat Med
                  </div>
                  <div class="small text-muted">{{ post.date }}</div>
                </div>
              </div>
              <i
                class="bi bi-three-dots-vertical mb-2"
                style="font-size: 20px"
              ></i>
            </div>

            <!-- image -->
            <div class="ratio ratio-1x1 mt-3">
              <NuxtImg
                loading="lazy"
                :src="post.image"
                class="w-100 h-100 object-fit-cover"
                alt=""
              />
            </div>
          </div>
          <!-- /soft-card -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import IconsBenefitDna from "~/components/Icons/BenefitDna.vue";

type BenefitCard = {
  age: string;
  img: string;
  bullets: string[];
};

type Post = {
  date: string;
  image: string;
  comments: number;
};

const props = withDefaults(
  defineProps<{
    cards?: BenefitCard[];
    post?: Post;
    brandAvatar?: string;
    userAvatar?: string;
  }>(),
  {
    cards: () => [
      {
        age: "3 ёшдан 12 ёшгача",
        img: "/images/benefit1.webp",
        bullets: [
          "Болаларда эхзэн ва хотирани кучайтиради",
          "Бўшашиш ва ижобийлик",
          "Суякларни мустаҳкамлайди",
        ],
      },
      {
        age: "12 ёшдан 30 ёшгача",
        img: "/images/benefit2.webp",
        bullets: [
          "Асабларни тинчлантириб беради",
          "Сўзлаш қобилияти",
          "Кайфиятни кўтариб уйқуни яхшилайди",
        ],
      },
      {
        age: "30 ёшдан 65 ёшгача",
        img: "/images/benefit3.webp",
        bullets: [
          "Мияда қон айланишини яхшилайди",
          "Юрак органи ва юрак ўйнашда фойдали",
          "Қон босимини туширади ва қўзғишда самарали",
        ],
      },
    ],
    post: () => ({
      date: "Июл 21:27",
      image: "/images/benefit5.webp",
      comments: 27,
    }),
    brandAvatar: "/images/brandAvatar.webp",
    userAvatar: "/images/avatar1.webp",
  }
);
</script>

<style scoped>
/* soft card look */
.benefit-section {
  overflow: hidden;
  /* background-image: url("/icons/BACKGROUND 3.svg"); */
}
.soft-card {
  background: #fff;
  border: 1px solid #e6ecf5;
  border-radius: 18px;
  box-shadow: 0 8px 28px rgba(6, 24, 44, 0.06);
  transition: transform 0.6s ease;
}
.soft-card:hover {
  transform: translateY(-15px);
}
/* faqat o‘rtadagi (2-karta) ni pastga surish, md+ ekranlarda */
@media (min-width: 768px) {
  .benefit-section .row.row-cols-md-2 > .col:nth-child(2) .soft-card {
    /* variant A: transform — layoutni buzmaydi */
    transform: translateY(13rem);
  }
}

/* agar transform emas, margin bilan qilaman desangiz: */
@media (min-width: 768px) {
  .benefit-section .row.row-cols-md-2 > .col:nth-child(2) .soft-card {
    margin-top: 14px; /* pastga */
    /* margin-top: -14px;  yuqoriga tortish uchun */
  }
}

/* title */
.section-title {
  font-weight: 500;
  font-size: 40px;
  letter-spacing: 0.3px;
  margin: auto !important;
}
.accent {
  color: #0000ff;
}

.ratio > img {
  border-radius: 14px;
}

/* ✅ o‘rtadagi kichik karta rasmi vertikal markazda tursin */
.obj-center {
  object-position: center center;
}
/* bullets */
.benefits li {
  position: relative;
  padding-left: 18px;
  margin: 6px 0;
  color: #003262;
}
.benefits li::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #003262;
  position: absolute;
  left: 0;
  top: 0.7em;
}

/* reactions */
.react {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 14px;
  color: #fff;
}
.react-blue {
  background: #3b82f6;
}
.react-yellow {
  background: #f59e0b;
  margin-left: -0.85rem;
}
.react-red {
  background: #ef4444;
  margin-left: -0.85rem;
}

/* dotted background */
.benefit-section .dots {
  position: absolute;
  inset: 0;
  background: radial-gradient(
        circle at 30% 8%,
        rgba(47, 92, 255, 0.12) 0 2px,
        transparent 2px
      )
      0 0/24px 24px,
    radial-gradient(
        circle at 70% 14%,
        rgba(47, 92, 255, 0.08) 0 2px,
        transparent 2px
      )
      0 0/28px 28px;
  pointer-events: none;
  opacity: 0.7;
  mask-image: radial-gradient(
    circle at 50% -10%,
    black 0,
    black 46%,
    transparent 60%
  );
}
@media (max-width: 600px) {
  .section-title {
    font-size: 24px;
  }
}
</style>
