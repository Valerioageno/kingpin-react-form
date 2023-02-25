module.exports = {
  extends: ['react-app', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  plugins: ['sort-exports', 'unused-imports', 'react/jsx-runtime'],
  rules: {
    'no-console': 'error',
    'no-param-reassign': ['error', { props: false }],
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'import/no-cycle': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'sort-exports/sort-exports': ['error', { sortDir: 'asc', sortExportKindFirst: 'type' }],
    '@typescript-eslint/no-unused-vars': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
