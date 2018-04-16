module.exports = {
  /*
   * Headers of the page
   */
  head: {
    title: 'The Stars of Avengers: Infinity War and the Marvel Cinematic Universe | MCU Power',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Power Rankings of actors and films in the Marvel Cinematic Universe, including Avengers: Infinity War!' },
      { name: 'google-site-verification', content: 'N3xu6QlIu2uUYtlVcqOqO8YoFDSjJs_QAuWPYHTnBrg' },
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
   * Customize the progress bar color
   */
  loading: { color: '#3B8070' },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/font-awesome',
    '@nuxtjs/sitemap',
  ],

  sitemap: {
    generate: true,
    hostname: 'https://www.mcupower.com/',
  },

  css: [
    'uikit/dist/css/uikit.css',
    '@/assets/less/index.less',
  ],

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
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }

      config.module.rules.find(
        rule => rule.loader === 'url-loader'
      ).exclude = /\.(jpe?g|png)$/;

      config.module.rules.push({
        test: /\.(jpe?g|png)$/i,
        loader: "responsive-loader",
        options: {
          size: 350,
          format: 'png',
        },
      });
    },
  }
}
