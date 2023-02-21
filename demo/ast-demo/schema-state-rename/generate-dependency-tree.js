const { set, isArray, difference } = require('lodash');
const { parse, parseExpression } = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const { isActionList } = require('./utils');
const { getReferenceVariablesFromExpression} = require('./get-reference-variables-from-expression');


const expressionRegExp = /\{\{([^{}]+)\}\}/ig;

const isExpression = str => expressionRegExp.test(str)

const getExpressionsFromSource = source => source.match(expressionRegExp)?.map(expression => expression.replace(/{{(.+)}}/, '$1'));

const findVariablesReferences = (dependencyTree) => Object.entries(dependencyTree).reduce((acc, [componentUuid, dependencyInfo]) => {
  Object.entries(dependencyInfo.props || {}).forEach(([prop, propDependencies]) => {
    propDependencies?.forEach(({ variables }) => {
      variables.forEach(variable => {
        acc[variable] = acc[variable] || [];
        acc[variable].push({
          componentUuid,
          type: 'props',
          key: prop
        });
      });
    });
  }, {});

  return acc;
}, {});


const generateDependencyTree = schema => {
  const { codes, datasourceMap, functions, componentsTree } = schema;

  // codes
  const variables = codes.map(({ id }) => id);

  const { uuid, props, children } = componentsTree;

  const dependencyTree = {
    [uuid]: {
        props: {}
    }
  };

  const generateComponentDependencyTree = ({ props, children = [], slotMap = {} }, componentDependencyTree) => {
    // tranvers props for collect variables references
    for (let prop in props) {
      const propValue = props[prop];

      if (typeof propValue === 'string') {
        if (isExpression(propValue)) {
          const expressions = getExpressionsFromSource(propValue);
          set(
            componentDependencyTree,
            `props.${prop}`,
            expressions?.map(exp => ({
                expression: exp,
                variables: getReferenceVariablesFromExpression(exp, variables)
            }))
          );
        }
      }

      if (isObject(propValue)) {
        Object.entries(propValue).forEach(([key, value]) => {
          if (typeof value === 'string') {
             const expressions = getExpressionsFromSource(value);

              set(
                componentDependencyTree,
                `props.${prop}.${key}`,
                expressions?.map(exp => ({
                    expression: exp,
                    variables: getReferenceVariablesFromExpression(exp, variables)
                }))
              );
          }
        })
      }

      if (isArray(propValue)) {
        if (isActionList(propValue)) {
          const actions = propValue.map(({ params, args }) => ({ args: args?.reduce((acc, arg) => {
            if (arg instanceof Object) {
              acc.push(arg.name);
              arg?.extra?.forEach(item => {
                if (item?.name) {
                  acc.push(item.name);
                }
              })
            } else {
              acc.push(arg);
            }

            return acc;
          }, []), source: params.src}))?.filter(({ source }) => !!source);

          if (actions.length) {
            set(componentDependencyTree, `props.${prop}`, actions.map(action => ({
              funcBody: action.source,
              args: action.args,
              variables: difference(getReferenceVariablesFromExpression(action.source, variables), action.args || [])
            })));
          }
        }
      }
    }

    children.forEach(component => {
      dependencyTree[component.uuid] = {};
      generateComponentDependencyTree(component, dependencyTree[component.uuid]);
    });

    Object.values(slotMap).forEach(components => {
      components?.forEach(component => {
        dependencyTree[component.uuid] = {};
        generateComponentDependencyTree(component, dependencyTree[component.uuid]);
      });
    })
  };

  generateComponentDependencyTree(componentsTree, dependencyTree[uuid]);

  return dependencyTree;
};

module.exports = {
  generateDependencyTree,
  findVariablesReferences
};

