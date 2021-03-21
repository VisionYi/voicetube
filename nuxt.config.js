const isDevelopmentMode = process.env.NODE_ENV === 'development'
export default {
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'VoiceTube',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://cdn.rawgit.com' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.rawgit.com/filipelinhares/ress/master/dist/ress.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/base.scss',
    '@/assets/styles/grid.scss',
    '@/assets/styles/helpers.scss',
  ],
  styleResources: {
    scss: [
      '@/assets/styles/variables.scss',
      '@/assets/styles/mixins.scss'
    ]
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '@/components/base'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js',
    '@/plugins/vue-lazyload.js',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
    'nuxt-purgecss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  generate: {
    // auto build 404 page for `generate mode`
    fallback: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // when run production mode, `extractCSS` can make CSS order as the same with development mode
    // reference: https://nuxtjs.org/api/configuration-build/#extractcss
    extractCSS: isDevelopmentMode ? false : { ignoreOrder: true },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  }
}
