<template>

    <textarea v-bind="attributes" v-model="value"></textarea>

</template>

<script>

    import Field from '../field';

    export default {

        extends: Field

    };

</script>