import template from './components/default.html';
import {get, set, each, warn, assign, evaluate, isArray, isString} from './util';
import FieldText from './components/field-text.vue';
import FieldTextarea from './components/field-textarea.vue';
import FieldRadio from './components/field-radio.vue';
import FieldCheckbox from './components/field-checkbox.vue';
import FieldSelect from './components/field-select.vue';
import FieldRange from './components/field-range.vue';
import FieldNumber from './components/field-number.vue';

export default function (Vue) {

    return {

        name: 'fields',

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

            getField(field) {

                if (this.values instanceof Vue && 'getField' in this.values) {
                    return this.values.getField(field);
                }

                return get(this.values, field.name);
            },

            setField(field, value, prev) {

                if (this.values instanceof Vue && 'setField' in this.values) {
                    this.values.setField(field, value, prev);
                } else {
                    set(this.values, field.name, value);
                }

                this.$emit('update', field, value, prev);
            },

            filterFields(config) {

                var arr = isArray(config), fields = [];

                each(config, (field, name) => {

                    if (!isString(field.name) && !arr) {
                        field = assign({name}, field);
                    }

                    if (!isString(field.type)) {
                        field = assign({type: 'text'}, field);
                    }

                    if (isString(field.name)) {

                        if (!field.show || this.evaluate(field.show)) {
                            fields.push(field);
                        }

                    } else {
                        warn(`Field name missing ${JSON.stringify(field)}`);
                    }

                });

                return fields;
            },

            evaluate(expr, data) {

                data = data || this.values;

                if (isString(expr)) {

                    var comp = new Vue({data});
                    var result = evaluate(expr, comp);

                    comp.$destroy();

                    return result;
                }

                return expr.call(this, data, this);
            }

        },

        fields: {},

        components: {
            FieldText,
            FieldTextarea,
            FieldRadio,
            FieldCheckbox,
            FieldSelect,
            FieldRange,
            FieldNumber
        },

        template

    };

};