module.exports = {
  /*
   * Headers of the page
   */
  head: {
    title: 'MCU Power',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Power Rankings for the Marvel Cinematic Universe' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
   * Customize the progress bar color
   */
  loading: { color: '#3B8070' },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/font-awesome',
  ],

  css: ['uikit/dist/css/uikit.css'],

  plugins: [
    { src: '~/plugins/uikit.js', ssr: false },
  ],

  /*
   * Build configuration
   */
  build: {
    /*
     * Run ESLint on save
     */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  }
}
