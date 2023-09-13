// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    /**
     * Page transition caused errors, so im using css now.
     */
     pageTransition: {
        name: 'page',
        mode: 'out-in',
     }
  },
})
