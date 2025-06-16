const tseslint = require('typescript-eslint');

/** @type {import('eslint').Linter.Config} */
module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react': require('eslint-plugin-react'),
    },
    rules: {
      // Basic rules
      'no-unused-vars': 'warn',
      'no-undef': 'off', // TypeScript handles this
      
      // React specific rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      'public/**',
      '**/*.d.ts',
      '*.config.js',
    ],
  },
];





