module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // 'eslint:recommended',
    // 'plugin:vue/essential',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: ['error', 2]
  }
}
