<template>
  <section id="diseases" class="diseases py-5 mb-5">
    <div class="container">
      <div class="box mx-auto">
        <h2 class="title text-center mb-4">
          "<span class="accent">Неврослим</span>" қандай касалликларни<br
            class="d-none d-md-inline"
          />
          даволайди?
        </h2>

        <div class="stage position-relative mx-auto">
          <!-- mahsulot -->
          <img
            src="/images/pack-bottle.png"
            alt="Nevroslim"
            class="product"
            loading="lazy"
          />

          <!-- LEFT bubbles -->
          <div
            v-for="(it, i) in leftBubbles"
            :key="'l' + i"
            class="pill left d-flex align-items-center shadow-sm"
            :style="pillStyle('left', it.y)"
          >
            <span>{{ it.text }}</span>
            <img v-if="it.avatar" :src="it.avatar" alt="" class="avatar ms-2" />
          </div>

          <!-- RIGHT bubbles -->
          <div
            v-for="(it, i) in rightBubbles"
            :key="'r' + i"
            class="pill right d-flex align-items-center shadow-sm"
            :style="pillStyle('right', it.y)"
          >
            <img v-if="it.avatar" :src="it.avatar" alt="" class="avatar me-2" />
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
  { text: "Бирор иш қилиш ёқмаслиги", y: 8, avatar: "/images/a1.png" },
  { text: "Уйқусизлик, ваҳима", y: 32, avatar: "/images/a2.png" },
  { text: "Депрессия", y: 56, avatar: "/images/a3.png" },
  { text: "Тушкун ҳолатда юриш", y: 78, avatar: "/images/a4.png" },
];

const rightBubbles: Bubble[] = [
  { text: "Сабабсиз бетоқатлик", y: 8, avatar: "/images/a5.png" },
  { text: "Асаб толиқиши", y: 32, avatar: "/images/a6.png" },
  { text: "Бош оғриғи, мигрень", y: 53, avatar: "/images/a8.png" },
  { text: "Зеҳн ва хотиранг пастлиги", y: 76, avatar: "/images/a7.png" },
  {
    text: "Юрак соҳасида оғрик ва юрак ўйнаши",
    y: 99,
    avatar: "/images/a9.png",
  },
];

const allBubbles = [...leftBubbles, ...rightBubbles];

// pill joylashuvi (desktop)
const pillStyle = (side: "left" | "right", y: number) =>
  ({ top: `${y}%`, [side]: "14px" } as const);
</script>

<style scoped>
:root {
  --border: #2a66a3;
  --ink: #003262;
  --muted: #5b6b8b;
  --brand: #0000ff;
  --brand2: #1e2dff;
  --bg: #f4f7ff;
}
.diseases {
  background: var(--bg);
}

.box {
  border: 3px solid var(--border);
  border-radius: 14px;
  background: #f4f7ff;
  /* padding: 22px 16px 28px; */
}

.title {
  color: var(--ink);
  font-weight: 500;
  line-height: 1.15;
  font-size: 40px;
}
.accent {
  background: linear-gradient(90deg, var(--brand), var(--brand2));
  -webkit-background-clip: text;
  background-clip: text;
  color: #0000ff;
}

/* sahna */
.stage {
  min-height: 360px;
  padding: 24px 0;
}
.product {
  display: block;
  width: 500px;
  max-width: 62%;
  margin: 0 auto;
  user-select: none;
  pointer-events: none;
  filter: drop-shadow(0 18px 40px rgba(16, 48, 120, 0.18));
}
/* pills */
.pill {
  position: absolute;
  background: #fff;
  border: 1px solid #e6f0ff;
  box-shadow: 0 10px 24px rgba(26, 42, 96, 0.1);
  border-radius: 999px;
  padding: 0.9rem 1.5rem;
  font-weight: 600;
  color: #003262;
  max-width: 400px;
  font-size: 17px;
}
.pill.left {
  text-align: left;
}
.pill.right {
  text-align: left;
}
.pill .avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

/* mobile/grid ko'rinish */
.pill.static {
  position: static;
  width: 100%;
}

@media (max-width: 991.98px) {
  .product {
    max-width: 60%;
  }
}
@media (max-width: 767.98px) {
  .box {
    padding: 18px 12px 18px;
  }
  .product {
    max-width: 68%;
  }
}
@media (max-width: 600px) {
  .title {
    font-size: 24px;
  }
  .box {
    padding: 0;
  }
  .stage {
    margin-left: -0.8rem !important;
    margin-right: -0.8rem !important;
  }
  .pill {
    padding: 0 5px;
    font-size: 6px;
  }
  .left {
    left: 0 !important;
  }
  .right {
    right: 0 !important;
  }
  .product {
    margin-top: 4rem
  }
}
</style>
