<template>

    <select v-bind="attrs" v-model="value">
        <template v-for="option in options | options">
            <optgroup :label="option.label" v-if="option.label">
                <option v-for="opt in option.options" :value="opt.value">{{ opt.text }}</option>
            </optgroup>
            <option :value="option.value" v-else>{{ option.text }}</option>
        </template>
    </select>

</template>

<script>

    import Field from '../field';
    import Vue from 'vue';

    export default {

        extends: Vue.extend(Field)

    };

</script>