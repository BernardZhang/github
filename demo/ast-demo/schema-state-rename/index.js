const schema = require('./schema.json');
const { generateDependencyTree, findVariablesReferences } = require('./generate-dependency-tree');

const dependencyTree = generateDependencyTree(schema);

const variablesReferences = findVariablesReferences(dependencyTree);

console.log(JSON.stringify(dependencyTree, null, 2));
console.log(JSON.stringify(variablesReferences, null, 2));

