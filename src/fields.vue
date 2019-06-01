<template>

    <component :is="tag">
        <slot :fields="fields" :evaluate="evaluate">
            <div v-for="field in fields" v-show="evaluate(field.show)" :key="field.name">
                <label v-if="field.type !== 'checkbox'">{{ field.label }}</label>
                <component :is="field.component" :field="field"/>
            </div>
        </slot>
    </component>

</template>

<script>

    import * as FieldComponents from './components/index.js';
    import {assign, each, get, parse, isArray, isString, isFunction, isUndefined, set, warn} from './util';

    export default {

        components: {
            ...FieldComponents
        },

        provide() {
            return {Fields: this};
        },

        props: {

            config: {
                type: [Object, Array],
                default: () => ({})
            },

            values: {
                type: Object,
                default: () => ({})
            },

            prefix: {
                type: String,
                default: 'field-'
            },

            tag: {
                type: String,
                default: 'div'
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

                this.$emit('change', value, field);
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

                        fields.push(field);

                    } else {
                        warn(`Field name missing ${JSON.stringify(field)}`);
                    }

                });

                return fields;
            },

            evaluate(expression, values = this.values) {

                try {

                    if (isUndefined(expression)) {
                        return true;
                    }

                    if (isString(expression)) {
                        expression = parse(expression);
                    }

                    if (isFunction(expression)) {
                        return expression.call(this, values, {$match, $get: key => get(values, key)});
                    }

                    return expression;

                } catch (e) {
                    warn(e);
                }

                return true;
            }

        }

    };

    function $match(subject, pattern, flags) {
        return subject && (new RegExp(pattern, flags).test(subject));
    }

</script>
