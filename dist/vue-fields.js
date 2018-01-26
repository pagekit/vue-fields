/*!
 * vue-fields v1.0.2
 * https://github.com/pagekit/vue-fields
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueFields = factory());
}(this, (function () { 'use strict';

/**
 * Utility functions.
 */

var debug = false;
var _set;

var isArray = Array.isArray;

function Util (Vue) {
    _set = Vue.set;
    debug = Vue.config.debug || !Vue.config.silent;
}

function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.warn(("[VueForm warn]: " + msg));
    }
}

function isString(val) {
    return typeof val === 'string';
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isUndefined(val) {
    return typeof val === 'undefined';
}

function get(obj, key, def) {

    var parts = key.split('.'), i;

    for (i = 0; i < parts.length; i++) {
        if (!isUndefined(obj[parts[i]])) {
            obj = obj[parts[i]];
        } else {
            return def;
        }
    }

    return obj;
}

function set(obj, key, val) {

    var parts = key.split('.'), part;

    while (parts.length > 1) {

        part = parts.shift();

        if (!isObject(obj[part]) || isArray(obj[part])) {
            _set(obj, part, {});
        }

        obj = obj[part];
    }

    _set(obj, parts.shift(), val);
}

function evaluate(expr, context) {
    try {
        return (Function(("with(this){return " + expr + "}"))).call(context);
    } catch (e) {
        return false;
    }
}

function each(obj, iterator) {

    var i, key;

    if (typeof obj.length == 'number') {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

var assign = Object.assign || function (target) {
    var arguments$1 = arguments;


    for (var i = 1; i < arguments.length; i++) {

        var source = arguments$1[i];

        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
};

var Field = {

    inject: ['fields'],

    props: {

        field: {
            type: Object,
            required: true
        },

        values: {
            type: Object,
            required: true
        }

    },

    data: function data() {
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

            get: function get$1() {
                return get(this.values, this.name);
            },

            set: function set$$1(value) {
                this.$emit('change', value, this);
            }

        },

        attributes: {

            get: function get$$1() {

                if (this.enable && !this.fields.evaluate(this.enable)) {
                    return assign({disabled: 'true'}, this.attrs);
                }

                return this.attrs;
            }

        },

    },

    created: function created() {

        if (isUndefined(this.value)) {
            this.value = this.default;
        }

    },

    methods: {

        filterOptions: function filterOptions(options) {
            var this$1 = this;


            var opts = [];

            if (!options) {
                warn(("Invalid options provided for " + (this.name)));
                return opts;
            }

            each(options, function (value, name) {
                if (isObject(value)) {
                    opts.push({label: name, options: this$1.filterOptions(value)});
                } else {
                    opts.push({text: name, value: value});
                }
            });

            return opts;
        }

    }

};

var FieldText = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],attrs:{"type":"text"},domProps:{"value":(_vm.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.value=$event.target.value;}}},'input',_vm.attributes,false))},staticRenderFns: [],

    extends: Field

};

var FieldTextarea = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('textarea',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],domProps:{"value":(_vm.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.value=$event.target.value;}}},'textarea',_vm.attributes,false))},staticRenderFns: [],

    extends: Field

};

var FieldRadio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._l((_vm.filterOptions(_vm.options)),function(option){return [_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],attrs:{"type":"radio","name":_vm.name},domProps:{"value":option.value,"checked":_vm._q(_vm.value,option.value)},on:{"change":function($event){_vm.value=option.value;}}},'input',_vm.attributes,false)),_vm._v(" "),_c('label',[_vm._v(_vm._s(option.text))])]})],2)},staticRenderFns: [],

    extends: Field

};

var FieldCheckbox = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.value)?_vm._i(_vm.value,null)>-1:(_vm.value)},on:{"change":function($event){var $$a=_vm.value,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.value=$$a.concat([$$v]));}else{$$i>-1&&(_vm.value=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.value=$$c;}}}},'input',_vm.attributes,false))},staticRenderFns: [],

    extends: Field

};

var FieldSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('select',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.value=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},'select',_vm.attributes,false),[_vm._l((_vm.filterOptions(_vm.options)),function(option){return [(option.label)?_c('optgroup',{attrs:{"label":option.label}},_vm._l((option.options),function(opt){return _c('option',{domProps:{"value":opt.value}},[_vm._v(_vm._s(opt.text))])})):_c('option',{domProps:{"value":option.value}},[_vm._v(_vm._s(option.text))])]})],2)},staticRenderFns: [],

    extends: Field

};

var FieldRange = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],attrs:{"type":"range"},domProps:{"value":(_vm.value)},on:{"__r":function($event){_vm.value=$event.target.value;}}},'input',_vm.attributes,false))},staticRenderFns: [],

    extends: Field

};

var FieldNumber = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],attrs:{"type":"number"},domProps:{"value":(_vm.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.value=$event.target.value;}}},'input',_vm.attributes,false))},staticRenderFns: [],

    extends: Field

};

var Fields = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',_vm._l((_vm.fields),function(field){return _c('div',{key:field.name},[(field.type != 'checkbox')?_c('label',[_vm._v(_vm._s(field.label))]):_vm._e(),_vm._v(" "),_c(field.component,{tag:"component",attrs:{"field":field,"values":_vm.values},on:{"change":_vm.change}})],1)}))},staticRenderFns: [],

    components: {
        FieldText: FieldText,
        FieldTextarea: FieldTextarea,
        FieldRadio: FieldRadio,
        FieldCheckbox: FieldCheckbox,
        FieldSelect: FieldSelect,
        FieldRange: FieldRange,
        FieldNumber: FieldNumber
    },

    provide: function provide() {
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
            default: function () {}
        },

        prefix: {
            type: String,
            default: 'field-'
        }

    },

    computed: {

        fields: function fields() {
            return this.prepare(this.config, this.prefix);
        }

    },

    methods: {

        change: function change(value, field) {

            set(this.values, field.name, value);

            if (!isUndefined(value)) {
                this.$emit('change', value, field);
            }
        },

        evaluate: function evaluate$1(expr, data) {

            data = data || this.values;

            if (isString(expr)) {
                return evaluate(expr, assign({$match: $match}, data));
            }

            return expr.call(this, data, this);
        },

        prepare: function prepare(config, prefix) {
            var this$1 = this;


            var arr = isArray(config), fields = [];

            prefix = prefix || this.prefix;

            each(config, function (field, name) {

                field = assign({}, field);

                if (!field.name && !arr) {
                    field.name = name;
                }

                if (field.name) {

                    if (!field.type) {
                        field.type = 'text';
                    }

                    if (!field.component) {
                        field.component = prefix + field.type;
                    }

                    if (!field.show || this$1.evaluate(field.show)) {
                        fields.push(field);
                    }

                } else {
                    warn(("Field name missing " + (JSON.stringify(field))));
                }

            });

            return fields;
        }

    }

};

function $match(subject, pattern, flags) {
    return subject && (new RegExp(pattern, flags).test(subject));
}

/**
 * Install plugin.
 */

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.component('field', Field);
    Vue.component('fields', Fields);
}

plugin.Field = Field;
plugin.Fields = Fields;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

return plugin;

})));