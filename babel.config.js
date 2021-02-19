module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@models': './src/app/models',
        '@controllers': './src/app/controllers',
        '@config': './src/config',
        '@interfaces': './src/app/interfaces'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
