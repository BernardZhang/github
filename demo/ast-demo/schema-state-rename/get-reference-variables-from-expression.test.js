const assert = require('assert');
const { getReferenceVariablesFromExpression } = require('./get-reference-variables-from-expression');

const variables = ['queryModels', 'users', 'models', 'fieldsMap', 'item'];

const expressionCases = [
  {
    src: `queryModels.data?.reduce((acc, { eleName, paramValue }) => {
      acc[eleName] = paramValue
      return acc;
    }, {
      version: policyVersionList.value?.length === 1 ? policyVersionList.value[0]?.value : undefined
    })`,
    expected: ['queryModels'],
    message: `expected result: ['queryModels']`
  },
  {
    src: `queryModels.data?.data.map(({ uuid, name, item }) => {
      const dict = fieldsMap;
      return {
        label: dict.value?.[name],
        value: uuid
      };
    })`,
    expected: ['queryModels', 'fieldsMap'],
    message: `expected result: ['queryModels', 'fieldsMap']`
  },
  {
    src: 'queryModels',
    expected: ['queryModels'],
    message: `expected result: ['queryModels']`
  },
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
  },
  {
    src: `queryModels.data?.data?.map(item => {
      const fieldsMap = users.value?.reduce((acc, user) => {
        acc[user.name] = user.nickName;
        return acc;
      }, {});

      return {
        ...item,
        displayName: fieldsMap?.[item.name]
      }
    })`,
    expected: ['queryModels', 'users'],
    message: `expected result: ['queryModels', 'users']`
  },
  {
    src: `queryModels.data?.data?.map(({ item, ...rest }, index) => {
      const fieldsMap = users.value?.reduce((acc, user) => {
        acc[user.name] = user.nickName;
        return acc;
      }, {});

      return {
        ...item,
        displayName: fieldsMap?.[item.name]
      }
    })`,
    expected: ['queryModels', 'users'],
    message: `expected result: ['queryModels', 'users']`
  },
  {
    src: `queryModels.data?.data?.map((record, index) => {
      const { item, ...rest } = record;
      const fieldsMap = users.value?.reduce((acc, user) => {
        acc[user.name] = user.nickName;
        return acc;
      }, {});

      return {
        ...item,
        displayName: fieldsMap?.[item.name]
      }
    })`,
    expected: ['queryModels', 'users'],
    message: `expected result: ['queryModels', 'users']`
  },
  {
    src: `queryModels.data?.data?.map((record, index) => {
      const [ item, ...restUsers ] = users?.value || [];

      return {
        ...record,
        displayName: fieldsMap?.[item.name]
      }
    })`,
    expected: ['queryModels', 'users', 'fieldsMap'],
    message: `expected result: ['queryModels', 'users', 'fieldsMap']`
  },
  {
    src: `{\n  \"background-color\": \"#ffffff\",\n  \"paddingBottom\": \"20px\",\n  \"paddingRight\": \"20px\",\n  \"paddingTop\": \"20px\",\n  \"paddingLeft\": \"20px\",\n  \"height\": \"160px\",\n  \"borderTop\": item.value === 'all' ? '2px solid #126bfb' : 'none'\n}`,
    expected: ['item'],
    message: `expected result: ['item']`
  }
];

//console.log(JSON.stringify(parseExpression(expressionCases.slice(-1)[0].src, { noScope: true })));

expressionCases.forEach(({ src: expression, expected, message }) => {
  const referenceVariables = getReferenceVariablesFromExpression(expression, variables);
  console.log(`${expression}\n ${JSON.stringify(referenceVariables)}`);
  assert.deepEqual(referenceVariables, expected, message);
  console.log('\n');
});

