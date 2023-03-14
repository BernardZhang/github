const { get, isArray, isEmpty, isFunction } = require('lodash');

const isAction = (actionSchema) => get(actionSchema, '_$t_$');

const isActionList = (actions) => isArray(actions) && actions.length && actions.every(isAction);

const isFunctionExpression = (funcSchema) => get(funcSchema, '_$t_$') === 'function';

const isFunctionBody = funcBodySchema => get(funcBodySchema, '_$t_$') === 'functionBody';

const isSchemaExpression = schema => get(schema, '_$t_$') === 'schema';


const expsRegExp = /\{\{([^{}]+|{[^{}]+})\}\}/mi
const singleExpRegExp = /\s*\{\{([\s\S]+)\}\}\s*/mi

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

module.exports = {
    isAction,
    isActionList,
    isFunctionExpression,
    isFunctionBody,
    isSchemaExpression,
    isExpression,
    isDynamicExpression,
    getExpressionsFromSource
};

