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

  compatibilityDate: '2025-08-15'
})