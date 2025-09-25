<template>
  <section id="benefits" class="benefit-section position-relative py-5">
    <IconsBenefitDna />

    <div class="classformargin position-relative">
      <div class="text-center mb-5">
        <h2 class="display-title section-title m-0">
          <span class="duo"
            >"Неврослим" ни неча ёшдан истеъмол қилса бўлади?</span
          >
        </h2>
      </div>

      <div class="row g-4">
        <div class="col-lg-7">
          <div class="row g-4 row-cols-1 row-cols-md-2">
            <div v-for="(card, i) in cards" :key="i" class="col">
              <div class="softt-card h-100 p-0">
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

                <div class="ratio ratio-16x9 mt-2">
                  <NuxtImg
                    loading="lazy"
                    :src="card.img"
                    class="rounded-2 object-fit-cover w-100 h-100"
                    :class="i === 1 ? 'obj-center' : ''"
                    alt=""
                  />
                </div>
                <div class="px-3 py-3">
                  <ul class="benefits list-unstyled m-0">
                    <li v-for="(b, bi) in card.bullets" :key="bi">{{ b }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="soft-card p-0 h-80 d-flex flex-column">
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

            <div class="ratio ratio-1x1 mt-3">
              <NuxtImg
                loading="lazy"
                :src="post.image"
                class="w-100 h-100 object-fit-cover"
                alt=""
              />
            </div>
          </div>
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