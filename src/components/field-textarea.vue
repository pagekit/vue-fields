<template>

    <textarea v-bind="attrs" v-model="value"></textarea>

</template>

<script>

    import Field from '../field';

    export default {

        extends: Field

    };

</script>