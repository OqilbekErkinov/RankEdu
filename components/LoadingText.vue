<template>
  <div ref="preloader" class="mil-preloader">
    <div ref="animation" class="mil-preloader-animation">
      <div ref="animation1" class="mil-pos-abs mil-animation-1">
        <p class="mil-h3 mil-muted mil-thin mt-5">Доверие</p>x
        <p class="mil-h3 mil-muted mt-5">Скорость11</p>
        <p class="mil-h3 mil-muted mil-thin mt-5">Качество</p>
      </div>
      <div ref="animation2" class="mil-pos-abs mil-animation-2">
        <div class="mil-reveal-frame">
          <p ref="revealBox" class="mil-reveal-box"></p>
          <p class="mil-h3 mil-muted mil-thin mt-5">Khamrayev Filters</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import gsap from "gsap";
export default {
  setup() {
    const preloader = ref(null);
    const animation = ref(null);
    const animation1 = ref(null);
    const animation2 = ref(null);
    const revealBox = ref(null);
    onMounted(() => {
      const timeline = gsap.timeline();
      // Animatsiya boshlash
      timeline.to(animation.value, { opacity: 1 });
      // "Pioneering Creative Excellence" so‘zlari paydo bo‘lishi
      timeline.fromTo(
        animation1.value.querySelectorAll(".mil-h3"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.4 }
      );
      // Matn yo‘qolishi
      timeline.to(
        animation1.value.querySelectorAll(".mil-h3"),
        { opacity: 0, y: -30 },
        "+=0.3"
      );
      // Quti ochilishi
      timeline.fromTo(revealBox.value, { opacity: 0 }, { opacity: 1 });
      timeline.to(revealBox.value, 0.45, { width: "100%" }, "+=0.1");
      timeline.to(revealBox.value, { right: "0" });
      timeline.to(revealBox.value, 0.3, { width: "0%" });
      // "Khamrayev Filters" so‘zi paydo bo‘lishi
      timeline.fromTo(animation2.value.querySelector(".mil-h3"), { opacity: 0 }, { opacity: 1 }, "-=0.5");
      timeline.to(animation2.value.querySelector(".mil-h3"), 0.6, { opacity: 0, y: -30 }, "+=0.5");
      // Preloader yo‘qolishi
      timeline.to(preloader.value, 0.8, {
        opacity: 0,
        ease: "sine",
        onComplete: () => {
          preloader.value.style.display = "none";
        }
      }, "+=0.2");
    });

    return { preloader, animation, animation1, animation2, revealBox };
  }
};
</script>

<style scoped>
.mil-preloader {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #e8e8e8;
  background-image: url("/icons/background.svg");
  display: flex;
  align-items: center;
  justify-content: center;
}
.mil-preloader .mil-preloader-animation {
  opacity: 0;
  position: relative;
  height: 100vh;
  color: #04315b;
}
.mil-preloader .mil-preloader-animation .mil-pos-abs {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mil-preloader .mil-preloader-animation .mil-pos-abs p {
  opacity: 0;
  margin-right: 15px;
  font-size: 24px;
  margin-top: 15rem !important;
}
@media screen and (max-width: 992px) {
  .mil-preloader .mil-preloader-animation .mil-pos-abs {
    flex-direction: column;
  }
  .mil-preloader .mil-preloader-animation .mil-pos-abs p {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
.mil-preloader .mil-preloader-animation .mil-pos-abs .mil-reveal-frame {
  position: relative;
  padding: 0 30px;
}
.mil-preloader .mil-preloader-animation .mil-pos-abs .mil-reveal-frame .mil-reveal-box {
  position: absolute;
  opacity: 0;
  height: 20%;
  background-color: rgb(255, 152, 0);

}
</style>
