// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@formkit/auto-animate/nuxt",
    "@nuxt/scripts",
  ],
  ssr: true,
  supabase: {
    redirect: false,
    key: process.env.SUPABASE_ANON_KEY,
    url: process.env.SUPABASE_URL,
  },
  fonts: {
    families: [
      {
        name: "Open Sans",
        weights: [400, 700],
      },
    ],
  },
});