<template>

    <input type="text" v-bind="attrs" v-model="value">

</template>

<script>

    import Field from '../field';

    export default {

        extends: Field

    };

</script>