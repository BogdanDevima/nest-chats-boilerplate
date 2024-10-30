module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '*.config.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/order': [
      'warn',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        },
        'pathGroups': [
          {
            'pattern': 'src/**',
            "group": "external",
            "position": "after"
          }
        ],
        'pathGroupsExcludedImportTypes': ['builtin', 'internal', 'parent', 'sibling', 'index', 'object', 'type']
      }
    ]
  },
  "overrides": [
    {
      "files": ["*.entity.ts"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": [{
              "group": ["src/*"],
              "message": "TypeORM cli will not be able to process entity files that contain absolute imports"
            }]
          }
        ]
      }
    }
  ]
};
