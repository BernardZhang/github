const data = {
  nodes: [
    {
      id: 'p1',
      labelType: 'person',
      label: '自然人1',
      color: 'orange'
    },
    {
      id: 'e1',
      label: '公司1',
      labelType: 'enterprise',
      color: 'lightblue'
    },
    {
      id: 'e7',
      label: '公司7',
      labelType: 'enterprise',
      color: 'yellow'
    },
    {
      id: 'e8',
      label: '公司8',
      labelType: 'enterprise',
      color: '#fff'
    },
    {
      id: 'e9',
      label: '公司9',
      labelType: 'enterprise',
      color: 'green'
    },
    {
      id: 'p4',
      label: '自然人4',
      labelType: 'person',
      color: 'orange'
    },
    {
      id: 'p2',
      label: '自然人2',
      labelType: 'person',
      color: 'orange'
    },
    {
      id: 'e10',
      label: '公司10',
      labelType: 'enterprise',
      color: 'green'
    },
    {
      id: 'p3',
      label: '自然人3',
      labelType: 'person',
      color: 'orange'
    },
    {
      id: 'e6',
      label: '公司6',
      labelType: 'enterprise',
      color: 'green'
    },
    {
      id: 'e2',
      label: '公司2',
      labelType: 'enterprise',
      color: 'yellow'
    },
    {
      id: 'e3',
      label: '公司3',
      labelType: 'enterprise',
      color: 'green'
    },
    {
      id: 'e4',
      label: '公司4',
      labelType: 'enterprise',
      color: '#fff'
    },
    {
      id: 'e5',
      label: '公司5',
      labelType: 'enterprise',
      color: 'yellow'
    },
    {
      id: 'e14',
      label: '公司14',
      labelType: 'enterprise',
      color: 'green'
    },
    {
      id: 'e15',
      label: '公司15',
      labelType: 'enterprise',
      color: 'green'
    },
    {
      id: 'e11',
      label: '公司11',
      labelType: 'enterprise',
      color: 'lightblue'
    },
    {
      id: 'e12',
      label: '公司12',
      labelType: 'enterprise',
      color: 'yellow'
    },
    {
      id: 'e13',
      label: '公司13',
      labelType: 'enterprise',
      color: 'yellow'
    },
    {
      id: 'e20',
      label: '公司20',
      labelType: 'enterprise',
      color: 'green'
    },
    {
      id: 'e21',
      label: '公司21',
      labelType: 'enterprise',
      color: 'orange'
    },
    {
      id: 'e50',
      label: '公司50',
      labelType: 'enterprise',
      color: 'green'
    }
  ],
  edges: [
    {
      id: 'p1-e1',
      source: 'p1',
      target: 'e1',
      label: '50%',
      value: 50,
      labelType: 'invest'
    },
    {
      id: 'p1-e7',
      source: 'p1',
      target: 'e7',
      label: '100%',
      value: 100,
      labelType: 'invest'
    },
    {
      id: 'p1-e8',
      source: 'p1',
      target: 'e8',
      label: '10%',
      value: 10,
      labelType: 'invest'
    },
    {
      id: 'e1-e10',
      source: 'e1',
      target: 'e10',
      label: '100%',
      value: 100,
      labelType: 'invest'
    },
    {
      id: 'e1-e6',
      source: 'e1',
      target: 'e6',
      label: '90%',
      value: 90,
      labelType: 'invest'
    },
    {
      id: 'e1-e2',
      source: 'e1',
      target: 'e2',
      label: '28%',
      value: 28,
      labelType: 'invest'
    },
    {
      id: 'e1-e3',
      source: 'e1',
      target: 'e3',
      label: '26%',
      value: 26,
      labelType: 'invest'
    },
    {
      id: 'e1-e4',
      source: 'e1',
      target: 'e4',
      label: '20%',
      value: 20,
      labelType: 'invest'
    },
    {
      id: 'e1-e5',
      source: 'e1',
      target: 'e5',
      label: '30%',
      value: 30,
      labelType: 'invest'
    },
    {
      id: 'e7-e21',
      source: 'e7',
      target: 'e21',
      label: '人工认定',
      value: 10,
      labelType: 'confirm'
    },
    {
      id: 'e9-e14',
      source: 'e9',
      target: 'e14',
      label: '50%',
      labelType: 'invest'
    },
    {
      id: 'e9-e15',
      source: 'e9',
      target: 'e15',
      label: '30%',
      labelType: 'invest'
    },
    {
      id: 'p4-e15',
      source: 'p4',
      target: 'e15',
      label: '20%',
      labelType: 'invest'
    },
    {
      id: 'p2-e11',
      source: 'p2',
      target: 'e11',
      label: '70%',
      value: 70,
      labelType: 'invest'
    },
    {
      id: 'e10-e11',
      source: 'e10',
      target: 'e11',
      label: '50%',
      labelType: 'invest'
    },
    {
      id: 'e10-e12',
      source: 'e10',
      target: 'e12',
      label: '30%',
      value: 30,
      labelType: 'invest'
    },
    {
      id: 'e11-e13',
      source: 'e11',
      target: 'e13',
      label: '30%',
      value: 30,
      labelType: 'invest'
    },
    {
      id: 'e12-e13',
      source: 'e12',
      target: 'e13',
      label: '30%',
      value: 30,
      labelType: 'invest'
    },
    {
      id: 'p3-e12',
      source: 'p3',
      target: 'e12',
      label: '10%',
      value: 10,
      labelType: 'invest'
    },
    {
      id: 'e3-e20',
      source: 'e3',
      target: 'e20',
      label: '人工认定',
      labelType: 'confirm'
    },
    {
      id: 'e3-e21',
      source: 'e3',
      target: 'e21',
      label: '人工认定',
      labelType: 'confirm'
    },
    {
      id: 'e3-e5',
      source: 'e3',
      target: 'e5',
      label: '40%',
      labelType: 'invest'
    },
    {
      id: 'e13-e50',
      source: 'e13',
      target: 'e50',
      label: '40%',
      labelType: 'invest'
    },
    {
      id: 'e14-e50',
      source: 'e14',
      target: 'e50',
      label: '50%',
      value: 10,
      labelType: 'invest'
    },
    {
      id: 'e15-e50',
      source: 'e15',
      target: 'e50',
      label: '50%',
      value: 10,
      labelType: 'invest'
    },
    {
      id: 'p1-p4',
      source: 'p1',
      target: 'p4',
      label: '50%',
      value: 10,
      labelType: 'confirm'
    },
  ]
};


const data2 = {
  nodes: [
    {
      id: 'pA',
      label: '自然人A(实控人)',
      labelType: 'person',
      controller: true
    },
    {
      id: 'pB',
      label: '自然人B(实控人)',
      labelType: 'person',
      controller: true
    },
    {
      id: 'pC',
      label: '自然人C',
      labelType: 'person'
    },
    {
      id: 'c0',
      label: '企业C0',
      labelType: 'enterprise'
    },
    {
      id: 'c1',
      label: '企业C1',
      labelType: 'enterprise'
    },
    {
      id: 'c9',
      label: '企业C9',
      labelType: 'enterprise'
    },
    {
      id: 'pE',
      label: '自然人E',
      labelType: 'person'
    },
    {
      id: 'c6',
      label: '企业C6',
      labelType: 'enterprise'
    },
    {
      id: 'c7',
      label: '企业C7',
      labelType: 'enterprise'
    },
    {
      id: 'c11',
      label: '企业C11',
      labelType: 'enterprise'
    },
    {
      id: 'c2',
      label: '企业C2',
      labelType: 'enterprise'
    },
    {
      id: 'c3',
      label: '企业C3',
      labelType: 'enterprise'
    },
    {
      id: 'c4',
      label: '企业C4',
      labelType: 'enterprise'
    },
    {
      id: 'c5',
      label: '企业C5',
      labelType: 'enterprise'
    },
    {
      id: 'c8',
      label: '企业C8',
      labelType: 'enterprise'
    },
    {
      id: 'c10',
      label: '企业C10',
      labelType: 'enterprise'
    }
  ],
  edges: [
    {
      source: 'pA',
      target: 'pB',
      type: 'relatives'
    },
    {
      source: 'pC',
      target: 'pB',
      type: 'relatives'
    },
    {
      source: 'pA',
      target: 'c0'
    },
    {
      source: 'c0',
      target: 'c2'
    },
    {
      source: 'c0',
      target: 'c3'
    },
    {
      source: 'c2',
      target: 'c8'
    },
    {
      source: 'c3',
      target: 'c8'
    },
    {
      source: 'c8',
      target: 'c10'
    },
    {
      source: 'pE',
      target: 'c2'
    },
    {
      source: 'pE',
      target: 'c1'
    },
    {
      source: 'c1',
      target: 'c11'
    },
    {
      source: 'c1',
      target: 'c2'
    },
    {
      source: 'c9',
      target: 'c11'
    },
    {
      source: 'c11',
      target: 'c8'
    },
    {
      source: 'c4',
      target: 'c8'
    },
    {
      source: 'c5',
      target: 'c8'
    },
    {
      source: 'pB',
      target: 'c4'
    },
    {
      source: 'pB',
      target: 'c5'
    },
    {
      source: 'pC',
      target: 'c6'
    },
    {
      source: 'pC',
      target: 'c7'
    }
  ].map(edge => ({
    ...edge,
    id: `${edge.source}-${edge.target}`,
    type: edge.type || 'invest'
  }))
};

const data3 = {
  nodes: [
    {
      id: 1,
      label: '中国建银投资有限责任公司浙江公司杭州分公公司余杭未来科技城余杭未来科技城',
      labelType: 'enterprise',
    },
    {
      id: 2,
      label: '浙江东方龙旅游服务有限公司蚌埠分公司',
      labelType: 'enterprise'
    },
    {
      id: 3,
      label: '马上消费金融有限公司',
      labelType: 'enterprise'
    },
    {
      id: 4,
      label: '马上消费金融有限公司2',
      labelType: 'enterprise'
    },
    {
      id: 5,
      label: '企业名称Ab',
      labelType: 'enterprise'
    },
    {
      id: 6,
      label: '企业名称Ab'
    },
    {
      id: 7,
      label: '企业名称Ab',
      labelType: 'enterprise'
    },
    {
      id: 8,
      label: '企业名称Ab',
      labelType: 'enterprise'
    },
    {
      id: 9,
      label: '企业名称Ab',
      labelType: 'enterprise'
    },
    {
      id: 10,
      label: '企业名称Ab',
      labelType: 'enterprise'
    },
    {
      id: 11,
      label: '企业名称Ab',
      labelType: 'enterprise'
    },
    {
      id: 12,
      label: '企业名称Ab',
      labelType: 'enterprise'
    },
    {
      id: 13,
      label: '企业名称Ab',
      labelType: 'enterprise'
    },
    {
      id: 14,
      label: '企业名称Ab',
      labelType: 'enterprise'
    },
    {
      id: 15,
      label: '企业名称Ab',
      labelType: 'enterprise'
    },
    {
      id: 16,
      label: '企业名称Ab',
      labelType: 'enterprise'
    }
  ].map((item, index) => ({
    ...item,
    id: index + 1,
    label: `${item.label}${index + 1}`
  })),
  edges: [
    {
      source: 1,
      target: 2
    },
    {
      source: 1,
      target: 3
    },
    {
      source: 1,
      target: 4
    },
    {
      source: 2,
      target: 5
    },
    {
      source: 2,
      target: 6
    },
    {
      source: 3,
      target: 6,
      isManual: true
    },
    {
      source: 3,
      target: 7
    },
    {
      source: 3,
      target: 8
    },
    {
      source: 3,
      target: 9,
      isManual: true
    },
    {
      source: 4,
      target: 9
    },
    {
      source: 4,
      target: 10
    },
    {
      source: 5,
      target: 11
    },
    {
      source: 5,
      target: 12
    },
    {
      source: 7,
      target: 13
    },
    {
      source: 7,
      target: 14
    },
    {
      source: 9,
      target: 15
    },
    {
      source: 11,
      target: 12
    },
    {
      source: 13,
      target: 15
    },
    {
      source: 13,
      target: 16
    },
    {
      source: 16,
      target: 5
    },
    {
      source: 15,
      target: 14
    }
  ].map(item => ({
    id: `${item.source}-${item.target}`,
    ...item
  }))
};

const data4 = {
  nodes: new Array(10).fill({

  }).map((item, index) => ({
    id: index + 1,
    label: index + 1
  })),
  edges: [
    {
      source: 5,
      target: 6
    },
    {
      source: 5,
      target: 7
    },
    {
      source: 5,
      target: 8
    },
    {
      source: 5,
      target: 9
    },
    {
      source: 1,
      target: 5
    },
    {
      source: 2,
      target: 5
    }
  ].map(item => ({
    id: `${item.source}-${item.target}`,
    ...item
  }))
}

export default data;

export const dataMap = {
  data,
  data2,
  data3,
  data4
};