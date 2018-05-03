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
      { name: 'apple-mobile-web-app-title', content: 'MCU Power' },
      { name: 'application-name', content: 'MCU Power' },
      { name: 'msapplication-TileColor', content: '#333333' },
      { name: 'theme-color', content: '#333333' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?M4yvjBwE7j' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?M4yvjBwE7j' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png?v=M4yvjBwE7j' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png?v=M4yvjBwE7j' },
      { rel: 'manifest', href: '/site.webmanifest?v=M4yvjBwE7j' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg?v=M4yvjBwE7j', color: '#333333' },
      { rel: 'shortcut icon', href: '/favicon.ico?v=M4yvjBwE7j' }
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
    'bootstrap-vue/nuxt',
    ['nuxt-matomo', { matomoUrl: '//matomo.capoeiraonline.org/piwik/', siteId: 2 }],
  ],

  sitemap: {
    generate: true,
    hostname: 'https://www.mcupower.com/',
  },

  css: [
    '@/assets/scss/index.scss',
  ],

  plugins: [
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

      const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader')
      vueLoader.options.transformToRequire = {
        'img': 'src',
        'image': 'xlink:href',
        'b-img': 'src',
        'b-img-lazy': ['src', 'blank-src'],
        'b-card': 'img-src',
        'b-card-img': 'img-src',
        'b-carousel-slide': 'img-src',
        'b-embed': 'src'
      };
    },
  }
}
