<template>

    <div>
        <div v-for="field in fields" :key="field.name">
            <label v-if="field.type != 'checkbox'">{{ field.label }}</label>
            <component :is="field.component" :field="field" :values="values" @change="change"/>
        </div>
    </div>

</template>

<script>

    import FieldText from './components/Text.vue';
    import FieldTextarea from './components/Textarea.vue';
    import FieldRadio from './components/Radio.vue';
    import FieldCheckbox from './components/Checkbox.vue';
    import FieldSelect from './components/Select.vue';
    import FieldRange from './components/Range.vue';
    import FieldNumber from './components/Number.vue';
    import {get, set, each, warn, assign, evaluate, isArray, isString, isUndefined} from './util';

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
            return {Fields: this};
        },

        props: {

            config: {
                type: [Object, Array],
                default: () => {}
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
                return this.prepare();
            }

        },

        methods: {

            change(value, field) {

                set(this.values, field.name, value);

                if (!isUndefined(value)) {
                    this.$emit('change', value, field);
                }
            },

            evaluate(expr, values = this.values, config = this.config) {

                if (isString(expr)) {

                    const context = {$match, $values: values};

                    each(config, ({name = key}, key) =>
                        set(context, name, get(values, name))
                    );

                    return evaluate(this, expr, assign(context, values));
                }

                return expr.call(this, values, this);
            },

            prepare(config = this.config, prefix = this.prefix) {

                const arr = isArray(config), fields = [];

                each(config, (field, key) => {

                    field = assign({}, field);

                    if (!field.name && !arr) {
                        field.name = key;
                    }

                    if (field.name) {

                        if (!field.type) {
                            field.type = 'text';
                        }

                        if (!field.component) {
                            field.component = prefix + field.type;
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

        }

    };

    function $match(subject, pattern, flags) {
        return subject && (new RegExp(pattern, flags).test(subject));
    }

</script>