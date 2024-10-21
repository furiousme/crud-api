// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    },
  },
  {
    ignores: ['node_modules', 'build'],
  }
);
