<template>

    <div>
        <div class="form-group" v-for="field in fields">
            <label v-if="field.type != 'checkbox'">{{ field.label }}</label>
            <component class="form-control" :is="'field-'+field.type" :field="field"/>
        </div>
    </div>

</template>

<script>

    import Vue from 'vue';

    export default {

        extends: Vue.component('fields')

    };

</script>
