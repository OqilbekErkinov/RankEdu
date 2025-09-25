export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nevroslim — Асаб касалликларига табобий ечим',
      htmlAttrs: { lang: 'uz' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
    }
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css', 
    '@/assets/css/main.css',
    '@/assets/css/header.css',
    '@/assets/css/footer.css',
    '@/assets/css/hero.css',
    '@/assets/css/about.css',
    '@/assets/css/advise.css',
    '@/assets/css/benefit.css',
    '@/assets/css/bigplayer.css',
    '@/assets/css/contact.css',
    '@/assets/css/diseases.css',
    '@/assets/css/expert.css',
  ],

  plugins: [
    { src: '~/plugins/bootstrap.client.ts', mode: 'client' },
  ],

  runtimeConfig: {
    public: {
      siteName: 'Nevroslim'
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