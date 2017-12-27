<template>

    <select v-bind="attrs" v-model="value">
        <template v-for="option in filteredOptions">
            <optgroup :label="option.label" v-if="option.label">
                <option v-for="opt in option.options" :value="opt.value">{{ opt.text }}</option>
            </optgroup>
            <option :value="option.value" v-else>{{ option.text }}</option>
        </template>
    </select>

</template>

<script>

    import Field from '../field';

    export default {

        extends: Field

    };

</script>