module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/essential',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': ["error", { allow: ["warn", "error"] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    'prettier/prettier': 0,
  }
}
