import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject'
import * as path from 'path'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': JSON.stringify(process.env),
    'process.platform': JSON.stringify({})
  },
  plugins: [react({
    jsxRuntime: 'classic'
  }), inject({
    React: 'react',
    Buffer: ['buffer', 'Buffer'],
    exclude: '**/*.html',
    // include: /node_modules/
  }),],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        math: 'always',
        modules: true,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@hello-world',
        replacement: `${path.resolve(
          __dirname,
          './src/hello-world'
        )}`,
      },
      {
        find: '@parse-expression',
        replacement: `${path.resolve(
          __dirname,
          '../packages/parse-expression/index.js'
        )}`,
      },
      {
        find: '@transpiler',
        replacement: `${path.resolve(
          __dirname,
          '../packages/transpiler/index.js'
        )}`,
      },
      {
        find: 'buffer',
        replacement: path.resolve(__dirname, 'node_modules/rollup-plugin-node-polyfills/polyfills/buffer-es6')
      },
      {
        find: 'process',
        replacement: path.resolve(__dirname, 'node_modules/rollup-plugin-node-polyfills/polyfills/process-es6')
      }
    ]
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    minify: false,
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        // @ts-ignore
        rollupNodePolyFill(),
      ]
    }
  }
})
