<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  src: string
  alt?: string
  width?: number | string
  height?: number | string
  sizes?: string
  format?: string | string[]   // 'avif,webp' yoki ['avif','webp']
  class?: string
}>(), {
  alt: '',
  format: 'avif,webp'
})

const nuxtApp = useNuxtApp()
const formats = Array.isArray(props.format) ? props.format.join(',') : props.format

// Nuxt Image IPX bo'lsa undan foydalanamiz, bo'lmasa oddiy src
const url = computed(() => {
  const hasImg = typeof nuxtApp.$img === 'function'
  return hasImg
    ? nuxtApp.$img(props.src, {
        width: props.width ? Number(props.width) : undefined,
        height: props.height ? Number(props.height) : undefined,
        format: formats
      })
    : props.src
})
</script>

<template>
  <!-- v-lazy - o'zimiz yozgan direktiva -->
  <img
    v-lazy="url"
    :alt="alt"
    :width="width"
    :height="height"
    :sizes="sizes"
    :class="class"
    decoding="async"
    style="display:block"
  />
</template>
