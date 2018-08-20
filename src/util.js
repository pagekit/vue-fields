/**
 * Utility functions.
 */

let debug = false, _set;

export const assign = Object.assign || _assign;

export const isArray = Array.isArray;

export default function ({set, config}) {
    _set = set;
    debug = config.debug || !config.silent;
}

export function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.log(`%c vue-fields %c ${msg} `, 'color: #fff; background: #35495E; padding: 1px; border-radius: 3px 0 0 3px;', 'color: #fff; background: #DB6B00; padding: 1px; border-radius: 0 3px 3px 0;');
    }
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

        if (!isObject(obj[part]) || isArray(obj[part])) {
            _set(obj, part, {});
        }

        obj = obj[part];
    }

    _set(obj, parts.shift(), val);
}

export function evaluate(expr, context) {

    try {
        return (Function(`with(this){return ${expr}}`)).call(context);
    } catch (e) {
        warn(e);
    }

    return false;
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
