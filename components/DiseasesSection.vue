<template>
  <section id="diseases" class="diseases py-5 mb-5">
    <div class="classformargin">
      <div class="box mx-auto">
        <h2 class="display-title title text-center mb-4">
          <span class="duo">Неврослим қандай касалликларни даволайди?</span>
        </h2>

        <div class="stage position-relative mx-auto">
          <NuxtImg
            src="/images/pack-bottle.webp"
            alt="Nevroslim"
            class="product"
            loading="lazy"
          />
          <div
            v-for="(it, i) in leftBubbles"
            :key="'l' + i"
            class="pill left d-flex align-items-center shadow-sm"
            :style="pillStyle('left', it.y)"
          >
            <span>{{ it.text }}</span>
            <NuxtImg
              loading="lazy"
              v-if="it.avatar"
              :src="it.avatar"
              alt=""
              class="avatar ms-2"
            />
          </div>

          <div
            v-for="(it, i) in rightBubbles"
            :key="'r' + i"
            class="pill right d-flex align-items-center shadow-sm"
            :style="pillStyle('right', it.y)"
          >
            <NuxtImg
              loading="lazy"
              v-if="it.avatar"
              :src="it.avatar"
              alt=""
              class="avatar me-2"
            />
            <span>{{ it.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Bubble = { text: string; y: number; avatar?: string };

const leftBubbles: Bubble[] = [
  { text: "Бирор иш қилиш ёқмаслиги", y: 8, avatar: "/images/a1.webp" },
  { text: "Уйқусизлик, ваҳима", y: 32, avatar: "/images/a2.webp" },
  { text: "Депрессия", y: 56, avatar: "/images/a3.webp" },
  { text: "Тушкун ҳолатда юриш", y: 78, avatar: "/images/a4.webp" },
];

const rightBubbles: Bubble[] = [
  { text: "Сабабсиз бетоқатлик", y: 8, avatar: "/images/a5.webp" },
  { text: "Асаб толиқиши", y: 32, avatar: "/images/a6.webp" },
  { text: "Бош оғриғи, мигрень", y: 53, avatar: "/images/a8.webp" },
  { text: "Зеҳн ва хотиранг пастлиги", y: 76, avatar: "/images/a7.webp" },
  {
    text: "Юрак соҳасида оғрик ва юрак ўйнаши",
    y: 99,
    avatar: "/images/a9.webp",
  },
];

const allBubbles = [...leftBubbles, ...rightBubbles];

const pillStyle = (side: "left" | "right", y: number) =>
  ({ top: `${y}%`, [side]: "14px" } as const);

import { onMounted } from "vue";

onMounted(() => {
  const stage = document.querySelector(
    "#diseases .stage"
  ) as HTMLElement | null;
  if (!stage) return;

  const pills = Array.from(stage.querySelectorAll<HTMLElement>(".pill"));

  pills.forEach((el) => el.classList.add("will-reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        pills.sort((a, b) => a.offsetTop - b.offsetTop);

        pills.forEach((el, i) => {
          setTimeout(() => el.classList.add("in"), i * 160); // 160ms step
        });
        io.disconnect();
      }
    },
    { threshold: 0.25 }
  );

  io.observe(stage);
});
</script>