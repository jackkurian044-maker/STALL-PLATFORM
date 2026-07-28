import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions:{globals:{...globals.browser,...globals.node}},
    rules:{
      'no-unused-vars':'off',
      '@typescript-eslint/no-unused-vars':['warn',{argsIgnorePattern:'^_'}],
      'no-console':['warn',{allow:['warn','error']}]
    }
  }
];
