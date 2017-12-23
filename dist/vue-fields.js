/*!
 * vue-form v1.0.0
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

    props: ['field'],

    data: function data() {
        return assign({
            name: '',
            type: 'text',
            label: '',
            options: [],
            default: undefined
        }, this.field);
    },

    computed: {

        attrs: {

            get: function get$$1() {

                if (this.enable && !this.$parent.evaluate(this.enable)) {
                    return assign({disabled: 'true'}, this.$data);
                }

                return this.$data;
            },

            cache: false
        },

        value: {

            get: function get$$1() {

                var value = this.$parent.getField(this);

                if (isUndefined(value) && !isUndefined(this.default)) {

                    value = this.default;

                    if (value) {
                        this.$parent.setField(this, value);
                    }
                }

                return value;
            },

            set: function set$$1(value) {

                if (!isUndefined(this.value) || value) {
                    this.$parent.setField(this, value, this.value);
                }

            },

            cache: false
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

    },

    filters: {

        options: function options(options$1) {
            return this.filterOptions(options$1);
        }

    }

};

var FieldText = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],attrs:{"type":"text"},domProps:{"value":(_vm.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.value=$event.target.value;}}},'input',_vm.attrs,false))},staticRenderFns: [],

    extends: Field

};

var FieldTextarea = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('textarea',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],domProps:{"value":(_vm.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.value=$event.target.value;}}},'textarea',_vm.attrs,false))},staticRenderFns: [],

    extends: Field

};

var FieldRadio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._l((_vm.options | _vm.options),function(option){return [_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],attrs:{"type":"radio","name":_vm.name},domProps:{"value":option.value,"checked":_vm._q(_vm.value,option.value)},on:{"change":function($event){_vm.value=option.value;}}},'input',_vm.attrs,false)),_vm._v(" "),_c('label',[_vm._v(_vm._s(option.text))])]})],2)},staticRenderFns: [],

    extends: Field

};

var FieldCheckbox = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.value)?_vm._i(_vm.value,null)>-1:(_vm.value)},on:{"change":function($event){var $$a=_vm.value,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.value=$$a.concat([$$v]));}else{$$i>-1&&(_vm.value=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.value=$$c;}}}},'input',_vm.attrs,false))},staticRenderFns: [],

    extends: Field

};

var FieldSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('select',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.value=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},'select',_vm.attrs,false),[_vm._l((_vm.options | _vm.options),function(option){return [(option.label)?_c('optgroup',{attrs:{"label":option.label}},_vm._l((option.options),function(opt){return _c('option',{domProps:{"value":opt.value}},[_vm._v(_vm._s(opt.text))])})):_c('option',{domProps:{"value":option.value}},[_vm._v(_vm._s(option.text))])]})],2)},staticRenderFns: [],

    extends: Field

};

var FieldRange = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],attrs:{"type":"range"},domProps:{"value":(_vm.value)},on:{"__r":function($event){_vm.value=$event.target.value;}}},'input',_vm.attrs,false))},staticRenderFns: [],

    extends: Field

};

var FieldNumber = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],attrs:{"type":"number"},domProps:{"value":(_vm.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.value=$event.target.value;}}},'input',_vm.attrs,false))},staticRenderFns: [],

    extends: Field

};

var Fields$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',_vm._l((_vm.fields),function(field){return _c('div',{key:field.name,staticClass:"form-group"},[(field.type != 'checkbox')?_c('label',[_vm._v(_vm._s(field.label))]):_vm._e(),_vm._v(" "),_c('field-'+field.type,{tag:"component",staticClass:"form-control",attrs:{"field":field}})],1)}))},staticRenderFns: [],

    components: {
        FieldText: FieldText,
        FieldTextarea: FieldTextarea,
        FieldRadio: FieldRadio,
        FieldCheckbox: FieldCheckbox,
        FieldSelect: FieldSelect,
        FieldRange: FieldRange,
        FieldNumber: FieldNumber
    },

    props: {

        config: {
            type: [Array, Object],
            default: function () { return []; }
        },

        values: {
            type: Object
        }

    },

    computed: {

        fields: function fields() {
            return this.filterFields(this.config);
        }

    },

    methods: {

        evaluate: function evaluate$1(expr, data) {

            data = data || this.values;

            if (isString(expr)) {
                return evaluate(expr, assign({$match: $match}, data));
            }

            return expr.call(this, data, this);
        }

    }

};

function $match(subject, pattern, flags) {
    return subject && (new RegExp(pattern, flags).test(subject));
}

function Fields (Vue) {

    return {

        extends: Fields$1,

        methods: {

            getField: function getField(field) {

                if (this.values instanceof Vue && 'getField' in this.values) {
                    return this.values.getField(field);
                }

                return get(this.values, field.name);
            },

            setField: function setField(field, value, prev) {

                if (this.values instanceof Vue && 'setField' in this.values) {
                    this.values.setField(field, value, prev);
                } else {
                    set(this.values, field.name, value);
                }

                this.$emit('update', field, value, prev);
            },

            filterFields: function filterFields(config) {
                var this$1 = this;


                var arr = isArray(config), fields = [];

                each(config, function (field, name) {

                    if (!isString(field.name) && !arr) {
                        field = assign({name: name}, field);
                    }

                    if (!isString(field.type)) {
                        field = assign({type: 'text'}, field);
                    }

                    if (isString(field.name)) {

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

}

/**
 * Install plugin.
 */

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.component('fields', Fields(Vue));
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

return plugin;

})));
