/* eslint-disable quote-props */
/* eslint-disable max-len */
const restrictedSyntax = [
  'error',
  {
    selector: 'ForInStatement',
    message:
      'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
  },
  {
    selector: 'LabeledStatement',
    message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
  },
  {
    selector: 'WithStatement',
    message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
  },
  {
    selector: 'ExpressionStatement > :not(AssignmentExpression)[callee.property.name="concat"]',
    message: 'Built-in `concat` method usually does not modify object. It should be use with assignment',
  },
];
const jsRules = {
  'no-nested-ternary': 'error',
  'prefer-destructuring': ['error', { object: false, array: false }],
  'no-underscore-dangle': [0],
  'class-methods-use-this': 'off',
  'no-await-in-loop': ['off'],
  'no-restricted-syntax': restrictedSyntax,
  'indent': ['error', 2, { SwitchCase: 1 }],
  'linebreak-style': ['error', 'unix'],
  'quotes': ['error', 'single'],
  'semi': ['error', 'always'],
  'max-len': ['error', { code: 150 }],
  'camelcase': ['error', { properties: 'never', ignoreDestructuring: true }],
  'space-before-blocks': ['off'],
  'keyword-spacing': ['error', { before: true, after: true }],
  'array-bracket-spacing': ['error', 'never'],
  'object-curly-spacing': ['error', 'always'],
  'space-in-parens': ['error', 'never'],
  'comma-spacing': ['error', { before: false, after: true }],
  'comma-dangle': [
    'error',
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'always-multiline',
    },
  ],
  'lines-between-class-members': ['error', 'always'],
  'key-spacing': ['error', { afterColon: true }],
  'quote-props': ['error', 'as-needed'],
};
const tsRules = {
  'arrow-parens': ['error', 'as-needed'],
  'camelcase': 'off',
  '@typescript-eslint/strict-boolean-expressions': [
    'error',
    {
      allowString: false,
      allowNumber: false,
      allowNullableObject: true,
      allowNullableBoolean: false,
      allowNullableString: true,
      allowNullableNumber: false,
      allowAny: false,
    },
  ],
  'class-methods-use-this': [0],
  'function-paren-newline': ['error', 'multiline'],
  'linebreak-style': ['error', 'unix'],
  'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
  'indent': 'off',
  'quotes': ['error', 'single'],
  'quote-props': ['error', 'as-needed'],
  'max-len': ['error', { code: 300, tabWidth: 2 }],
  'semi': 'off',
  'space-infix-ops': 'off',
  'max-classes-per-file': 0,
  'no-await-in-loop': 'off',
  'no-extra-semi': 0,
  'no-mixed-spaces-and-tabs': 'error',
  'no-plusplus': 0,
  'no-tabs': 'error',
  'no-shadow': 'off',
  'no-underscore-dangle': [0],
  'no-useless-constructor': 0,
  'object-curly-newline': [
    'error',
    {
      ImportDeclaration: { multiline: true },
      ExportDeclaration: { multiline: true, minProperties: 3 },
    },
  ],
  'key-spacing': ['error', { afterColon: true }],
  'comma-spacing': ['error', { before: false, after: true }],
  'import/prefer-default-export': 0,
  'import/extensions': 0,
  '@typescript-eslint/semi': ['error'],
  '@typescript-eslint/indent': ['error', 2, { MemberExpression: 1, SwitchCase: 1, ignoredNodes: ['PropertyDefinition'] }],
  '@typescript-eslint/space-infix-ops': ['error', { int32Hint: false }],
  '@typescript-eslint/type-annotation-spacing': [2, { before: false, after: true }],
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/naming-convention': [
    'warn',
    {
      selector: 'default',
      format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
      leadingUnderscore: 'allow',
      custom: {
        // you can expand this regex as you find more cases that require quoting that you want to allow
        regex: '^.$',
        match: false,
      },
    },
    {
      selector: 'parameter',
      format: ['camelCase'],
      leadingUnderscore: 'forbid',
      custom: {
        // you can expand this regex as you find more cases that require quoting that you want to allow
        regex: '^.$',
        match: false,
      },
    },
    {
      selector: 'objectLiteralProperty',
      format: ['camelCase', 'snake_case'],
      filter: {
        // you can expand this regex as you find more cases that require quoting that you want to allow
        regex: '^_',
        match: false,
      },
    },
    {
      selector: 'typeLike',
      format: ['PascalCase', 'camelCase'],
    },
    {
      selector: 'method',
      format: ['camelCase'],
      leadingUnderscore: 'allow',
    },
    {
      selector: 'enumMember',
      format: ['PascalCase', 'camelCase'],
    },
    {
      selector: 'typeParameter',
      format: ['PascalCase'],
      custom: {
        regex: '^[A-z]{2,}$',
        match: true,
      },
    },
  ],
  'no-restricted-syntax': restrictedSyntax,
};
module.exports = {
  plugins: ['prettier'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
      typescript: {
        paths: ['src-ts'],
      },
    },
  },
  overrides: [
    {
      files: ['*.js'],
      excludedFiles: './src/@warroom-core/**/*.js',
      extends: ['airbnb-base'],
      rules: jsRules,
    },
    {
      files: ['*.ts'],
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/eslint-recommended'],
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
      parser: '@typescript-eslint/parser',
      rules: { ...jsRules, ...tsRules },
    },
  ],

  env: {
    jest: true,
    browser: false,
  },
};
