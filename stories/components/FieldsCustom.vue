<template>

    <div>
        <div v-for="field in fields" :key="field.name" class="form-group">
            <label v-if="field.type != 'checkbox'">{{ field.label }}</label>
            <component :is="field.component" :field="field" :values="values" class="form-control" @change="change"/>
        </div>
    </div>

</template>

<script>

    import Vue from 'vue';

    export default {

        extends: Vue.component('fields')

    };

</script>
