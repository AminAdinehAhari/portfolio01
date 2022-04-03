
export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    target: 'static',
    router: {
        base: '/portfolio01/'
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'portfolio01',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/portfolio01/favicon.ico'}
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/scss/main.scss',
        '~/node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css',
        '~/assets/css/tailwind.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        {src: "@/plugins/labels"},
        {src: "@/plugins/texts"},
        {src: "@/plugins/configs"},
        {src: "@/plugins/files"},
        {src: "@/plugins/service"},
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/tailwindcss'
    ],

    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config.js',
        exposeConfig: true,
        config: {},
        injectPosition: 0,
        viewer: true,
    },


    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        postcss: {
            plugins: {
                'postcss-import': {},
                'tailwindcss': 'tailwind.config.js',
                'postcss-nested': {}
            }
        },
        preset: {
            stage: 1 // see https://tailwindcss.com/docs/using-with-preprocessors#future-css-featuress
        }
    }
}
