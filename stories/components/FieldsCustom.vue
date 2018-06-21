<template>

    <div>
        <div class="form-group" v-for="field in fields" :key="field.name">
            <label v-if="field.type != 'checkbox'">{{ field.label }}</label>
            <component class="form-control" :is="field.component" :field="field" :values="values" @change="change"/>
        </div>
    </div>

</template>

<script>

    import Vue from 'vue';

    export default {

        extends: Vue.component('fields')

    };

</script>
