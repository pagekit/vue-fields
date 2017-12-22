<template>

    <input type="checkbox" v-bind="attrs" v-model="value">

</template>


<script>

    import Field from '../field';
    import Vue from 'vue';

    export default {

        extends: Vue.extend(Field)

    };

</script>