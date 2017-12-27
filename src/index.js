/**
 * Install plugin.
 */

import Util from './util';
import Field from './field';
import Fields from './components/fields.vue';

export default function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.component('field', Field);
    Vue.component('fields', Fields);
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}
