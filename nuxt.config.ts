// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      title: "RankEdu - O`zbekiston milliy ta`lim platformasi",
      htmlAttrs: { lang: "uz" },
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      ],
    },
  },

  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "bootstrap-icons/font/bootstrap-icons.css",
    "@/assets/css/theme.css",
  ],

  plugins: [
    { src: "~/plugins/bootstrap.client.ts", mode: "client" },
    { src: "~/plugins/supabase.client.ts", mode: "client" }, // supabase plugin client-da yuklansin
  ],

  runtimeConfig: {
    public: {
      siteName: "RankEdu",
      // pastagi nomlar supabase plugin-da ishlatilishi uchun kichik harf va camelCase ga mos
      supabaseUrl: process.env.SUPABASE_URL || "",
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    },
  },

  modules: ["@nuxt/image"],
  image: {
    format: ["avif", "webp"],
    quality: 60,
    screens: { sm: 640, md: 768, lg: 1024, xl: 1280 },
  },
  routeRules: {
    "/_ipx/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
  },

  compatibilityDate: "2025-08-15",
});
