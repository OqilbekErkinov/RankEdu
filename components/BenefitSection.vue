<!-- components/BenefitSection.vue -->
<template>
  <section id="benefits" class="benefit-section position-relative py-5">
    <div class="container position-relative">
      <!-- title -->
      <div class="text-center mb-5">
        <h2 class="section-title m-0">
          <span class="accent">"Неврослим"</span>
          <span class="ms-1">ни неча ёшдан истеъмол қилса бўлади?</span>
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
                    <div class="fw-bold small text-muted mb-1">
                      {{ card.age }}
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <img
                        :src="brandAvatar"
                        class="rounded-circle"
                        width="26"
                        height="26"
                        alt="brand"
                      />
                      <span class="small text-muted">Al Hayat Med</span>
                    </div>
                  </div>
                  <i class="bi bi-three-dots-vertical text-muted"></i>
                </div>

                <!-- cover -->
                <div class="ratio ratio-16x9 mt-2">
                  <img
                    :src="card.img"
                    class="rounded-2 object-fit-cover w-100 h-100"
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
          <div class="soft-card p-0 h-100 d-flex flex-column">
            <!-- header -->
            <div
              class="d-flex align-items-center justify-content-between px-3 pt-3"
            >
              <div class="d-flex align-items-center gap-2">
                <img
                  :src="brandAvatar"
                  class="rounded-circle"
                  width="36"
                  height="36"
                  alt="brand"
                />
                <div>
                  <div class="fw-semibold">Al Hayat Med</div>
                  <div class="small text-muted">{{ post.date }}</div>
                </div>
              </div>
              <i class="bi bi-three-dots-vertical text-muted"></i>
            </div>

            <!-- image -->
            <div class="ratio ratio-1x1 mt-3">
              <img
                :src="post.image"
                class="w-100 h-100 object-fit-cover"
                alt=""
              />
            </div>

            <!-- actions -->
            <div
              class="px-3 py-2 d-flex align-items-center justify-content-between"
            >
              <div class="d-flex align-items-center gap-2">
                <span class="react react-blue"
                  ><i class="bi bi-hand-thumbs-up-fill"></i
                ></span>
                <span class="react react-yellow"
                  ><i class="bi bi-emoji-laughing-fill"></i
                ></span>
                <span class="react react-red"
                  ><i class="bi bi-heart-fill"></i
                ></span>
              </div>
              <div class="small text-muted">{{ post.comments }} фикрлар</div>
            </div>

            <!-- comment box -->
            <div class="px-3 pb-3">
              <div class="d-flex align-items-center gap-2">
                <img
                  :src="userAvatar"
                  width="28"
                  height="28"
                  class="rounded-circle"
                  alt="me"
                />
                <div class="flex-grow-1 position-relative">
                  <input
                    type="text"
                    class="form-control form-control-sm rounded-pill ps-3 pe-5"
                    placeholder="ёзиш..."
                  />
                  <div
                    class="position-absolute top-50 end-0 translate-middle-y pe-2 d-flex gap-2 text-muted"
                  >
                    <i class="bi bi-emoji-smile"></i>
                    <i class="bi bi-camera"></i>
                    <i class="bi bi-paperclip"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /soft-card -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
      image: "/images/benefit4.webp",
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
  background-image: url("/icons/BACKGROUND 3.svg");
}
.soft-card {
  background: #fff;
  border: 1px solid #e6ecf5;
  border-radius: 18px;
  box-shadow: 0 8px 28px rgba(6, 24, 44, 0.06);
}

/* title */
.section-title {
  font-weight: 500;
  font-size: 40px;
  letter-spacing: 0.3px;
}
.accent {
  color: #0000ff;
}

.ratio > img {
  border-radius: 14px;
}

/* bullets */
.benefits li {
  position: relative;
  padding-left: 18px;
  margin: 6px 0;
  color: #1b2559;
}
.benefits li::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2f5cff;
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
}
.react-red {
  background: #ef4444;
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
