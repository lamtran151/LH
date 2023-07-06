// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '@/assets/css/_tailwind.css',
    '@/assets/css/app.scss',
],
postcss: {
  plugins: {
      tailwindcss: {},
      autoprefixer: {},
      "postcss-import": {},
      "postcss-advanced-variables": {},
      "tailwindcss/nesting": {}
  },
},
})
