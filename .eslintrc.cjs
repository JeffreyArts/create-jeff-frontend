module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "parser": "@typescript-eslint/parser",
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint",
        "@stylistic/ts"
    ],
    "rules": {
        "@stylistic/ts/indent": ["error", 4],
        "@stylistic/ts/quotes": [ "error", "double" ],
        "@stylistic/ts/semi": [ "error", "never" ],
        "@stylistic/ts/object-curly-spacing": [ "error", "always", { "objectsInObjects": false }],

        "linebreak-style": [ "error", "unix" ],
        "vue/multi-word-component-names": ["error", { "ignores": ["icon"] }],
        "vue/order-in-components": ["error", {
            "order": [
			  "el",
			  "name",
			  "key",
			  "parent",
			  "functional",
			  ["delimiters", "comments"],
			  ["components", "directives", "filters"],
			  "extends",
			  "mixins",
			  ["provide", "inject"],
			  "ROUTER_GUARDS",
			  "layout",
			  "middleware",
			  "validate",
			  "scrollToTop",
			  "transition",
			  "loading",
			  "inheritAttrs",
			  "model",
			  ["props", "propsData"],
			  "emits",
			  "setup",
			  "asyncData",
			  "data",
			  "fetch",
			  "head",
			  "computed",
			  "watch",
			  "watchQuery",
			  "LIFECYCLE_HOOKS",
			  "methods",
			  ["template", "render"],
			  "renderError"
            ]
		  }]
    }
}
