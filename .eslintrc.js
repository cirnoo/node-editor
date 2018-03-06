module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'eslint:recommended',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    // allow paren-less arrow functions
    "semi": 0,
    'arrow-parens': 0,
    'no-unused-vars': 0,
    'no-unused-label': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
