import {get, each, warn, assign, isObject, isUndefined} from './util';

export default {

    inject: ['Fields'],

    props: {

        field: {
            type: Object,
            required: true
        }

    },

    data() {
        return assign({
            name: '',
            label: '',
            attrs: {},
            options: [],
            default: undefined
        }, this.field);
    },

    computed: {

        value: {

            get() {

                const value = get(this.Fields.values, this.name);

                if (isUndefined(value) && !isUndefined(this.default)) {
                    return this.value = this.default;
                }

                return value;
            },

            set(value) {
                this.Fields.change(value, this.field);
            }

        },

        attributes: {

            get() {

                if (!this.Fields.evaluate(this.enable)) {
                    return assign({disabled: 'true'}, this.attrs);
                }

                return this.attrs;
            }

        },

    },

    methods: {

        filterOptions(options) {

            const opts = [];

            if (!options) {
                warn(`Invalid options provided for ${this.name}`);
                return opts;
            }

            each(options, (value, name) => {
                if (isObject(value)) {
                    opts.push({label: name, options: this.filterOptions(value)});
                } else {
                    opts.push({text: name, value: value});
                }
            });

            return opts;
        }

    }

};
