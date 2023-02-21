const { get, isArray, isEmpty, isFunction } = require('lodash');

const isAction = (actionSchema) => get(actionSchema, '_$t_$');

const isActionList = (actions) => isArray(actions) && actions.length && actions.every(isAction);

const isFunctionExpression = (funcSchema) => get(funcSchema, '_$t_$') === 'function';

const isFunctionBody = funcBodySchema => get(funcBodySchema, '_$t_$') === 'functionBody';

const isSchemaExpression = schema => get(schema, '_$t_$') === 'schema';



module.exports = {
    isAction,
    isActionList,
    isFunctionExpression,
    isFunctionBody,
    isSchemaExpression
};

