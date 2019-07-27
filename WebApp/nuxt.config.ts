import colors from 'vuetify/es5/util/colors';
import NuxtConfiguration from '@nuxt/config';
import { IgnorePlugin } from 'webpack';

const config: NuxtConfiguration = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  env: {
    baseUrl: process.env.API_URL || 'http://localhost:5000'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: colors.green.base },
  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.scss'],
  router: {
    middleware: 'check-auth'
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/vee-validate.ts',
    '~/plugins/boringbank-api.ts'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/vuetify',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module'
  ],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      light: true,
      themes: {
        light: {
          /* App Theme */
          primary: '#F27781',
          secondary: '#18298C',
          tertiary: '#04BF8A',
          accent: '#F2CF1D',
          dark: '#332C29',

          /* Standard Colors */
          blue: '#039BE5',
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,

          /* Social Media Colors */
          facebook: '#3b5998',
          google: '#C94131'
        }
      }
    },
    options: {
      customProperties: true // Enable CSS Varaibles
    }
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: false,
    transpile: ['vuetify/lib'],
    plugins: [new IgnorePlugin(/^\.\/locale$/, /moment$/)],
    loaders: {
      vue: {
        transpileDependencies: ['vuex-module-decorators', 'vuetify'],
        // Transform component attribute values to 'require()' statements.
        transformAssetUrls: {
          'v-img': ['src', 'lazy-src'],
          'v-parallax': ['src']
        }
      }
    },
    babel: {
      plugins: [
        'lodash',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }]
      ]
    },
    // typescript: {
    //   typeCheck: true,
    //   ignoreNotFoundWarnings: true
    // },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  postcss: {
    'postcss-cssnext': {
      browsers: [
        'Chrome >= 45',
        'Firefox ESR',
        'Edge >= 15',
        'Explorer >= 11',
        'iOS >= 9',
        'Safari >= 9',
        'Android >= 4.4',
        'Opera >= 30'
      ]
    }
  }
};
export default config;
