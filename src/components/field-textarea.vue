<template>

    <textarea v-bind="attrs" v-model="value"></textarea>

</template>

<script>

    import Field from '../field';
    import Vue from 'vue';

    export default {

        extends: Vue.extend(Field)

    };

</script>