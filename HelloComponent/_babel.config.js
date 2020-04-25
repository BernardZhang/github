/**
 * @file babel 配置文件
 * @author zhangyou
 */

const presets = [
    '@babel/env',
    // ['@babel/env', { targets: { node: 6 } }],
    '@babel/preset-react'
];

const plugins = [
    [
        '@babel/plugin-proposal-decorators',
        {
            legacy: true
        }
    ],
    [
        '@babel/plugin-proposal-class-properties',
        {
            loose: true
        }
    ],
    'lodash',
    [
        'import',
        {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,

        }
    ]
];

// if (!process.env.WEBPACK_DEV_SERVER) {
//     plugins.push([
//         'import',
//         {
//             libraryName: 'antd',
//             // libraryDirectory: 'es',
//             style: true,

//         }
//     ]);
// }

module.exports = { presets, plugins };
