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
    '@/assets/css/main.css'
  ],

  plugins: [
    { src: '~/plugins/bootstrap.client.ts', mode: 'client' },
  ],

  runtimeConfig: {
    telegramBotToken: '',   // .env ichidan keladi
    telegramChatId: '',     // .env ichidan keladi
    public: {
      siteName: 'Nevroslim'
    }
  },
  modules: ['@nuxt/image'],
  image: {
    format: ['avif', 'webp'], // brauzer qaysi formatni qo‘llasa, o‘shani beradi
    quality: 60,              // umumiy sifat (keyin komponentda override qilsa bo‘ladi)
    screens: { sm: 640, md: 768, lg: 1024, xl: 1280 }
  },
  // (ixtiyoriy) IPX keshini kuchli qilish
  routeRules: {
    '/_ipx/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } }
  },

  compatibilityDate: '2025-08-15'
})