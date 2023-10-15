const { get, isArray, isEmpty, isFunction } = require('lodash');

const isAction = (actionSchema) => get(actionSchema, '_$t_$');

const isActionList = (actions) => isArray(actions) && actions.length && actions.every(isAction);

const isFunctionExpression = (funcSchema) => get(funcSchema, '_$t_$') === 'function';

const isFunctionBody = funcBodySchema => get(funcBodySchema, '_$t_$') === 'functionBody';

const isSchemaExpression = schema => get(schema, '_$t_$') === 'schema';


const expsRegExp = /\{\{([^{}]+|{[^{}]+})\}\}/mi
const singleExpRegExp = /\s*\{\{([\s\S]+)\}\}\s*/mi

const isSingleExpression = exp => singleExpRegExp.test(exp)

const isExpression = (str) =>
  (singleExpRegExp.test(str) || expsRegExp.test(str))

const isDynamicExpression = (exp) =>
  typeof exp === 'string' && isExpression(exp)

const getExpressionsFromSource = (source) => {
  const regExp = singleExpRegExp.test(source) ? singleExpRegExp : expsRegExp

  return source
    .match(new RegExp(regExp, 'g'))
    ?.map((expression) => expression.replace(regExp, '$1'))
}

const traverseTree = (
  treeData,
  callback,
  pNode,
  pNodes
) => {
  (treeData || []).every((node) => {
    let result

    if (callback) {
      result = callback(
        node,
        pNode,
        pNodes?.length ? pNodes : [pNode].filter((item) => !!item)
      )
    }

    // 回调函数返回false则终止遍历
    if (result !== false) {
      if (node) {
        traverseTree(
          node.children || [],
          callback,
          node,
          [node, ...(pNodes || [])]
        )
      }
    }

    return result !== false
  })

  return treeData
}

const INJECT_COMPONENTS = [
  'message',
  'notification',
  'Modal',
]


module.exports = {
  isAction,
  isActionList,
  isFunctionExpression,
  isFunctionBody,
  isSchemaExpression,
  isExpression,
  isDynamicExpression,
  isSingleExpression,
  getExpressionsFromSource,
  traverseTree,
  INJECT_COMPONENTS
};

