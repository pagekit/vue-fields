<template>

    <textarea v-model="value" v-bind="attributes"></textarea>

</template>

<script>

    import Field from '../field';

    export default {

        extends: Field

    };

</script>