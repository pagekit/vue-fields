/* eslint-env node */

const vue = require('rollup-plugin-vue');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const {uglify} = require('rollup-plugin-uglify');
const {name, version, homepage} = require('./package.json');
const license =
    '/*!\n' +
    ' * ' + name + ' v' + version + '\n' +
    ' * ' + homepage + '\n' +
    ' * Released under the MIT License.\n' +
    ' */\n';

module.exports = [

    {
        file: `dist/${name}.js`,
        name: 'VueFields',
        format: 'umd'
    },
    {
        file: `dist/${name}.min.js`,
        name: 'VueFields',
        format: 'umd',
        plugins: [uglify({output: {preamble: license}})]
    },
    {
        file: `dist/${name}.esm.js`,
        format: 'es',
        footer: 'export {Field, Fields};'
    },
    {
        file: `dist/${name}.common.js`,
        format: 'cjs',
    }

].map(output => ({

    input: 'src/index.js',
    output: {banner: license, ...output},
    plugins: [
        vue(),
        babel({extensions: ['.js', '.vue']}),
        replace({__VERSION__: version}),
    ].concat(output.plugins)

}));
