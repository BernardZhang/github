import { availablePlugins, transform } from '@babel/standalone'

export const transpiler = (input) => {
  const code = transform(input, {
    presets: [
      [
        'env',
        {
          useBuiltIns: 'entry',
          modules: false,
          corejs: 3,
        },
      ],
    ],
    plugins: [
      [
        availablePlugins['external-helpers'],
        {
          helperVersion: '7.19.0',
        },
      ],
    ],
  }).code

  return code
}
