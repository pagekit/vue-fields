/**
 * Utility functions.
 */

let _config = {}, _set;

export const assign = Object.assign || _assign;

export const isArray = Array.isArray;

export default function ({set, config}) {
    _set = set;
    _config = config;
}

export function log(message, color = '#41B883') {
    if (typeof console !== 'undefined' && _config.devtools) {
        console.log(`%c vue-fields %c ${message} `, 'color: #fff; background: #35495E; padding: 1px; border-radius: 3px 0 0 3px;', `color: #fff; background: ${color}; padding: 1px; border-radius: 0 3px 3px 0;`);
    }
}

export function warn(message, color = '#DB6B00') {
    log(message, color);
}

export function isString(val) {
    return typeof val === 'string';
}

export function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

export function isUndefined(val) {
    return typeof val === 'undefined';
}

export function get(obj, key, def) {

    const parts = key.split('.');

    for (let i = 0; i < parts.length; i++) {
        if (!isUndefined(obj[parts[i]])) {
            obj = obj[parts[i]];
        } else {
            return def;
        }
    }

    return obj;
}

export function set(obj, key, val) {

    const parts = key.split('.');

    while (parts.length > 1) {

        const part = parts.shift();

        if (!isObject(obj[part])) {
            _set(obj, part, {});
        }

        obj = obj[part];
    }

    _set(obj, parts.shift(), val);
}

const parsedFunc = {};
const expressionRe = /((?:\d|true|false|null|undefined|(?:this\.|\$)[\w.$]+|\W)*)([\w][\w.]*)?/g;
const quotedStringRe = /([^"']+)((.)(?:[^\3\\]|\\.)*?\3|.)?/g;

export function parse(expr) {
    return parsedFunc[expr] = parsedFunc[expr] ||
        Function('$values', '$context', `with($context){return ${expr.replace(quotedStringRe,
            (match, unquoted, quoted = '') => unquoted.replace(expressionRe,
                (match, prefix = '', expression) => match ? `${prefix}${expression ? `$get('${expression}')` : ''}` : ''
            ) + quoted
    )}}`);
}

export function each(obj, iterator) {

    let i, key;

    if (typeof obj.length == 'number') {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

/**
 * Object.assign() polyfill.
 */
function _assign(target, ...sources) {

    sources.forEach(source => {
        Object.keys(source || {}).forEach(
            key => target[key] = source[key]
        );
    });

    return target;
}
