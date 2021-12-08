module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        '@vue/airbnb',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    globals: {
        SuperMap: 'readonly',
    },
    settings: {
        'import/resolver': {
        alias: {
            map: [
                ['@', './src'],
            ],
            extensions: ['.js', '.vue', '.ts', '.tsx'],
        },
        },
    },
    rules: {
        'indent': ['off', 2], //缩进
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "global-require": 0,
        'linebreak-style': ['off', 'windows'],
        "@typescript-eslint/no-this-alias": [
            "error",
            {
                "allowDestructuring": true, // Allow `const { props, state } = this`; false by default
                "allowedNames": ["self", "that"] // Allow `const vm= this`; `[]` by default
            }
        ],
        '@typescript-eslint/no-var-requires': 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'no-else-return': 0
    }
};