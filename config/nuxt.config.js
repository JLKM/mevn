const webpack = require('webpack');

module.exports = {
    build: {
        vendor:['bootstrap','jquery'],
        plugins:[
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
                jquery: 'jquery',
                $sg:"~plugins/scms-global.js"
            })
        ]
    },
    head:{
        link:[
            { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' },
            { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
            { rel: 'stylesheet', href: '/style/main.css' },
            { rel: 'icon', type:'image/png', href:'/images/favicon.png'}
        ]
    },
    plugins: ['~plugins/scms-global'],
    store: true,
    cache: true,
    dev: (process.env.NODE_ENV !== 'production'),
}