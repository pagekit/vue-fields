/**
 * Install plugin.
 */

import Util from './util';
import Fields from './fields';

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.component('fields', Fields(Vue));

    Vue.config.optionMergeStrategies.fields = Vue.config.optionMergeStrategies.props;

}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
