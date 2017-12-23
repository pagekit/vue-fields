<template>

    <input type="range" v-bind="attrs" v-model="value">

</template>

<script>

    import Field from '../field';

    export default {

        extends: Field

    };

</script>