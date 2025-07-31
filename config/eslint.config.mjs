import { defineConfig, globalIgnores } from 'eslint/config';
import _import from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import { fixupPluginRules, fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

import parser from '@typescript-eslint/parser';

import tseslint from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    globalIgnores([
        'projects/**/*',
        '.vite/**/*',
        'dist/**/*',
        'node_modules/**/*',
    ]),
    { ignores: ['dist'] },
    {
        extends: compat.extends('eslint:recommended'),

        plugins: {
            import: fixupPluginRules(_import),
            jsdoc,
            '@typescript-eslint': tseslint,
        },

        languageOptions: {
            globals: {
                ...globals.commonjs,
                ...globals.node,
                ...globals.mocha,
                ...globals.jasmine,
                ...globals.browser,
            },
        },

        settings: {
            'import/resolver': {
                typescript: {},
            },

            'import/parser': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
        },
    },

    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
    },

    {
        files: ['**/*.ts', '**/*.tsx'],

        languageOptions: {
            parser,
            parserOptions: {
                project: ['./tsconfig.eslint.json'],
                tsconfigRootDir: path.resolve(__dirname, '..'),
                sourceType: 'module',
            },
        },

        rules: {
            '@typescript-eslint/array-type': [
                'error',
                {
                    default: 'array',
                },
            ],

            '@typescript-eslint/consistent-type-assertions': 'error',

            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    accessibility: 'no-public',
                },
            ],

            '@typescript-eslint/indent': 'off',

            '@typescript-eslint/member-ordering': 'error',

            '@typescript-eslint/naming-convention': [
                'error',

                // 1. Variables → camelCase ou UPPER_CASE (constantes)
                {
                    selector: 'function',
                    format: ['camelCase'],
                    filter: {
                        regex: '^[A-Z]',
                        match: false, // Allow PascalCase for component functions
                    },
                },
                {
                    selector: 'typeLike', // Interfaces, type aliases, classes, and components
                    format: ['PascalCase'],
                },

                // 5. Types, classes, interfaces, enums → PascalCase (convention habituelle)
                {
                    selector: 'typeLike',
                    format: ['PascalCase'],
                },

                // 6. Membre d’enum → PascalCase ou camelCase (au choix)
                {
                    selector: 'enumMember',
                    format: ['PascalCase'],
                },
            ],

            '@typescript-eslint/no-empty-function': 'error',

            '@typescript-eslint/no-explicit-any': [
                'error',
                {
                    fixToUnknown: true,
                },
            ],

            '@typescript-eslint/no-inferrable-types': [
                'error',
                {
                    ignoreParameters: true,
                    ignoreProperties: true,
                },
            ],

            '@typescript-eslint/no-magic-numbers': [
                'error',
                {
                    ignore: [0, 1, 2, -1],
                    ignoreArrayIndexes: true,
                    ignoreReadonlyClassProperties: true,
                    ignoreEnums: true,
                },
            ],

            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-require-imports': 'error',

            '@typescript-eslint/no-shadow': [
                'error',
                {
                    hoist: 'all',
                },
            ],

            '@typescript-eslint/no-unused-expressions': 'error',
            '@typescript-eslint/no-use-before-define': 'off',
            '@typescript-eslint/no-useless-constructor': ['error'],
            '@typescript-eslint/no-var-requires': 'error',
            '@typescript-eslint/prefer-for-of': 'error',
            '@typescript-eslint/prefer-function-type': 'error',
            '@typescript-eslint/prefer-namespace-keyword': 'error',
            '@typescript-eslint/promise-function-async': 'error',

            '@typescript-eslint/triple-slash-reference': [
                'error',
                {
                    path: 'always',
                    types: 'prefer-import',
                    lib: 'always',
                },
            ],

            '@typescript-eslint/type-annotation-spacing': 'off',
            '@typescript-eslint/unified-signatures': 'error',
            '@typescript-eslint/typedef': 'error',

            complexity: ['error', 15],
            'constructor-super': 'error',
            'eol-last': 'off',
            eqeqeq: ['error', 'smart'],
            'guard-for-in': 'error',
            'import/no-deprecated': 'warn',
            'import/no-duplicates': 'warn',
            'jsdoc/check-alignment': 'error',
            'jsdoc/check-indentation': 'error',
            'linebreak-style': 'off',
            'max-classes-per-file': ['error', 2],

            'max-lines': [
                'error',
                {
                    max: 1000,
                    skipBlankLines: true,
                    skipComments: true,
                },
            ],

            'max-params': ['error', 5],
            'newline-per-chained-call': 'off',
            'no-bitwise': 'error',
            'no-caller': 'error',
            'no-cond-assign': 'error',
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
            'no-duplicate-imports': 'error',
            'no-empty': 'error',
            'no-eval': 'error',
            'no-fallthrough': 'error',
            'no-invalid-this': 'error',
            'no-irregular-whitespace': 'off',
            'no-magic-numbers': 'off',
            'no-multiple-empty-lines': 'error',
            'no-new-wrappers': 'error',

            'no-restricted-imports': [
                'error',
                {
                    patterns: ['../*'],
                },
            ],

            'no-throw-literal': 'error',
            'no-trailing-spaces': 'off',
            'no-undef-init': 'error',
            'no-unsafe-finally': 'error',
            'no-unused-expressions': 'error',
            'no-unused-labels': 'error',
            'no-use-before-define': 'off',
            'no-useless-constructor': 'off',
            'no-var': 'error',
            'object-literal-sort-keys': 0,
            'object-shorthand': 'error',
            'one-var': ['error', 'never'],
            'one-var-declaration-per-line': 'error',

            'prefer-const': 'error',
            radix: 'error',
            'space-in-parens': ['off', 'never'],

            'spaced-comment': [
                'error',
                'always',
                {
                    markers: ['/'],
                },
            ],

            'use-isnan': 'error',
            'valid-typeof': 'off',

            'prettier/prettier': 'error',
        },

        extends: fixupConfigRules(
            compat.extends(
                'plugin:import/recommended',
                'plugin:import/typescript',
                'plugin:prettier/recommended',
            ),
        ),

        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
            },
        },
    },
]);
