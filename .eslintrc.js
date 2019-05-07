module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  env: {
    node: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript'],
  // required to lint *.vue files
  plugins: ['html', 'vue'],
  globals: {
    $: true,
  },
  // add your custom rules here
  rules: {
    // 2: error, 1: warn, 0: off
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-multiple-empty-lines': 0,
    'semi': 1, // 封号结尾
    // 'no-unused-vars': process.env.NODE_ENV === 'production' ? 1 : [2, { varsIgnorePattern: 'Component|Vue|Prop|Emit|Mixins|Watch|Inject|Provide' }],
    'no-unused-vars':0,
    "comma-dangle": [2, 'never'], // 对象、数组最后一个元素不能有逗号
    'arrow-spacing': 2, // 箭头函数前后有空格
    'no-trailing-spaces': 2, // 没有拖尾空格
    'space-before-function-paren': 0, // 函数参数前后有空格
    'func-call-spacing': [2, 'never'], // 函数调用，函数名和括号间不能有空格
    'key-spacing': 2, // 属性:前不加空格，后加空格
    'keyword-spacing': 2, // 关键词前后加空格
    'space-before-blocks': 2, // 代码块空格
    'space-infix-ops': [2, { 'int32Hint': false }], // 操作符前后加空格
    'eqeqeq': 0,
    'curly': 0,
    'eol-last': 0,
    'brace-style': 0,
    'no-duplicate-imports': 0,
    'no-console': 0,
    'padded-blocks': 0,
    'camelcase': 0,
    'import/no-duplicates': 0,
    'spaced-comment': 2,
    'yoda': 0,
    'indent': 0,
    'standard/object-curly-even-spacing': 0,
    'vue/no-parsing-error': ['off'],
    'quotes': process.env.NODE_ENV === 'production' ? [1, "single"] : [2, "single"],
    'vue/no-unused-components': process.env.NODE_ENV === 'production' ? 1 : 2,
    'vue/no-unused-vars': 0,
    'no-prototype-builtins': 0,
    'no-useless-catch': 0
  }
}
