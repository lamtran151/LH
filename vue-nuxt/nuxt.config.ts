// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 8080,
  },
  app: {
    head: {
      script: [
        {
          type: "text/javascript",
          src: "/lib/abp.js",
        },
      ],
    },
  },

  css: ["@/assets/css/_tailwind.css", "@/assets/css/app.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      "postcss-import": {},
      "postcss-advanced-variables": {},
      "tailwindcss/nesting": {},
    },
  },
  modules: [
    // ...
    "@pinia/nuxt",
    "@vee-validate/nuxt"
  ],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  plugins: [
    { mode: 'client', src: 'plugins/main' }
  ],
});
