<template>
  <div>
    <NuxtLayout>
      <!-- <LoadingText /> -->
  <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

<script setup>
const isLoader = useLoader()

useSeoMeta({
  title: () => t('meta.title'),
  meta: [
    { hid: 'description', name: 'description', content: () => t('meta.description') },
    { name: 'format-detection', content: 'telephone=no' },

    // Open Graph (Facebook, LinkedIn)
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: () => t('meta.ogTitle') },
    { property: 'og:description', content: () => t('meta.ogDescription') },
    { property: 'og:image', content: '/preview.webp' },
    { property: 'og:url', content: 'https://palermo.uz' },
    { property: 'og:site_name', content: 'Palermo' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: () => t('meta.twitterTitle') },
    { name: 'twitter:description', content: () => t('meta.twitterDescription') },
    { name: 'twitter:image', content: '/preview.webp' },

    // Additional SEO
    { name: 'robots', content: 'index, follow' }
  ],
  
  htmlAttrs: {
    lang: () => locale.value
  }
})
</script>