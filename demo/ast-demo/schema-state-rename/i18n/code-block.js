const { default: generate } = require('@babel/generator');
const { parseExpression, parse } = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const t = require('@babel/types');
const { I18N_FUN_NAME } = require('./constants');
const { extractExpression, hasChinese } = require('./utils');


const testCases = [
  // if else
  `{{if ($var.readPretty) {
    $toast('详情页');
  } else {
    $toast('编辑页');
  }}}`
].slice(0);

const transformedExpressions = [];
const astNodes = [];

testCases.forEach((testCase, i) => {
  astNodes[i] = parse(extractExpression(testCase));

  traverse(astNodes[i], {
    noScope: true,
    StringLiteral(path) {
      const value = path.node.value;

      if (hasChinese(value)) {
        // console.log('中文:)', value, path.node, path.parent);
        if (path.parent && t.isCallExpression(path.parent)) {
          if (path.parent.callee.name === I18N_FUN_NAME) {
            return;
          }
        }

        path.replaceWith(t.callExpression(
          t.identifier(I18N_FUN_NAME),
          [t.stringLiteral(value)]
        ));
        // path.skip();
      }
    }
  });

  transformedExpressions.push(generate(astNodes[i], {
    jsescOption: {
      minimal: true,
      quotes: 'single'
    }
  }).code);
});

console.log(testCases);
console.log(transformedExpressions?.map(str => `{{${str}}}`));

// console.log(parseExpression(`'你好' + $var.name + '加油！'`))
// console.log(parseExpression(`i18n('姓名')`));
