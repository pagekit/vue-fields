/* eslint-env node */

var fs = require('fs');
var zlib = require('zlib');
var rollup = require('rollup');
var uglify = require('uglify-js');
var vue = require('rollup-plugin-vue');
var buble = require('rollup-plugin-buble');
var {name, version, homepage} = require('../package.json');
var banner =
    '/*!\n' +
    ' * ' + name + ' v' + version + '\n' +
    ' * ' + homepage + '\n' +
    ' * Released under the MIT License.\n' +
    ' */\n';

rollup.rollup({
    input: 'src/index.js',
    plugins: [vue(), buble()]
})
.then(bundle =>
    bundle.generate({
        format: 'umd',
        banner: banner,
        name: 'VueFields'
    }).then(({code}) => write(`dist/${name}.js`, code, bundle))
)
.then(bundle =>
    write(`dist/${name}.min.js`, banner + '\n' +
    uglify.minify(read(`dist/${name}.js`)).code, bundle, true)
)
.then(bundle =>
    bundle.generate({
        format: 'es',
        banner: banner,
        footer: 'export {Field, Fields};'
    }).then(({code}) => write(`dist/${name}.esm.js`, code, bundle))
)
.then(bundle =>
    bundle.generate({
        format: 'cjs',
        banner: banner
    }).then(({code}) => write(`dist/${name}.common.js`, code, bundle))
)
.catch(logError);

function read(path) {
    return fs.readFileSync(path, 'utf8');
}

function write(dest, code, bundle, zip) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dest, code, err => {
            if (err) return reject(err);

            if (zip) {
                zlib.gzip(code, (err, zipped) => {
                    if (err) return reject(err);
                    console.log(blue(dest) + ' ' + getSize(code) + ' (' + getSize(zipped) + ' gzipped)');
                });
            } else {
                console.log(blue(dest) + ' ' + getSize(code));
            }

            resolve(bundle);
        });
    });
}

function getSize(code) {
    return (code.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
    console.log(e);
}

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}
