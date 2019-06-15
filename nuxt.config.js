import pkg from './package'

export default {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: 'Give To UC | University of Cincinnati Foundation',
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description
            }
        ],
        link: [{
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }, {
                rel: 'stylesheet',
                type: 'text/css',
                href: 'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,700,300,600,800,400'
            }, {
                rel: 'stylesheet',
                type: 'text/css',
                href: 'https://fonts.googleapis.com/css?family=Bree+Serif'
            },
            // {
            //   rel: 'stylesheet',
            //   type: 'text/css',
            //   href: 'https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css'
            // },
            {
                rel: 'stylesheet',
                href: 'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
                integrity: 'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay',
                crossorigin: 'anonymous'
            },
            {
                rel: 'stylesheet',
                type: 'text/css',
                href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
            },
            {
                rel: 'stylesheet',
                type: 'text/css',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'
            },
        ],
    },

    /*
     ** Customize the progress-bar color
     */
    loading: false,

    // loading: {
    //     color: '#fff'
    // },

    /*
     ** Global CSS
     */
    css: ['@fortawesome/fontawesome-svg-core/styles.css', '@/assets/scss/style.scss', '@/assets/scss/Animations.scss'],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/fontawesome.js', '~/plugins/scroll-to.js'],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://bootstrap-vue.js.org/docs/
        '@nuxtjs/pwa',
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios', ,
        ['vue-scrollto/nuxt', {
            duration: 500
        }]
    ],

    router: {
        middleware: 'pages'
    },

    axios: {
        // proxyHeaders: false
    },

    /* Layout Transitions */
    // transition: {
    //     name: "title-anim",
    //     mode: "out-in"
    // },
    /* Page Transitions */
    // pageTransition: {
    //     name: "default",
    //     mode: "out-in"
    // },

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
}
