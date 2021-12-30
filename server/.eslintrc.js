const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['.eslintrc.js'], // https://stackoverflow.com/questions/63002127/parsing-error-parseroptions-project-has-been-set-for-typescript-eslint-parser
  rules: {
    '@typescript-eslint/no-use-before-define': OFF,
    '@typescript-eslint/lines-between-class-members': OFF,
    '@typescript-eslint/naming-convention': WARNING,
    '@typescript-eslint/no-unused-vars': WARNING,
  },
};
