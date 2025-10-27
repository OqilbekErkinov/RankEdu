export default defineNuxtConfig({
  app: {
    head: {
      title: 'RankEdu - O`zbekiston milliy ta`lim platformasi',
      htmlAttrs: { lang: 'uz' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
    }
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css', 
    '@/assets/css/theme.css',
  ],

  plugins: [
    { src: '~/plugins/bootstrap.client.ts', mode: 'client' },
  ],

  runtimeConfig: {
    public: {
      siteName: 'RankEdu'
    }
  },
  modules: ['@nuxt/image'],
  image: {
    format: ['avif', 'webp'],
    quality: 60, 
    screens: { sm: 640, md: 768, lg: 1024, xl: 1280 }
  },
  routeRules: {
    '/_ipx/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } }
  },

  compatibilityDate: '2025-08-15'
})