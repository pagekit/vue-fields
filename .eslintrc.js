module.exports = {
    "root": true,
    "env": {
        "es6": true,
        "browser": true,
        "commonjs": true,
    },
    "plugins": [
        "vue"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "brace-style": ["error", "1tbs", {"allowSingleLine": true}],
        "comma-spacing": "error",
        "comma-style": "error",
        "eqeqeq": ["off", "smart"],
        "indent": "off",
        "indent-legacy": ["error", 4, {"SwitchCase": 1}],
        "key-spacing": "error",
        "keyword-spacing": "error",
        "linebreak-style": ["error", "unix"],
        "no-array-constructor": "error",
        "no-console": "off",
        "no-duplicate-imports": "error",
        "no-empty": ["error", {"allowEmptyCatch": true}],
        "no-extend-native": "error",
        "no-lone-blocks": "error",
        "no-multi-spaces": "error",
        "no-multiple-empty-lines": "error",
        "no-template-curly-in-string": "error",
        "no-trailing-spaces": "error",
        "no-unused-vars": ["error", {"vars": "local", "args": "none"}],
        "no-var": "error",
        "object-curly-spacing": "error",
        "prefer-const": "error",
        "quotes": ["error", "single", {"avoidEscape": true}],
        "semi": ["error", "always"],
        "space-before-blocks": "error",
        "space-in-parens": "error",
        "space-infix-ops": "error",
        "space-unary-ops": "error",
        "template-curly-spacing": "error",
        "vue/html-indent": ["error", 4],
        "vue/html-self-closing": ["error", {"html": {"normal": "never"}}],
        "vue/max-attributes-per-line": "off",
        "vue/require-default-prop": "off",
        "vue/require-v-for-key": "off"
    }
};
