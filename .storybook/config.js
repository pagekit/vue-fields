import Vue from 'vue';
import VueFields from 'vue-fields';
import {configure} from '@storybook/vue';

Vue.use(VueFields);

configure(() => {

    require('../stories');

}, module);