<template>

    <input v-model="value" v-bind="attributes" type="text">

</template>

<script>

    import Field from '../field';

    export default {

        extends: Field

    };

</script>