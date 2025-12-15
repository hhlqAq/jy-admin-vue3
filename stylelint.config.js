export default {
  extends: [
    'stylelint-config-tailwindcss', // 支持 Tailwind CSS 类名
    'stylelint-config-standard-scss', // SCSS 语法校验
    'stylelint-config-standard-vue/scss', // 支持 Vue 单文件组件中的 SCSS 语法
    'stylelint-config-recess-order', // 推荐的属性顺序
    '@stylistic/stylelint-config', // 风格规则预设
  ],
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'property-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-class-pattern': null,
    'no-empty-source': null,
    'custom-property-pattern': null,
    'declaration-block-no-duplicate-custom-properties': null,
    'custom-property-no-missing-var-function': null,
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: [
          'v-bind',
          'map-get',
          'lighten',
          'darken',
        ],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: [
          '/^view-transition/',
        ],
      },
    ],
    'scss/double-slash-comment-empty-line-before': null,
    'scss/no-global-function-names': null,
    '@stylistic/block-closing-brace-newline-after': [
      'always',
      {
        ignoreAtRules: ['if', 'else'],
      },
    ],
  },
  allowEmptyInput: true,
  ignoreFiles: [
    'node_modules/**/*',
    'dist*/**/*',
    'public/tinymce/**/*',
  ],
}
