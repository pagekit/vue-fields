<template>

    <div>
        <div v-for="field in fields" :key="field.name">
            <label v-if="field.type != 'checkbox'">{{ field.label }}</label>
            <component :is="field.component" :field="field" :values="values" @change="change"/>
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
    import {get, set, each, warn, assign, evaluate, isArray, isString, isUndefined} from '../util';

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

        provide() {
            return {
                fields: this
            };
        },

        props: {

            config: {
                type: [Object, Array],
                required: true
            },

            values: {
                type: Object,
                default: () => {}
            },

            prefix: {
                type: String,
                default: 'field-'
            }

        },

        computed: {

            fields() {

                const arr = isArray(this.config), fields = [];

                each(this.config, (field, name) => {

                    field = assign({}, field);

                    if (!field.name && !arr) {
                        field.name = name;
                    }

                    if (field.name) {

                        if (!field.type) {
                            field.type = 'text';
                        }

                        if (!field.component) {
                            field.component = this.prefix + field.type;
                        }

                        if (!field.show || this.evaluate(field.show)) {
                            fields.push(field);
                        }

                    } else {
                        warn(`Field name missing ${JSON.stringify(field)}`);
                    }

                });

                return fields;
            }

        },

        methods: {

            change(field, value) {

                const prev = get(this.values, field.name);

                set(this.values, field.name, value);

                if (!isUndefined(value)) {
                    this.$emit('change', field, value, prev);
                }
            },

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