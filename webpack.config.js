/* eslint-env node */

module.exports = (env, argv) => ({

    entry: {
        'examples/index': './examples/index',
    },

    output: {
        filename: './[name].min.js'
    },

    externals: {
        vue: 'Vue'
    },

    resolve: {
        alias: {
            'vue-fields': __dirname + '/src'
        }
    },

    module: {

        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'buble-loader'
            }
        ]
    }

});
