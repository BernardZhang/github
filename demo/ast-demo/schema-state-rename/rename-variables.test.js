const assert = require('assert');
const { renameVariable } = require('./rename-variable');
const { parseExpression } = require('@babel/parser');


const variables = ['queryModels', 'users', 'models', 'fieldsMap', 'item'];

const expressionCases = [
  {
    src: 'users.value',
    rename: ['users', 'userList'],
    expected: 'userList.value',
    message: `expected result: 'userList.value'`
  },

  {
    src: 'queryModels.data.data',
    rename: ['queryModels', 'getModels'],
    expected: 'getModels.data.data',
    message: `expected result: 'getModels.data.data'`
  },
  {
    src: 'queryModels.data?.data',
    rename: ['queryModels', 'getModels'],
    expected: 'getModels.data?.data',
  },
  {
    src: 'queryModels.data?.data || []',
    rename: ['queryModels', 'getModels'],
    expected: 'getModels.data?.data || []',
    message: `expected result: 'getModels.data?.data || []'`
  },
  {
    src: 'queryModels.data ? models.value : []',
    rename: ['queryModels', 'getModels'],
    expected: 'getModels.data ? models.value : []',
  },
  {
    src: 'users.value?.[index]',
    rename: ['users', 'userList'],
    expected: 'userList.value?.[index]',
    message: `expected result: 'userList.value?.[index]`
  },
  {
    src: `(queryModels.data?.data || []).map(item => ({
  ...item,
  displayName: fieldsMap.value?.[item.name]
}))`,
    rename: ['fieldsMap', 'fieldMap'],
    expected: `(queryModels.data?.data || []).map(item => ({
  ...item,
  displayName: fieldMap.value?.[item.name]
}))`,
  },
  {
    src: `(queryModels.data?.data || []).map(record => ({
      ...record,
      itemName: item.value?.name,
      displayName: fieldsMap.value?.[record.name]
    }))`,
    rename: ['item', 'currentItem'],
    expected: `(queryModels.data?.data || []).map(record => ({
  ...record,
  itemName: currentItem.value?.name,
  displayName: fieldsMap.value?.[record.name]
}))`
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
    rename: ['fieldsMap', 'fieldMap'],
    expected: `queryModels.data?.data?.map(item => {
  const fieldsMap = users.value?.reduce((acc, user) => {
    acc[user.name] = user.nickName;
    return acc;
  }, {});
  return {
    ...item,
    displayName: fieldsMap?.[item.name]
  };
})`
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
    rename: ['item', 'currentItem'],
    expected: `queryModels.data?.data?.map(({
  item,
  ...rest
}, index) => {
  const fieldsMap = users.value?.reduce((acc, user) => {
    acc[user.name] = user.nickName;
    return acc;
  }, {});
  return {
    ...item,
    displayName: fieldsMap?.[item.name]
  };
})`
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
    rename: ['item', 'currentItem'],
    expected: `queryModels.data?.data?.map((record, index) => {
  const {
    item,
    ...rest
  } = record;
  const fieldsMap = users.value?.reduce((acc, user) => {
    acc[user.name] = user.nickName;
    return acc;
  }, {});
  return {
    ...item,
    displayName: fieldsMap?.[item.name]
  };
})`
  },
  {
    src: `queryModels.data?.data?.map((record, index) => {
      const [ item, ...restUsers ] = users?.value || [];

      return {
        ...record,
        displayName: fieldsMap?.[item.name]
      }
    })`,
    rename: ['fieldsMap', 'fieldMap'],
    expected: `queryModels.data?.data?.map((record, index) => {
  const [item, ...restUsers] = users?.value || [];
  return {
    ...record,
    displayName: fieldMap?.[item.name]
  };
})`
  },
  {
    src: `{\n  \"background-color\": \"#ffffff\",\n  \"paddingBottom\": \"20px\",\n  \"paddingRight\": \"20px\",\n  \"paddingTop\": \"20px\",\n  \"paddingLeft\": \"20px\",\n  \"height\": \"160px\",\n  \"borderTop\": item.value === 'all' ? '2px solid #126bfb' : 'none'\n}`,
    rename: ['item', 'currentItem'],
    expected: `{\n  \"background-color\": \"#ffffff\",\n  \"paddingBottom\": \"20px\",\n  \"paddingRight\": \"20px\",\n  \"paddingTop\": \"20px\",\n  \"paddingLeft\": \"20px\",\n  \"height\": \"160px\",\n  \"borderTop\": currentItem.value === 'all' ? '2px solid #126bfb' : 'none'\n}`,
  }

];

//console.log(JSON.stringify(parseExpression(expressionCases.slice(-1)[0].src, { noScope: true })));

expressionCases.forEach(({ src: expression, rename = [], expected, message })=> {
  const renamedExpression = renameVariable(expression, variables, ...rename);
  console.log(`${expression}\n${renamedExpression}`);
  assert.equal(renamedExpression, expected, expression || message || renamedExpression);
  console.log('\n');
});

