import Vue from 'vue';
import VueFields from 'vue-fields';
import Fields from './fields.vue';

Vue.use(VueFields);

new Vue({

    el: '#app',

    extends: Fields

});