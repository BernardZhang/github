const { default: generate } = require('@babel/generator');
const { parseExpression } = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const t = require('@babel/types');
const { I18N_FUN_NAME } = require('./constants');
const { extractExpression, hasChinese } = require('./utils')


let astNode;
const testCases = [
  // 字符串拼接
  `{{'你好' + $var.name + '加油！'}}`,
  // 三目运算表达式
  `{{$var.readPretty ? '详情页' : '编辑页'}}`,

  // key 为中文的对象
  `{{{
    确定: 'CONFIRM'
  }}}`,
  // 值为中文的对象
  `{{{
    confirm: '确定'
  }}}`,
  // 数组中值为中文
  `{{[{
    label: '有效',
    value: 'valid'
  },{
    label: '无效',
    value: 'invalid'
  }]}}`,
  // 比较时右边为中文
  `{{$var.statusDesc === '有效'}}`
];

const transformedExpressions = [];

testCases.forEach(testCase => {
  astNode = parseExpression(extractExpression(testCase));
  traverse(astNode, {
    noScope: true,
    StringLiteral(path) {
      const value = path.node.value;

      if (hasChinese(value)) {
        console.log('中文:)', value);
        path.replaceWith(t.callExpression(
          t.identifier(I18N_FUN_NAME),
          [t.stringLiteral(value)]
        ));
        path.skip();
      }
    }
  });

  transformedExpressions.push(generate(astNode, {
    jsescOption: {
      minimal: true,
    }
  }).code);
});
console.log(testCases);
console.log(transformedExpressions);

// console.log(parseExpression(`'你好' + $var.name + '加油！'`))
