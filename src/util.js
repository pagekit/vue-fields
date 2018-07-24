/**
 * Utility functions.
 */

let debug = false, _set;

export const isArray = Array.isArray;

export default function (Vue) {
    _set = Vue.set;
    debug = Vue.config.debug || !Vue.config.silent;
}

export function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.warn(`[VueFields warn]: ${msg}`);
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
        return false;
    }
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

export const assign = Object.assign || function (target) {

    for (let i = 1; i < arguments.length; i++) {

        const source = arguments[i];

        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
};
