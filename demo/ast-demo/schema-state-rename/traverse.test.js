const { parse, parseExpression } = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const assert = require('assert');

const states = ['queryModels', 'users', 'models', 'fieldsMap', 'item'];

const expression = 'queryModels.data.data || []';
const expressions = [
  {
    src: 'queryModels.data.data',
    expected: ['queryModels'],
    message: `expected result: ['queryModels']`
  },
  {
    src: 'queryModels.data?.data',
    expected: ['queryModels'],
    message: `expected result: ['queryModels']`
  },
  {
    src: 'queryModels.data?.data || []',
    expected: ['queryModels'],
    message: `expected result: ['queryModels']`
  },
  {
    src: 'queryModels.data ? models.value : []',
    expected: ['queryModels', 'models'],
    message: `expected result: ['queryModels', 'models']`
  },
  {
    src: 'users.value?.[index]',
    expected: ['users'],
    message: `expected result: ['users']`
  },
  {
    src: `(queryModels.data?.data || []).map(item => ({
      ...item,
      displayName: fieldsMap.value?.[item.name]
    }))`,
    expected: ['queryModels', 'fieldsMap'],
    message: `expected result: ['queryModels', 'fieldsMap']`
  },
  {
    src: `(queryModels.data?.data || []).map(record => ({
      ...record,
      itemName: item.value?.name,
      displayName: fieldsMap.value?.[record.name]
    }))`,
    expected: ['queryModels', 'item', 'fieldsMap'],
    message: `expected result: ['queryModels', 'item', 'fieldsMap']`
  }
];

// console.log(JSON.stringify(parseExpression(expressions[6]), null, 4))

const expresionStataments = [
  `queryModels.trigger().then(models => {\n  searchModels.setValue(models);\n  importModels.setValue(models);\n});`,
];


const isFunctionExpressionNode = (node) => ['ArrowFunctionExpression', 'FunctionExpression'];

const expAst = parseExpression(expression);

// console.log(expAst);

const getVariablesFromMemberExpression = (path) => {
  const { node } = path;
  const { type, name } = node.object;
  const variables = [];

  if (type === 'Identifier' && states.includes(name)) {
    // find function params
    const isExistSameFuncParam = (path, name) => {
      let isExist = false;

      path.findParent(({ node })=> {
        if (isFunctionExpressionNode(node) && node.params?.length) {
          // console.log('params...', node.params);
          isExist = node.params.some(param => param.name === name);
          return isExist;
        }
      });

      return isExist;
    }; 

    if (!isExistSameFuncParam(path, name)) {
      variables.push(name);
    }
  }

  return variables;
};

const getReferenceVariablesFromExpression = (expression) => {
  let variables = [];

  traverse(parseExpression(`function () { ${expression} }`), {
    noScope: true,
    MemberExpression(path) {
      variables = variables.concat(getVariablesFromMemberExpression(path));
    },
    OptionalMemberExpression(path) {
      variables = variables.concat(getVariablesFromMemberExpression(path));
    },
    Identifier(path) {
       // console.log('Identifier...', path.node, path.parent);
    },
    enter(path) {
      // console.log('path...', path, path.node);
    }
  });

  return variables;
};

expressions.forEach(({ src: expression, expected, message })=> {
  const referenceVariables = getReferenceVariablesFromExpression(expression);
  console.log(`${expression}\n ${JSON.stringify(referenceVariables)}`);
  assert.deepEqual(referenceVariables, expected, message);
  console.log('\n');
});

