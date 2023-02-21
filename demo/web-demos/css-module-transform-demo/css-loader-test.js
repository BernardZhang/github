const cssLoader = require('css-loader');

console.log(cssLoader(`.someClass {
    color: red;
}`, {
  options: {
      modules: {
        localIdentName: `hello-[local]`,
        exportLocalsConvention: 'camelCase',
      }
  } 
}))
