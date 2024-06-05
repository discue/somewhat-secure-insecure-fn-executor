const globals = require('globals')
const js = require('@eslint/js')
const jsdoc = require('eslint-plugin-jsdoc')

module.exports = [
    js.configs.recommended,
    jsdoc.configs['flat/recommended-error'],
    {
        ignores: ['test', 'test-*/**'],
    },
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'commonjs',
            globals: {
                ...globals.node
            }
        },
        rules: {
            'jsdoc/require-returns-description': 'off',
            'jsdoc/tag-lines': 'off',
            'jsdoc/no-defaults': 'off',
            'no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                }
            ],
            'quotes': [
                'error',
                'single',
                {
                    'allowTemplateLiterals': true
                }
            ]
        }
    }
]
