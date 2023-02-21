const { parse, parseExpression } = require('@babel/parser');

const astMap = ['a.value', 'a.value?.name', '!!a.value', 'a.value ? true : a.value', 'users.data?.data?.map(item => ({ ...item, name: namesMap.value[item.key]}))'].map(exp => ({
    [exp]: parseExpression(exp)
}));

console.log(JSON.stringify(astMap, null, 2));
