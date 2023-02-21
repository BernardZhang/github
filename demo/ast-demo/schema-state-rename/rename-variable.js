const { parse, parseExpression } = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const generateCode = require('@babel/generator').default;


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

const getVariablesFromMemberExpression = (path, variables = []) => {
  const { node } = path;
  const { type, name } = node.object;
  const referenceVariables = [];

  if (isIdentifier(node.object) && variables.includes(name)) {
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

    if (!isVariableExistInFuncParams(path, name)) {
      referenceVariables.push(name);
    }
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


//console.log(parseExpression(`users.value`), parse(`users.value`))
const astNode = parseExpression(`users.value`)

traverse(astNode, {
  noScope: true,
  MemberExpression(path) {
    console.log('MemberExpression...')
  }
})

traverse(parse(`users.value`), {
  MemberExpression(path) {
   // console.log('MemberExpression in code', path)
  }
})



module.exports = {
  renameVariable: (expression, variables, name, newName) => {
    //const astNode = safeParseExpression(`${expression}`, safeParseExpression(expression));
    let astNode;
    try {
      astNode = parse(`${expression}`);
    } catch (err) {
      // console.log(err, expression)
      astNode = parseExpression(expression)
    }
      
    traverse(astNode, {
      noScope: true,
      MemberExpression(path) {
        if (getVariablesFromMemberExpression(path, variables)?.includes(name)) {
          // TODO: rename name to newName
          path.get('object').replaceWithSourceString(newName)
        }
      },
      OptionalMemberExpression(path) {
         if (getVariablesFromMemberExpression(path, variables).includes(name)) {
           // TODO: rename naem to newName
          path.get('object').replaceWithSourceString(newName)
         }
      },
      Identifier(path) {
         // console.log('Identifier...', path.node, path.parent);
      },
      enter(path) {
        // console.log('path...', path, path.node);
      }
    });

    // console.log('astNode...', astNode, generateCode(astNode));
    return generateCode(astNode)?.code?.replace(/;$/, '');
  }
};

