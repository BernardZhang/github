
const assert = require('assert');
const { generateDependencyTree } = require('./generate-dependency-tree')

const schema = {
  name: '嵌套循环',
  elements: {},
  uuid: '33217c63e7874446a7034b7362195bcf',
  dataSourceMap: {
    '6ca7d9a4d77a432a9918e6bb5484da7a': {
      baseUrl: 'https://v0.yiketianqi.com',
      enableTransformer: false,
      transformer: {
        _$t_$: 'functionBody',
        funcBody: '',
      },
      events: [],
      interceptors: [],
      httpStatusCodeHandles: [],
    },
    '9788c2dcd9094187af934a6316903bb1': {
      bodyType: 'json',
      headers: [
        {
          value: '{{sessionStorage.getItem("_csrf_");}}',
          key: 'X-Cf-Random',
        },
      ],
      httpStatusCodeHandles: [
        {
          _$t_$: 'functionBody',
          funcBody:
            'window.location.href = `/user/login?callbackUrl=${locaiton.pathname}${encodeURIComponent(location.search)}}`;',
          status: 401,
        },
      ],
      baseUrl: '',
      transformer: {
        _$t_$: 'functionBody',
        funcBody: 'return data?.data;',
      },
      enableTransformer: true,
      events: [
        {
          waitType: 'debounce',
          enableWait: false,
          waitMs: 10,
          _$t_$: 'action',
          type: 'script',
          event: 'onFailure',
          params: {
            src: "console.log('request error:)',  error);\nmessage.error(error?.message || error?.toString() || '未知错误');",
          },
          enabled: true,
        },
      ],
      interceptors: [
        {
          _$t_$: 'functionBody',
          funcBody:
            'const { data } = response || {};\n\nif (!data?.success) {\n  return Promise.reject(data);  \n}\n\nreturn response;',
        },
      ],
    },
  },
  componentsTree: {
    uuid: 'page1',
    layout: {
      type: 'flow',
    },
    name: 'Page',
    condition: true,
    props: {
      style: {
        paddingBottom: '16px',
        paddingRight: '20px',
        paddingTop: '16px',
        paddingLeft: '20px',
      },
    },
    children: [
      {
        uuid: 'container1',
        name: 'Container',
        props: {
          waterMarkProps: {
            rotate: -22,
            gapX: 200,
            gapY: 100,
            textAlign: 'center',
            fontSize: 14,
            fontStyle: 'normal',
            content: ['墨方-低代码平台', '同盾科技'],
            fontWeight: 'normal',
            fontColor: 'rgba(0,0,0,.15)',
            zIndex: 9,
          },
        },
        loop: {
          item: 'item',
          enable: true,
          index: 'index',
          items: '{{titles.value || []}}',
        },
        children: [
          {
            uuid: 'title1',
            name: 'Title',
            props: {
              size: 'default',
              style: {
                marginBottom: '10px',
              },
              title: "{{item?.title || ''}}",
            },
            loop: {
              item: 'item',
              enable: false,
              index: 'index',
            },
          },
          {
            uuid: 'title2',
            name: 'Title',
            props: {
              size: 'small',
              style: {
                marginBottom: '10px',
                paddingLeft: '20px',
              },
              title: "{{item?.title + '-' + subItem?.title}}",
            },
            loop: {
              item: 'subItem',
              enable: true,
              index: 'subIndex',
              items: '{{item.subTitles || []}}',
            },
          },
        ],
      },
      {
        "uuid": "form2",
        "name": "Form",
        "props": {
          "layout": "horizontal",
          "labelAlign": "right",
          "wrapperCol": {
            "span": 14
          },
          "values": "{{titles.value?.reduce((acc, { eleName, paramValue }) => {\n  acc[eleName] = paramValue\n  return acc;\n}, {\n  version: policyVersionList.value?.length === 1 ? policyVersionList.value[0]?.value : undefined\n})}}",
          "colon": true,
          "style": {
            "paddingBottom": "28px"
          },
          "labelCol": {
            "span": 6
          }
        }
      },
    ],
  },
  codes: [
    {
      id: 'titles',
      type: 'state',
      value: [
        {
          subTitles: [
            {
              title: '1',
            },
            {
              title: '2',
            },
          ],
          title: '1',
        },
        {
          subTitles: [
            {
              title: '1',
            },
            {
              title: '2',
            },
          ],
          title: '2',
        },
      ],
    },
  ],
  codeFolders: [],
}

const actualTree = generateDependencyTree(schema)
const expectedTree = {
  container1: {
    props: {},
    loop: {
      items: [
        {
          expression: 'titles.value || []',
          variables: ['titles'],
        },
      ],
    },
  },
  title1: {
    props: {
      title: [
        {
          expression: "item?.title || ''",
          variables: [],
        },
      ],
    },
  },
  title2: {
    props: {
      title: [
        {
          expression: "item?.title + '-' + subItem?.title",
          variables: [],
        },
      ],
    },
    loop: {
      items: [
        {
          expression: 'item.subTitles || []',
          variables: [],
        },
      ],
    },
  },
  form2: {
    props: {
      values: [
        {
          expression: "titles.value?.reduce((acc, { eleName, paramValue }) => {\n  acc[eleName] = paramValue\n  return acc;\n}, {\n  version: policyVersionList.value?.length === 1 ? policyVersionList.value[0]?.value : undefined\n})",
          variables: ["titles"],
        },
      ],
    },
  }
};

console.log(actualTree)

assert.deepEqual(actualTree, expectedTree, 'dependency tree should be correct in loop case')
