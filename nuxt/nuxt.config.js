const webpack = require('webpack')
const path = require("path");

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=375' },
      { name: 'description', content: 'スタンプでデコって現在地を共有できるwebサービス、MapStamp！' },
      { property: 'og:site_name', content: 'マップスタンプ MapStamp' },
      { property: 'og:title', content: 'マップスタンプ MapStamp' },
      { property: 'og:description', content: 'スタンプでデコって現在地を共有できるwebサービス、MapStamp！' },
      { property: 'og:image', content: 'https://www.mapstamp.net/images/ogp.png' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.mapstamp.net' },
      { property: 'fb:app_id', content: '1604539589666300' },
      { property: 'twitter:account_id', content: '77250350' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@awesome_now' },
      { property: 'twitter:title', content: 'マップスタンプ MapStamp' },
      { property: 'twitter:description', content: 'スタンプでデコって現在地を共有できるwebサービス、MapStamp！' },
      { property: 'twitter:image', content: 'https://www.mapstamp.net/images/ogp.png' },
      { property: 'twitter:domain', content: 'mapstamp.net' },
      { property: 'twitter:creator', content: '@awesome_now' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src:'js/libs/pixi.js', body:false, mode: 'client' },
    ],
    titleTemplate: '%s - マップスタンプ MapStamp',
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/sass/all.scss', lang: 'scss' },
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    ['nuxt-sass-resources-loader', [ '~/assets/sass/_vars.scss', ]],
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: [ /*'leaflet', 'pixi.js', 'html2canvas', 'gifencoder'*/],
    plugins: [
      new webpack.ProvidePlugin({
        // $: 'jquery',
        // L: 'leaflet',
        // PIXI: 'pixi.js',
        // html2canvas : 'html2canvas',
        // GIFEncoder : 'gifencoder'
      })
    ],
    /*
    ** Run ESLint on save
    */
    extend(config) {
      if (process.server && process.browser) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }

  },

  server: {
    port: 3000,
    // host: '160.16.62.37'
  },

  // serverMiddleware: ['~/server']

}
