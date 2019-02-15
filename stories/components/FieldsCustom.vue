<template functional>

    <div>
        <div v-for="field in parent.fields" v-show="parent.evaluate(field.show)" :key="field.name" class="form-group">
            <label v-if="field.type != 'checkbox'">{{ field.label }}</label>
            <component :is="field.component" :field="field" :values="parent.values" class="form-control" @change="parent.change"/>
        </div>
    </div>

</template>
