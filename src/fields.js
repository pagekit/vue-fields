import Fields from './components/fields.vue';
import {get, set, each, warn, assign, isArray, isString} from './util';

export default function (Vue) {

    return {

        extends: Fields,

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
            }

        }

    };

}