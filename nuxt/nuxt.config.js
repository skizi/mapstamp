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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      // { src:'~/assets/js/libs/pixi.js', body:false, mode: 'client' },
      // { src:'~/assets/js/libs/leaflet.js', body:false, mode: 'client' },
      // { src:'~/assets/js/libs/GIFEncoder.js', type: 'text/javascript', body:false },
      // { src:'~/assets/js/libs/html2canvas.min.js', type: 'text/javascript', body:false },
    ]
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
      // { src: '~/plugins/Util', mode: 'client' },
      // { src: '~/plugins/UserAgent', mode: 'client' },
      // { src: '~/plugins/PixiView', mode: 'client' },
      // { src: '~/plugins/Map', mode: 'client' },
      // { src:'@/plugins/Util.js', ssr: false },
      // { src:'@/plugins/UserAgent.js', ssr: false },
      // { src:'@/plugins/PixiView.js', ssr: false },
      // { src:'@/plugins/Map.js', ssr: false },

    // { src: '~/plugins/libs/pixi.js', mode: 'client' },
    // { src: '~/plugins/libs/leaflet.js', mode: 'client' },
    // { src: '~/plugins/libs/GIFEncoder.js', mode: 'client' },
    // { src: '~/plugins/libs/html2canvas.min.js', mode: 'client' },
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
    vendor: ["jquery", /*'leaflet', 'pixi.js', 'html2canvas', 'gifencoder'*/],
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        // L: 'leaflet',
        // PIXI: 'pixi.js',
        // html2canvas : 'html2canvas',
        // GIFEncoder : 'gifencoder'
      })
    ],
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },

  }
}
