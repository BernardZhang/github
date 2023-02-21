const { parse, parseExpression } = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');

const isFunctionExpressionNode = (node) => ['ArrowFunctionExpression', 'FunctionExpression'].includes(node.type);

const isIdentifier = node => node.type === 'Identifier';

const isVariableDeclaration = node => node.type === 'VariableDeclaration';

const isObjectPattern = node => node.type === 'ObjectPattern';

const isObjectProperty = node => node.type === 'ObjectProperty';

const isArrayPattern = node => node.type === 'ArrayPattern';

const isRestElement = node => node.type === 'RestElement';

const getVariablesFromNode = node => {
  const variables = [];

  if (isIdentifier(node)) {
    variables.push(node.name);
  }

  if (isObjectPattern(node)) {
    node?.properties?.forEach(property => {
      if (isObjectProperty(property)) {
        variables.push(property.key?.name);
      }

      if (isRestElement(property)) {
        variables.push(property.argument?.name);
      }
    });
  }

  if (isArrayPattern(node)) {
    node?.elements?.forEach(element => {
      if (isIdentifier(element)) {
        variables.push(element.name);
      }

      if (isRestElement(element)) {
        variables.push(element.argument?.name);
      }
    });
  }

  return variables;
};

const getParamsFromFunctionNode = node => {
  return node.params.reduce((acc, param) => {
    return acc.concat(getVariablesFromNode(param))
  }, []);
};

const getDeclarationsFromFunctionNode = node => node.body?.body?.filter(isVariableDeclaration)?.reduce(
  (acc, { declarations }) => {
    return [
      ...acc,
      ...declarations?.reduce((acc, { id }) => {
        return acc.concat(getVariablesFromNode(id));
      }, [])
    ];
  },
  []
);

const isVariableExistInFuncParams = (path, name) => {
  let isExist = false;

  path.findParent(({ node })=> {
    if (isFunctionExpressionNode(node)) {
      isExist = getParamsFromFunctionNode(node).includes(name) || getDeclarationsFromFunctionNode(node)?.includes(name);

      return isExist;
    }
  });

  return isExist;
}; 

const getVariablesFromMemberExpression = (path, variables = []) => {
  const { node } = path;
  const { type, name } = node.object;
  const referenceVariables = [];

  if (isIdentifier(node.object) && variables.includes(name) && !isVariableExistInFuncParams(path, name)) {
      referenceVariables.push(name);
  }

  return referenceVariables;
};

const getVariablesFromIdentifier = (path, variables = []) => {
  const { node } = path;
  const { type, name } = node;
  const referenceVariables = [];

  if (variables.includes(name) && !isVariableExistInFuncParams(path, name)) {
    referenceVariables.push(name);
  }

  return referenceVariables;
};

const safeParseExpression = (exp, defaultValue) => {
  try {
    return parseExpression(exp);
  } catch (err) {
    // console.warn('parse expression error:', exp, err);
    return defaultValue;
  }
}

const getReferenceVariablesFromExpression = (expression, variables) => {
  let referenceVariables = [];
  const astNode = safeParseExpression(`function () { ${expression} }`, safeParseExpression(expression));
    
  traverse(astNode, {
    noScope: true,
    MemberExpression(path) {
      referenceVariables = referenceVariables.concat(getVariablesFromMemberExpression(path, variables));
    },
    OptionalMemberExpression(path) {
      referenceVariables = referenceVariables.concat(getVariablesFromMemberExpression(path, variables));
    },
    Identifier(path) {
      const { parent, node } = path;

      if (parent) {
        switch (parent.type) {
          case 'ExpressionStatement':
            referenceVariables = referenceVariables.concat(getVariablesFromIdentifier(path, variables));
            break;
          case 'VariableDeclarator':
            if (parent.init === node) {
              referenceVariables = referenceVariables.concat(getVariablesFromIdentifier(path, variables));
            }
            break;
        }
      } 
    },
    enter(path) {
      // console.log('path...', path, path.node);
    }
  });

  return referenceVariables;
};

module.exports = {
  getReferenceVariablesFromExpression
};


