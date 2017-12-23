<template>

    <div>
        <template v-for="option in options | options">
            <input type="radio" v-bind="attrs" :name="name" :value="option.value" v-model="value"> <label>{{ option.text }}</label>
        </template>
    </div>
</template>

<script>

    import Field from '../field';

    export default {

        extends: Field

    };

</script>