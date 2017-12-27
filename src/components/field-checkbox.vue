<template>

    <input type="checkbox" v-bind="attributes" v-model="value">

</template>


<script>

    import Field from '../field';

    export default {

        extends: Field

    };

</script>