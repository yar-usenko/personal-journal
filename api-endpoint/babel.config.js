module.exports = (api) => {
  const env = api.env();

  const caller =
    api.caller((inst) => (inst && inst.name) || 'any') || '@babel/cli';

  api.cache.invalidate(() => `${env}-${caller}`);

  // const isBabelCli = caller === '@babel/cli';
  // const isBabelNode = caller === '@babel/node';
  // const isWebpack = caller === 'babel-loader';
  // const isRollup = caller === 'rollup-plugin-babel';
  // const isJest = caller === 'babel-jest';

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          spec: false,
          loose: true,
          exclude: [
            'transform-async-to-generator',
            'transform-template-literals',
            'transform-regenerator',
          ],
        },
      ],
    ],
    plugins: [
      'babel-plugin-import-graphql',
      'babel-plugin-graphql-tag',

      ['babel-plugin-macros', {}],
      // Stage 0
      '@babel/plugin-proposal-function-bind',

      // Stage 1
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-logical-assignment-operators',
      ['@babel/plugin-proposal-optional-chaining', { loose: false }],
      ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
      ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
      '@babel/plugin-proposal-do-expressions',

      // Stage 2
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',

      // Stage 3
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-json-strings',

      'babel-plugin-transform-hoist-nested-functions',

      'babel-plugin-loop-optimizer',
    ],
  };
};
