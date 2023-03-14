const { set, isArray, difference, reduce, isEmpty, isPlainObject } = require('lodash');
const { isActionList, isExpression, isDynamicExpression, getExpressionsFromSource } = require('./utils');
const { findReferencesFromExpression } = require('./get-reference-variables-from-expression')

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
  const { codes, componentsTree } = schema;

  // codes
  const variables = codes.map(({ id }) => id);

  const { uuid } = componentsTree;

  const dependencyTree = {
    [uuid]: {
      props: {}
    }
  };

  const generateComponentDependencyTree = (
    { props, children = [], slotMap = {}, condition, loop },
    componentDependencyTree
  ) => {
    const processObjValue = (value, parentPaths) => {
      Object.entries(value).forEach(([key, value]) => {
        if (typeof value === 'string') {
          if (isExpression(value)) {
            const expressions = getExpressionsFromSource(value)
            set(
              componentDependencyTree,
              parentPaths.concat(key),
              expressions?.map(exp => ({
                expression: exp,
                variables: findReferencesFromExpression(exp, variables),
              }))
            )
          }
        }

        if (isPlainObject(value)) {
          processObjValue(value, parentPaths.concat(key))
        }
      })
    }

    // traverse props for collect variables references
    for (const prop in props) {
      const propValue = props[prop]

      if (typeof propValue === 'string') {
        if (isExpression(propValue)) {
          const expressions = getExpressionsFromSource(propValue)
          set(
            componentDependencyTree,
            `props.${prop}`,
            expressions?.map(exp => ({
              expression: exp,
              variables: findReferencesFromExpression(exp, variables),
            }))
          )
        }
      }

      if (isPlainObject(propValue)) {
        processObjValue(propValue, ['props', prop])
      }

      if (isArray(propValue)) {
        if (isActionList(propValue)) {
          const actions = generateFunctionActions(propValue)?.filter(
            ({ source }) => !!source
          )

          if (actions.length) {
            set(
              componentDependencyTree,
              `props.${prop}`,
              actions.map((action) => ({
                funcBody: action.source,
                args: action.args,
                variables: difference(
                  findReferencesFromExpression(action.source, variables),
                  action.args || []
                ),
              }))
            )
          }
        }
      }
    }

    // TODO: collect condition & loop dependency
    if (condition && isDynamicExpression(condition)) {
      const expressions = getExpressionsFromSource(condition)
      set(
        componentDependencyTree,
        'condition',
        expressions?.map(exp => ({
          expression: exp,
          variables: findReferencesFromExpression(exp, variables),
        }))
      )
    }

    if (loop && isDynamicExpression(loop.items)) {
      const expressions = getExpressionsFromSource(loop.items)

      set(
        componentDependencyTree,
        ['loop', 'items'],
        expressions?.map(exp => ({
          expression: exp,
          variables: findReferencesFromExpression(exp, variables),
        }))
      )
    }

    children.forEach((component) => {
      dependencyTree[component.uuid] = { props: {} }
      generateComponentDependencyTree(component, dependencyTree[component.uuid])
    })

    Object.values(slotMap).forEach((components) => {
      components?.forEach(component => {
        dependencyTree[component.uuid] = { props: {} }
        generateComponentDependencyTree(
          component,
          dependencyTree[component.uuid]
        )
      })
    })
  }

  generateComponentDependencyTree(componentsTree, dependencyTree[uuid]);

  return reduce(
    dependencyTree,
    (acc, value, key) => {
      if (
        !isEmpty(value.props) ||
        !isEmpty(value.condition) ||
        !isEmpty(value.loop)
      ) {
        acc[key] = value
      }
      return acc
    },
    {}
  );
};

module.exports = {
  generateDependencyTree,
  findVariablesReferences
};

