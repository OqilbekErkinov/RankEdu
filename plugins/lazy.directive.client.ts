// plugins/lazy.directive.client.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lazy', {
    mounted(el: HTMLImageElement, binding) {
      const src = binding.value
      if (!('IntersectionObserver' in window)) {
        el.src = src
        return
      }

      // placeholder ixtiyoriy: tiniq 1x1 gif
      if (!el.src) {
        el.src =
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
      }

      const onIntersect: IntersectionObserverCallback = (entries, obs) => {
        const e = entries[0]
        if (e && e.isIntersecting) {
          el.src = src
          obs.unobserve(el)
        }
      }

      const io = new IntersectionObserver(onIntersect, {
        root: null,
        rootMargin: '0px', // faqat viewportga kirganda
        threshold: 0.2,    // ~20% ko‘rinishi kifoya
      })
      io.observe(el)
    },
  })
})
