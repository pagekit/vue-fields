<template>

    <div>
        <div class="form-group" v-for="field in fields" :key="field.name">
            <label v-if="field.type != 'checkbox'">{{ field.label }}</label>
            <component class="form-control" :is="'field-'+field.type" :field="field"/>
        </div>
    </div>

</template>

<script>

    import FieldText from './field-text.vue';
    import FieldTextarea from './field-textarea.vue';
    import FieldRadio from './field-radio.vue';
    import FieldCheckbox from './field-checkbox.vue';
    import FieldSelect from './field-select.vue';
    import FieldRange from './field-range.vue';
    import FieldNumber from './field-number.vue';
    import {assign, evaluate, isString} from '../util';

    export default {

        components: {
            FieldText,
            FieldTextarea,
            FieldRadio,
            FieldCheckbox,
            FieldSelect,
            FieldRange,
            FieldNumber
        },

        props: {

            config: {
                type: [Array, Object],
                default: () => []
            },

            values: {
                type: Object
            }

        },

        computed: {

            fields() {
                return this.filterFields(this.config);
            }

        },

        methods: {

            evaluate(expr, data) {

                data = data || this.values;

                if (isString(expr)) {
                    return evaluate(expr, assign({$match}, data));
                }

                return expr.call(this, data, this);
            }

        }

    };

    function $match(subject, pattern, flags) {
        return subject && (new RegExp(pattern, flags).test(subject));
    }

</script>