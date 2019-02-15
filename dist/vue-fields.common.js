/*!
 * vue-fields v1.1.1
 * https://github.com/pagekit/vue-fields
 * Released under the MIT License.
 */

'use strict';

/**
 * Utility functions.
 */
var _config = {},
    _set;

var assign = Object.assign || _assign;
var isArray = Array.isArray;
function Util (_ref) {
  var set = _ref.set,
      config = _ref.config;
  _set = set;
  _config = config;
}
function log(message, color) {
  if (color === void 0) {
    color = '#41B883';
  }

  if (typeof console !== 'undefined' && _config.devtools) {
    console.log("%c vue-fields %c " + message + " ", 'color: #fff; background: #35495E; padding: 1px; border-radius: 3px 0 0 3px;', "color: #fff; background: " + color + "; padding: 1px; border-radius: 0 3px 3px 0;");
  }
}
function warn(message, color) {
  if (color === void 0) {
    color = '#DB6B00';
  }

  log(message, color);
}
function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
function isString(val) {
  return typeof val === 'string';
}
function isFunction(val) {
  return typeof val === 'function';
}
function isUndefined(val) {
  return typeof val === 'undefined';
}
function get(obj, key, def) {
  var parts = key.split('.');

  for (var i = 0; i < parts.length; i++) {
    if (!isUndefined(obj[parts[i]])) {
      obj = obj[parts[i]];
    } else {
      return def;
    }
  }

  return obj;
}
function set(obj, key, val) {
  var parts = key.split('.');

  while (parts.length > 1) {
    var part = parts.shift();

    if (!isObject(obj[part])) {
      _set(obj, part, {});
    }

    obj = obj[part];
  }

  _set(obj, parts.shift(), val);
}
var parsedFunc = {};
var expressionRe = /((?:\d|true|false|null|undefined|(?:this\.|\$)[\w.$]+|\W)*)([\w][\w.]*)?/g;
var quotedStringRe = /([^"']+)((.)(?:[^\3\\]|\\.)*?\3|.)?/g;
function parse(expr) {
  return parsedFunc[expr] = parsedFunc[expr] || Function('$values', '$context', "with($context){return " + expr.replace(quotedStringRe, function (match, unquoted, quoted) {
    if (quoted === void 0) {
      quoted = '';
    }

    return unquoted.replace(expressionRe, function (match, prefix, expression) {
      if (prefix === void 0) {
        prefix = '';
      }

      return match ? "" + prefix + (expression ? "$get('" + expression + "')" : '') : '';
    }) + quoted;
  }) + "}");
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
/**
 * Object.assign() polyfill.
 */

function _assign(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (source) {
    Object.keys(source || {}).forEach(function (key) {
      return target[key] = source[key];
    });
  });
  return target;
}

var Field = {
  inject: ['Fields'],
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
      get: function get$$1() {
        return get(this.values, this.name);
      },
      set: function set$$1(value) {
        this.$emit('change', value, this);
      }
    },
    attributes: {
      get: function get$$1() {
        if (!this.Fields.evaluate(this.enable)) {
          return assign({
            disabled: 'true'
          }, this.attrs);
        }

        return this.attrs;
      }
    }
  },
  created: function created() {
    if (isUndefined(this.value) && !isUndefined(this.default)) {
      this.value = this.default;
    }
  },
  methods: {
    filterOptions: function filterOptions(options) {
      var _this = this;

      var opts = [];

      if (!options) {
        warn("Invalid options provided for " + this.name);
        return opts;
      }

      each(options, function (value, name) {
        if (isObject(value)) {
          opts.push({
            label: name,
            options: _this.filterOptions(value)
          });
        } else {
          opts.push({
            text: name,
            value: value
          });
        }
      });
      return opts;
    }
  }
};

var FieldText = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('input', _vm._b({
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.value,
        expression: "value"
      }],
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": _vm.value
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.value = $event.target.value;
        }
      }
    }, 'input', _vm.attributes, false));
  },
  staticRenderFns: [],
  extends: Field
};

var FieldTextarea = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('textarea', _vm._b({
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.value,
        expression: "value"
      }],
      domProps: {
        "value": _vm.value
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.value = $event.target.value;
        }
      }
    }, 'textarea', _vm.attributes, false));
  },
  staticRenderFns: [],
  extends: Field
};

var FieldRadio = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_vm._l(_vm.filterOptions(_vm.options), function (option) {
      return [_c('input', _vm._b({
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.value,
          expression: "value"
        }],
        attrs: {
          "name": _vm.name,
          "type": "radio"
        },
        domProps: {
          "value": option.value,
          "checked": _vm._q(_vm.value, option.value)
        },
        on: {
          "change": function change($event) {
            _vm.value = option.value;
          }
        }
      }, 'input', _vm.attributes, false)), _vm._v(" "), _c('label', [_vm._v(_vm._s(option.text))])];
    })], 2);
  },
  staticRenderFns: [],
  extends: Field
};

var FieldCheckbox = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('input', _vm._b({
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.value,
        expression: "value"
      }],
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": Array.isArray(_vm.value) ? _vm._i(_vm.value, null) > -1 : _vm.value
      },
      on: {
        "change": function change($event) {
          var $$a = _vm.value,
              $$el = $event.target,
              $$c = $$el.checked ? true : false;

          if (Array.isArray($$a)) {
            var $$v = null,
                $$i = _vm._i($$a, $$v);

            if ($$el.checked) {
              $$i < 0 && (_vm.value = $$a.concat([$$v]));
            } else {
              $$i > -1 && (_vm.value = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.value = $$c;
          }
        }
      }
    }, 'input', _vm.attributes, false));
  },
  staticRenderFns: [],
  extends: Field
};

var FieldSelect = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('select', _vm._b({
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.value,
        expression: "value"
      }],
      on: {
        "change": function change($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;
            return val;
          });
          _vm.value = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
        }
      }
    }, 'select', _vm.attributes, false), [_vm._l(_vm.filterOptions(_vm.options), function (option) {
      return [option.label ? _c('optgroup', {
        attrs: {
          "label": option.label
        }
      }, _vm._l(option.options, function (opt) {
        return _c('option', {
          domProps: {
            "value": opt.value
          }
        }, [_vm._v(_vm._s(opt.text))]);
      }), 0) : _c('option', {
        domProps: {
          "value": option.value
        }
      }, [_vm._v(_vm._s(option.text))])];
    })], 2);
  },
  staticRenderFns: [],
  extends: Field
};

var FieldRange = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('input', _vm._b({
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.value,
        expression: "value"
      }],
      attrs: {
        "type": "range"
      },
      domProps: {
        "value": _vm.value
      },
      on: {
        "__r": function __r($event) {
          _vm.value = $event.target.value;
        }
      }
    }, 'input', _vm.attributes, false));
  },
  staticRenderFns: [],
  extends: Field
};

var FieldNumber = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('input', _vm._b({
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.value,
        expression: "value"
      }],
      attrs: {
        "type": "number"
      },
      domProps: {
        "value": _vm.value
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.value = $event.target.value;
        }
      }
    }, 'input', _vm.attributes, false));
  },
  staticRenderFns: [],
  extends: Field
};

var Fields = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', _vm._l(_vm.fields, function (field) {
      return _c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.evaluate(field.show),
          expression: "evaluate(field.show)"
        }],
        key: field.name
      }, [field.type != 'checkbox' ? _c('label', [_vm._v(_vm._s(field.label))]) : _vm._e(), _vm._v(" "), _c(field.component, {
        tag: "component",
        attrs: {
          "field": field,
          "values": _vm.values
        },
        on: {
          "change": _vm.change
        }
      })], 1);
    }), 0);
  },
  staticRenderFns: [],
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
      Fields: this
    };
  },
  props: {
    config: {
      type: [Object, Array],
      default: function _default() {
        return {};
      }
    },
    values: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    prefix: {
      type: String,
      default: 'field-'
    }
  },
  computed: {
    fields: function fields() {
      return this.prepare();
    }
  },
  methods: {
    change: function change(value, field) {
      set(this.values, field.name, value);
      this.$emit('change', value, field);
    },
    prepare: function prepare(config, prefix) {
      if (config === void 0) {
        config = this.config;
      }

      if (prefix === void 0) {
        prefix = this.prefix;
      }

      var arr = isArray(config),
          fields = [];
      each(config, function (field, key) {
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
          warn("Field name missing " + JSON.stringify(field));
        }
      });
      return fields;
    },
    evaluate: function evaluate(expression, values) {
      if (values === void 0) {
        values = this.values;
      }

      try {
        if (isUndefined(expression)) {
          return true;
        }

        if (isString(expression)) {
          expression = parse(expression);
        }

        if (isFunction(expression)) {
          return expression.call(this, values, {
            $match: $match,
            $get: function $get(key) {
              return get(values, key);
            }
          });
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
  return subject && new RegExp(pattern, flags).test(subject);
}

/**
 * Install plugin.
 */
var Plugin = {
  Field: Field,
  Fields: Fields,
  install: function install(Vue) {
    if (this.installed) {
      return;
    }

    Util(Vue);
    log(this.version);
    Vue.component('field', Field);
    Vue.component('fields', Fields);
  },
  version: '1.1.1'
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin);
}

module.exports = Plugin;
