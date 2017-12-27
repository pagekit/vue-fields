import Vue from 'vue';
import VueFields from 'vue-fields';
import Application from './app.vue';

Vue.use(VueFields);

new Vue({

    el: '#app',

    extends: Application

});