<template>

    <div>
        <template v-for="option in filterOptions(options)">
            <input v-model="value" v-bind="attributes" :name="name" :value="option.value" type="radio"> <label>{{ option.text }}</label>
        </template>
    </div>

</template>

<script>

    import Field from '../field';

    export default {

        extends: Field

    };

</script>