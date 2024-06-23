const { default: generate } = require('@babel/generator');
const { parseExpression } = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const t = require('@babel/types');
const { I18N_FUN_NAME } = require('./constants');
const { extractExpression, hasChinese } = require('./utils')


const testCases = [
  // 三目运算表达式
  `{{$var.readPretty ? '详情页' : '编辑页'}}`,
  // 字符串拼接
  `{{'你好' + $var.name + '加油！'}}`,
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
  // 中文作为参数
  `{{$toast('错误消息')}}`,
  // map 表达式
  `{{$records.map(record => ({
    ...record,
    name: record.name || '默认名称'
  }))}}`,
  // reduce 表达式
  `{{$records.reduce((acc, record) => {
    if (!record.name) {
      acc.push('记录名称不能为空');
    }

    if (record.name.test(/^测试/)) {
      acc.push('名称不能以测试开头');
    }

    return acc;
  }, [])}}`,
  // 比较时右边为中文
  `{{$var.statusDesc === '有效'}}`,
  // 已经处理过的表达式
  `{{i18n('姓名')}}`,
  // key 为中文的对象
  `{{{
    确定: 'CONFIRM'
  }}}`,
  // 正则表达式中有中文
  `{{$record.name.test(/^测试/) ? '测试数据' : '真实数据'}}`,
].slice(0);

let astNode;
const transformedExpressions = [];
const astNodes = [];


testCases.forEach((testCase, i) => {
  astNodes[i] = parseExpression(extractExpression(testCase));

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
