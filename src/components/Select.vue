<template>

    <select v-model="value" v-bind="attributes">
        <template v-for="option in filterOptions(options)">
            <optgroup v-if="option.label" :label="option.label">
                <option v-for="opt in option.options" :value="opt.value">{{ opt.text }}</option>
            </optgroup>
            <option v-else :value="option.value">{{ option.text }}</option>
        </template>
    </select>

</template>

<script>

    import Field from '../field';

    export default {

        extends: Field

    };

</script>