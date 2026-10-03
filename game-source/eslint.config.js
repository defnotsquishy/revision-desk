import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['node_modules/**', 'dist/**'] },
  ...tseslint.configs.recommended,
  {
    files: ['fracture/**/*.ts'],
    rules: { '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }] }
  }
);
