module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'warn',
    'linebreak-style': 0,
    'comma-spacing': 'off',
    "no-unused-expressions": "warn",
    'comma-dangle': 'off',
    'indent': 'off',
    'quotes': 'off',
    'quote-props': 'warn',
    'semi': 'warn',
    'max-len': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    // 'overrides': [
    //   {
    //     'rules': {
    //       'comma-spacing': 'off',
    //       "no-unused-expressions": "off",
    //       /* 'semi': 'off', */
    //       'comma-dangle': 'off'
    //     }
    //   }
    // ]
  },
};
