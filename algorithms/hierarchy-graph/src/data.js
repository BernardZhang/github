const updateNodesStyle = nodes => nodes.map(item => {
    if (item.isInnerGroup === false || item.labelType === 'person') {
        item.style = {
            fill: '#fff',
            stroke: '#000'
        };
    }

    if (item.isCustomer === false) {
        item.style = {
            fill: 'lightgrey',
            stroke: '#000'
        };
    }

    return item;
});

export default {
    nodes: updateNodesStyle([
        {
            id: '1',
            labelType: 'enterprise',
            label: '国资委',
            isInnerGroup: false
        },
        {
            id: '2',
            label: '中信集团有限公司',
            labelType: 'enterprise'
        },
        {
            id: '6',
            label: '中银消费金融有限公司',
            labelType: 'enterprise'
        },
        {
            id: '9',
            label: '中证信用有限公司',
            labelType: 'enterprise',
            isInnerGroup: false
        },
        {
            id: '3',
            label: '中信证券有限公司',
            labelType: 'enterprise'
        },
        {
            id: '10',
            label: '中信信托有限公司',
            labelType: 'enterprise',
            isCustomer: false
        },
        {
            id: '5',
            label: '忠诚商贸有限公司',
            labelType: 'enterprise'
        },
        {
            id: '4',
            label: '中信投资有限公司',
            labelType: 'enterprise'
        },
        {
            id: '7',
            label: '中原消费金融有限公司',
            labelType: 'enterprise'
        },
        {
            id: '8',
            label: '马上消费金融有限公司',
            labelType: 'enterprise'
        },
        {
            id: 'p1',
            label: '徐天堂',
            labelType: 'person'
        },
        {
            id: 'p2',
            label: '周柏豪',
            labelType: 'person'
        }
    ]),
    edges: [
        {
            id: 'e1',
            source: '1',
            target: '2',
            label: '90%',
            value: 90,
            labelType: 'invest'
        },
        {
            id: 'e2',
            source: '2',
            target: '3',
            label: '100%',
            value: 100,
            labelType: 'invest'
        },
        {
            id: 'e3',
            source: '2',
            target: '5',
            label: '10%',
            value: 10,
            labelType: 'invest'
        },
        {
            id: 'e4',
            source: '2',
            target: '6',
            label: '100%',
            value: 100,
            labelType: 'invest'
        },
        {
            id: 'e5',
            source: '2',
            target: '10',
            label: '90%',
            value: 90,
            labelType: 'invest'
        },
        {
            id: 'e6',
            source: '3',
            target: '4',
            label: '28%',
            value: 28,
            labelType: 'invest'
        },
        {
            id: 'e7',
            source: '10',
            target: '4',
            label: '26%',
            value: 26,
            labelType: 'invest'
        },
        {
            id: 'e8',
            source: '5',
            target: '4',
            label: '20%',
            value: 20,
            labelType: 'invest'
        },
        {
            id: 'e9',
            source: '4',
            target: '9',
            label: '30%',
            value: 30,
            labelType: 'invest'
        },
        {
            id: 'e10',
            source: '9',
            target: '2',
            label: '10%',
            value: 10,
            labelType: 'invest'
        },
        {
            id: 'e11',
            source: 'p1',
            target: '2',
            label: '法人代表',
            labelType: 'position'
        },
        {
            id: 'e12',
            source: 'p1',
            target: '6',
            label: '董事长',
            labelType: 'position'
        },
        {
            id: 'e13',
            source: 'p2',
            target: '6',
            label: '60%',
            value: 60,
            labelType: 'invest'
        },
        {
            id: 'e14',
            source: 'p2',
            target: '7',
            label: '70%',
            value: 70,
            labelType: 'invest'
        },
        {
            id: 'e15',
            source: 'p2',
            target: '8',
            label: '总经理',
            labelType: 'position'
        },
        {
            id: 'e9-13',
            source: '9',
            target: '13',
            label: '80%',
            value: 80,
            labelType: 'invest'
        },
        {
            id: 'e6-9',
            source: '6',
            target: '9',
            label: '10%',
            value: 10,
            labelType: 'invest'
        },
        {
            id: 'e9-13',
            source: '9',
            target: '13',
            label: '80%',
            value: 80,
            labelType: 'invest'
        }
    ]
};

export const data1 = {
    nodes: updateNodesStyle([
        {
            id: '1',
            labelType: 'enterprise',
            label: '国资委',
            isInnerGroup: false
        },
        {
            id: '2',
            label: '中信集团有限公司',
            labelType: 'enterprise'
        },
        {
            id: '3',
            label: '中信证券有限公司',
            labelType: 'enterprise'
        },
        {
            id: '4',
            label: '中信投资有限公司',
            labelType: 'enterprise'
        },
        {
            id: '5',
            label: '忠诚商贸有限公司',
            labelType: 'enterprise'
        },
        {
            id: '6',
            label: '中银消费金融有限公司',
            labelType: 'enterprise'
        },
        {
            id: '7',
            label: '中原消费金融有限公司',
            labelType: 'enterprise'
        },
        {
            id: '8',
            label: '马上消费金融有限公司',
            labelType: 'enterprise'
        },
        {
            id: '9',
            label: '中证信用有限公司',
            labelType: 'enterprise',
            isInnerGroup: false
        },
        {
            id: '10',
            label: '中信信托有限公司',
            labelType: 'enterprise',
            isCustomer: false
        },
        {
            id: '11',
            label: '徐天堂',
            labelType: 'person'
        },
        {
            id: '12',
            label: '周柏豪',
            labelType: 'person'
        },
        {
            id: '13',
            label: '企业A',
            labelType: 'enterprise'
        },
        {
            id: 'node1',
            label: '企业1',
            labelType: 'enterprise',
            isInnerGroup: false
        },
        {
            id: 'node2',
            label: '企业2',
            labelType: 'enterprise',
            isInnerGroup: false
        },
        {
            id: 'node3',
            label: '企业3',
            labelType: 'enterprise',
            isInnerGroup: false
        },
    ]),
    edges: [
        {
            id: 'e1',
            source: '1',
            target: '2',
            label: '90%',
            value: 90,
            labelType: 'invest'
        },
        {
            id: 'e2',
            source: '2',
            target: '3',
            label: '100%',
            value: 100,
            labelType: 'invest'
        },
        {
            id: 'e3',
            source: '2',
            target: '5',
            label: '100%',
            value: 100,
            labelType: 'invest'
        },
        {
            id: 'e4',
            source: '2',
            target: '6',
            label: '100%',
            value: 100,
            labelType: 'invest'
        },
        {
            id: 'e5',
            source: '2',
            target: '10',
            label: '100%',
            value: 100,
            labelType: 'invest'
        },
        {
            id: 'e6',
            source: '3',
            target: '4',
            label: '28%',
            value: 28,
            labelType: 'invest'
        },
        {
            id: 'e7',
            source: '10',
            target: '4',
            label: '26%',
            value: 26,
            labelType: 'invest'
        },
        {
            id: 'e8',
            source: '5',
            target: '4',
            label: '20%',
            value: 20,
            labelType: 'invest'
        },
        {
            id: 'e9',
            source: '4',
            target: '9',
            label: '30%',
            value: 30,
            labelType: 'invest'
        },
        {
            id: 'e10',
            source: '9',
            target: '2',
            label: '10%',
            value: 10,
            labelType: 'invest'
        },
        {
            id: 'e11',
            source: '11',
            target: '2',
            label: '法人代表',
            labelType: 'position'
        },
        {
            id: 'e12',
            source: '11',
            target: '6',
            label: '董事长',
            labelType: 'position'
        },
        {
            id: 'e13',
            source: '12',
            target: '6',
            label: '60%',
            value: 60,
            labelType: 'invest'
        },
        {
            id: 'e14',
            source: '12',
            target: '7',
            label: '70%',
            value: 70,
            labelType: 'invest'
        },
        {
            id: 'e15',
            source: '12',
            target: '8',
            label: '总经理',
            labelType: 'position'
        },
        {
            id: 'e9-13',
            source: '9',
            target: '13',
            label: '80%',
            value: 80,
            labelType: 'invest'
        },
        {
            id: 'e6-9',
            source: '6',
            target: '9',
            label: '10%',
            value: 10,
            labelType: 'invest'
        },
        {
            id: 'enode1-13',
            source: 'node1',
            target: '13',
            label: '80%',
            value: 80,
            labelType: 'invest'
        },
        {
            id: 'e9-node2',
            source: '9',
            target: 'node2',
            label: '80%',
            value: 80,
            labelType: 'invest'
        },
        {
            id: 'enode2-13',
            source: 'node2',
            target: '13',
            label: '50%',
            value: 50,
            labelType: 'invest'
        },
        {
            id: 'e4-node3',
            source: '4',
            target: 'node3',
            label: '50%',
            value: 50,
            labelType: 'invest'
        },
        {
            id: 'enode3-node1',
            source: 'node3',
            target: 'node1',
            label: '80%',
            value: 80,
            labelType: 'invest'
        }
    ]
};

export const data2 = {
    ...data1,
    edges: data1.edges.concat([
        {
            id: 'xe10-6',
            source: '10',
            target: '6',
            label: '50%',
            value: 50
        },
        {
            id: 'xe2-8',
            source: '2',
            target: '8',
            label: '50%',
            value: 50
        },
        {
            id: 'xe8-2',
            source: '8',
            target: '2',
            label: '50%',
            value: 50
        },
        {
            id: 'xe3-6',
            source: '3',
            target: '6',
            label: '50%',
            value: 50
        }
    ])
};

export const case1 = {
    nodes: updateNodesStyle([
        {
            id: '1',
            label: '企业A',
            labelType: 'enterprise'
        },
        {
            id: 'a',
            label: 'a',
            labelType: 'enterprise',
            isInnerGroup: false
        },
        {
            id: 'b',
            label: 'b',
            labelType: 'enterprise',
            isInnerGroup: false
        },
        {
            id: 'c',
            label: 'c',
            labelType: 'enterprise',
            isInnerGroup: false
        },
        {
            id: 'd',
            label: 'd',
            labelType: 'enterprise',
            isInnerGroup: false
        },
        {
            id: '6',
            label: '企业B',
            labelType: 'enterprise'
        }
    ]),
    edges: [
        {
            id: 'e1',
            source: '1',
            target: 'a',
            value: 80
        },
        {
            id: 'e2',
            source: '1',
            target: 'b',
            value: 30
        },
        {
            id: 'e3',
            source: 'a',
            target: 'c',
            value: 80
        },
        {
            id: 'e4',
            source: 'b',
            target: 'd',
            value: 80
        },
        {
            id: 'e5',
            source: 'b',
            target: '6',
            value: 80
        },
        {
            id: 'e6',
            source: 'c',
            target: '6',
            value: 80
        },
        {
            id: 'e7',
            source: 'd',
            target: '6',
            value: 80
        }
    ].map(item => ({ label: item.value, ...item }))
};

export const case2 = {
    nodes: updateNodesStyle([
        {
            id: '1',
            label: '企业A',
            labelType: 'enterprise'
        },
        {
            id: 'a',
            label: 'a',
            labelType: 'enterprise',
            isInnerGroup: false
        },
        {
            id: 'b',
            label: 'b',
            labelType: 'enterprise',
            isInnerGroup: false
        },
        {
            id: 'c',
            label: 'c',
            labelType: 'enterprise',
            isInnerGroup: false
        }
    ]),
    edges: [
        {
            id: 'e1',
            source: '1',
            target: 'a',
            value: 80
        },
        {
            id: 'e2',
            source: '1',
            target: 'a',
            value: 30
        },
        {
            id: 'e3',
            source: 'a',
            target: '1',
            value: 80
        },
        {
            id: 'e4',
            source: '1',
            target: 'c',
            value: 80
        },
        {
            id: 'e5',
            source: 'a',
            target: 'c',
            value: 80,
            type: 'quadratic'
        },
    ].map(item => ({ label: item.value, ...item }))
};

export const data20 = {
    nodes: new Array(20).fill({}).map((item, i) => {
        const labelType = ['enterprise', 'person'][Math.random() < 0.8 ? 0 : 1];
        const label = {
            enterprise: '企业',
            person: '人'
        }[labelType];
        const isInnerGroup = labelType === 'enterprise' && Math.random() < 0.7 ? true : false;

        return {
            id: `${i}`,
            labelType,
            label: `${label}${i}`,
            isInnerGroup,
            ...(isInnerGroup ? {
                isCustomer: isInnerGroup && Math.random() < 0.8 ? true : false
            } : {})
        };
    })
};

data20.nodes = updateNodesStyle(data20.nodes);
data20.edges = data20.nodes.reduce((edges, node, idx, nodes) => {
    const levelNodesCount = [1, 2, 3, 4, 5, 5];

    const createEdge = (source, target) => {
        const value = ~~(Math.random() * 100);

        return {
            id: `e${source.id}->${target.id}`,
            source: source.id,
            target: target.id,
            labelType: 'invest',
            label: `${value}%`,
            value
        };
    };

    // 一层
    if (idx === 0) {
        edges = [
            ...edges,
            ...nodes.slice(1, 3).map(target => createEdge(node, target))
        ];
    }

    // 二层
    if (idx === 1) {
        edges = [
            ...edges,
            ...nodes.slice(3, 5).map(target => createEdge(node, target))
        ];
    }

    if (idx === 2) {
        edges = [
            ...edges,
            ...nodes.slice(5, 6).map(target => createEdge(node, target))
        ];
    }

    // 三层
    if (idx === 3) {
        edges = [
            ...edges,
            ...nodes.slice(6, 10).map(target => createEdge(node, target))
        ];
    }

    if (idx === 4) {
        edges = [
            ...edges,
            ...nodes.slice(8, 10).map(target => createEdge(node, target))
        ];
    }

    if (idx === 5) {
        edges = [
            ...edges,
            ...nodes.slice(9, 10).map(target => createEdge(node, target))
        ];
    }

    // 四层
    if (idx === 6) {
        edges = [
            ...edges,
            ...nodes.slice(10, 15).map(target => createEdge(node, target))
        ];
    }

    if (idx === 7) {
        edges = [
            ...edges,
            ...nodes.slice(12, 13).map(target => createEdge(node, target))
        ];
    }

    if (idx === 8) {
        edges = [
            ...edges,
            ...nodes.slice(13, 15).map(target => createEdge(node, target))
        ];
    }

    if (idx === 9) {
        edges = [
            ...edges,
            ...nodes.slice(14, 16).map(target => createEdge(node, target))
        ];
    }

    // 五层
    if (idx === 9) {
        edges = [
            ...edges,
            ...nodes.slice(16, 19).map(target => createEdge(node, target))
        ];
    }

    if (idx === 10) {
        edges = [
            ...edges,
            ...nodes.slice(16, 19).map(target => createEdge(node, target))
        ];
    }

    if (idx === 11) {
        edges = [
            ...edges,
            ...nodes.slice(16, 18).map(target => createEdge(node, target))
        ];
    }

    if (idx === 12) {
        edges = [
            ...edges,
            ...nodes.slice(18, 19).map(target => createEdge(node, target))
        ];
    }

    if (idx === 13) {
        edges = [
            ...edges,
            ...nodes.slice(18, 20).map(target => createEdge(node, target))
        ];
    }

    // 六层
    // if (idx === 14) {
    //     edges = [
    //         ...edges,
    //         ...nodes.slice(6, 10).map(target => createEdge(node, target))
    //     ];
    // }

    // if (idx === 15) {
    //     edges = [
    //         ...edges,
    //         ...nodes.slice(6, 10).map(target => createEdge(node, target))
    //     ];
    // }

    // if (idx === 16) {
    //     edges = [
    //         ...edges,
    //         ...nodes.slice(6, 10).map(target => createEdge(node, target))
    //     ];
    // }

    // if (idx === 17) {
    //     edges = [
    //         ...edges,
    //         ...nodes.slice(6, 10).map(target => createEdge(node, target))
    //     ];
    // }

    // if (idx === 18) {
    //     edges = [
    //         ...edges,
    //         ...nodes.slice(6, 10).map(target => createEdge(node, target))
    //     ];
    // }

    return edges;
}, []);



export const formatData = {
    "nodes": [
      {
        "is_hnjt": true,
        "id": "6",
        "label": "enterprise",
        "properties": {
          "name": "中信集团有限公司",
          "uid": "55525074ACFE2A73D56C75DFF1999F3D",
          "is_customer": "1"
        },
        "entityType": "enterprise",
        "isRoot": true
      },
      {
        "is_hnjt": true,
        "id": "2",
        "label": "enterprise",
        "properties": {
          "name": "中信证券有限公司",
          "uid": "1BCDC1144B3A4053E6DA415DBA95C123",
          "is_customer": "1"
        },
        "entityType": "enterprise",
        "isRoot": false
      },
      {
        "is_hnjt": true,
        "id": "4",
        "label": "enterprise",
        "properties": {
          "name": "中信信托有限公司",
          "uid": "B72C920708E2994340B84FF8D54CD93C",
          "is_customer": "0"
        },
        "entityType": "enterprise",
        "isRoot": false
      },
      {
        "is_hnjt": true,
        "id": "9",
        "label": "enterprise",
        "properties": {
          "name": "忠诚贸易有限公司",
          "uid": "F5AA3DABE347EDCD32580FA00A5A273F",
          "is_customer": "1"
        },
        "entityType": "enterprise",
        "isRoot": false
      },
      {
        "is_hnjt": true,
        "id": "5",
        "label": "enterprise",
        "properties": {
          "name": "中信投资有限公司",
          "uid": "4A3DE15135ED2573114D99A2CC718F04",
          "is_customer": "1"
        },
        "entityType": "enterprise",
        "isRoot": false
      },
      {
        "is_hnjt": true,
        "id": "1",
        "label": "enterprise",
        "properties": {
          "name": "中银消费金融有限公司",
          "uid": "81B2DDE929FC7299358F9E712D0275C9",
          "is_customer": "1"
        },
        "entityType": "enterprise",
        "isRoot": false
      },
      {
        "is_hnjt": true,
        "id": "8",
        "label": "enterprise",
        "properties": {
          "name": "中原消费金融有限公司",
          "uid": "F5AA3DABE347EDCD32580FA00A5A273F",
          "is_customer": "1"
        },
        "entityType": "enterprise",
        "isRoot": false
      },
      {
        "is_hnjt": true,
        "id": "3",
        "label": "enterprise",
        "properties": {
          "name": "马上消费金融有限公司",
          "uid": "13D2F69E1D503B327696134E794929A0",
          "is_customer": "1"
        },
        "entityType": "enterprise",
        "isRoot": false
      },
      {
        "is_hnjt": true,
        "id": "7",
        "label": "enterprise",
        "properties": {
          "name": "行内集团企业",
          "uid": "E24193D7C65AF0BDA7D1D9A16D4E9603",
          "is_customer": "1"
        },
        "entityType": "enterprise",
        "isRoot": false
      }
    ],
    "edges": [
      {
        "relationType": "same_officer_ctrl",
        "label": "同核心高管/控制人",
        "id": "a0",
        "target": "1",
        "source": "6",
        "properties": {
          "manager_name": "徐天堂",
          "_edge_multi": "MULTI",
          "edge_uid": "f60f83dc1aa99a362040c29557acb3ff0",
          "_rule_uuid": [
            "20201124160159029e679ed1ffca8412"
          ]
        }
      },
      {
        "relationType": "belong",
        "label": "控股100%",
        "id": "a1",
        "target": "2",
        "source": "6",
        "properties": {
          "_edge_multi": "SIMPLE",
          "control_ratio": 100,
          "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210",
          "_rule_uuid": [
            "202011241601283621c1506142e884cf"
          ]
        }
      },
      {
        "relationType": "belong",
        "label": "控股90%",
        "id": "a2",
        "target": "4",
        "source": "6",
        "properties": {
          "_edge_multi": "SIMPLE",
          "control_ratio": 90,
          "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-1",
          "_rule_uuid": [
            "202011241601283621c1506142e884cf"
          ]
        }
      },
      {
        "relationType": "belong",
        "label": "控股81%",
        "id": "a3",
        "target": "9",
        "source": "6",
        "properties": {
          "_edge_multi": "SIMPLE",
          "control_ratio": 81,
          "edge_uid": "be1b6746030df78452e27dc77a9504950",
          "_rule_uuid": [
            "202011241601283621c1506142e884cf"
          ]
        }
      },
      {
        "relationType": "belong",
        "label": "控股53.4%",
        "id": "a4",
        "target": "1",
        "source": "6",
        "properties": {
          "_edge_multi": "SIMPLE",
          "control_ratio": 53.4,
          "edge_uid": "3015c988deab20d53b239a7dba55bac70",
          "_rule_uuid": [
            "202011241601283621c1506142e884cf"
          ]
        }
      },
      {
        "relationType": "belong",
        "label": "控股90%",
        "id": "a5",
        "target": "5",
        "source": "2",
        "properties": {
          "_edge_multi": "SIMPLE",
          "control_ratio": 90,
          "edge_uid": "8f946b5ac2dc74875cf72eece13456580",
          "_rule_uuid": [
            "202011241601283621c1506142e884cf"
          ]
        }
      },
      {
        "relationType": "belong",
        "label": "控股90%",
        "id": "a6",
        "target": "5",
        "source": "4",
        "properties": {
          "_edge_multi": "SIMPLE",
          "control_ratio": 90,
          "edge_uid": "451aab43a50025c0c324026eb2353c130",
          "_rule_uuid": [
            "202011241601283621c1506142e884cf"
          ]
        }
      },
      {
        "relationType": "belong",
        "label": "控股90%",
        "id": "a7",
        "target": "5",
        "source": "9",
        "properties": {
          "_edge_multi": "SIMPLE",
          "control_ratio": 90,
          "edge_uid": "780889bc7745bcb26fff8a873d66582e0",
          "_rule_uuid": [
            "202011241601283621c1506142e884cf"
          ]
        }
      },
      {
        "relationType": "same_officer_ctrl",
        "label": "同核心高管/控制人",
        "id": "a8",
        "target": "8",
        "source": "1",
        "properties": {
          "manager_name": "周柏豪",
          "_edge_multi": "MULTI",
          "edge_uid": "8ae095aa5d02c1fdf4b6a585559ad2780",
          "_rule_uuid": [
            "20201124160159029e679ed1ffca8412"
          ]
        }
      },
      {
        "relationType": "same_officer_ctrl",
        "label": "同核心高管/控制人",
        "id": "a9",
        "target": "3",
        "source": "1",
        "properties": {
          "manager_name": "周柏豪",
          "_edge_multi": "MULTI",
          "edge_uid": "46c7a853fde28d47ee96977ac44a936b0",
          "_rule_uuid": [
            "20201124160159029e679ed1ffca8412"
          ]
        }
      },
      {
        "relationType": "same_officer_ctrl",
        "label": "同核心高管/控制人",
        "id": "a10",
        "target": "8",
        "source": "3",
        "properties": {
          "manager_name": "周柏豪",
          "_edge_multi": "MULTI",
          "edge_uid": "4d03d8e6bb449c94acebe5d13006ace20",
          "_rule_uuid": [
            "20201124160159029e679ed1ffca8412"
          ]
        }
      },
      {
        "relationType": "same_officer_ctrl",
        "label": "同核心高管/控制人",
        "id": "a11",
        "target": "7",
        "source": "11",
        "properties": {
          "manager_name": "周柏豪",
          "_edge_multi": "MULTI",
          "edge_uid": "34735b0a6cfb909f01031d89ae18d3bc0",
          "_rule_uuid": [
            "20201124160159029e679ed1ffca8412"
          ]
        }
      },
      {
        "relationType": "same_officer_ctrl",
        "label": "同核心高管/控制人",
        "id": "a12",
        "target": "5",
        "source": "7",
        "properties": {
          "manager_name": "徐天堂",
          "_edge_multi": "MULTI",
          "edge_uid": "4ca5b578f52e09d6803b6426d3b567050",
          "_rule_uuid": [
            "20201124160159029e679ed1ffca8412"
          ]
        }
      },
      {
        "id": "5-101-6",
        "source": "5",
        "ratio": 3,
        "relationType": "indirect_invest",
        "linkedNodes": [
          {
            "is_hnjt": true,
            "id": "5",
            "label": "enterprise",
            "properties": {
              "name": "中信投资有限公司",
              "uid": "4A3DE15135ED2573114D99A2CC718F04",
              "is_customer": "1"
            },
            "entityType": "enterprise"
          },
          {
            "id": "101",
            "is_hnjt": false,
            "label": "enterprise",
            "properties": {
              "name": "中证信用有限公司",
              "uid": "55525074ACFE2A73D56C75DFF1999F3D-101"
            },
            "entityType": "enterprise"
          },
          {
            "is_hnjt": true,
            "id": "6",
            "label": "enterprise",
            "properties": {
              "name": "中信集团有限公司",
              "uid": "55525074ACFE2A73D56C75DFF1999F3D",
              "is_customer": "1"
            },
            "entityType": "enterprise"
          }
        ],
        "linkedEdges": [
          {
            "relationType": "invest",
            "label": "投资30%",
            "id": "5->101",
            "target": "101",
            "source": "5",
            "properties": {
              "_edge_multi": "SIMPLE",
              "ratio": 30,
              "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-101",
              "_rule_uuid": [
                "202011241601283621c1506142e884cf"
              ]
            }
          },
          {
            "relationType": "invest",
            "label": "投资10%",
            "id": "101->6",
            "target": "6",
            "source": "101",
            "properties": {
              "_edge_multi": "SIMPLE",
              "ratio": 10,
              "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-102",
              "_rule_uuid": [
                "202011241601283621c1506142e884cf"
              ]
            }
          }
        ],
        "target": "6",
        "isIndirect": true,
        "label": "间接持股3%",
        "style": {
          "lineDash": [
            10,
            5
          ],
          "endArrow": true,
          "cursor": "pointer"
        },
        "linkedEdgesArray": [
          [
            {
              "relationType": "invest",
              "label": "投资30%",
              "id": "5->101",
              "target": "101",
              "source": "5",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 30,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-101",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            },
            {
              "relationType": "invest",
              "label": "投资10%",
              "id": "101->6",
              "target": "6",
              "source": "101",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 10,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-102",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            }
          ]
        ],
        "linkedNodesArray": [
          [
            {
              "is_hnjt": true,
              "id": "5",
              "label": "enterprise",
              "properties": {
                "name": "中信投资有限公司",
                "uid": "4A3DE15135ED2573114D99A2CC718F04",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            },
            {
              "id": "101",
              "is_hnjt": false,
              "label": "enterprise",
              "properties": {
                "name": "中证信用有限公司",
                "uid": "55525074ACFE2A73D56C75DFF1999F3D-101"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": true,
              "id": "6",
              "label": "enterprise",
              "properties": {
                "name": "中信集团有限公司",
                "uid": "55525074ACFE2A73D56C75DFF1999F3D",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            }
          ]
        ]
      },
      {
        "id": "1-101-6",
        "source": "1",
        "ratio": 3,
        "relationType": "indirect_invest",
        "linkedNodes": [
          {
            "id": "1",
            "is_hnjt": true,
            "label": "enterprise",
            "properties": {
              "name": "中银消费金融有限公司",
              "uid": "55525074ACFE2A73D56C75DFF1999F3D-101"
            },
            "entityType": "enterprise"
          },
          {
            "is_hnjt": false,
            "id": "101",
            "label": "enterprise",
            "properties": {
              "name": "中证信用有限公司",
              "uid": "55525074ACFE2A73D56C75DFF1999F3D",
              "is_customer": "1"
            },
            "entityType": "enterprise"
          },
          {
            "is_hnjt": true,
            "id": "6",
            "label": "enterprise",
            "properties": {
              "name": "中信集团有限公司",
              "uid": "4A3DE15135ED2573114D99A2CC718F04",
              "is_customer": "1"
            },
            "entityType": "enterprise"
          }
        ],
        "linkedEdges": [
          {
            "relationType": "invest",
            "label": "投资30%",
            "id": "1->101",
            "target": "101",
            "source": "1",
            "properties": {
              "_edge_multi": "SIMPLE",
              "ratio": 30,
              "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-101",
              "_rule_uuid": [
                "202011241601283621c1506142e884cf"
              ]
            }
          },
          {
            "relationType": "invest",
            "label": "投资10%",
            "id": "101->6",
            "target": "6",
            "source": "101",
            "properties": {
              "_edge_multi": "SIMPLE",
              "ratio": 10,
              "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-102",
              "_rule_uuid": [
                "202011241601283621c1506142e884cf"
              ]
            }
          }
        ],
        "target": "6",
        "isIndirect": true,
        "label": "间接持股3%",
        "style": {
          "lineDash": [
            10,
            5
          ],
          "endArrow": true,
          "cursor": "pointer"
        },
        "linkedEdgesArray": [
          [
            {
              "relationType": "invest",
              "label": "投资30%",
              "id": "1->101",
              "target": "101",
              "source": "1",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 30,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-101",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            },
            {
              "relationType": "invest",
              "label": "投资10%",
              "id": "101->6",
              "target": "6",
              "source": "101",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 10,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-102",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            }
          ]
        ],
        "linkedNodesArray": [
          [
            {
              "id": "1",
              "is_hnjt": true,
              "label": "enterprise",
              "properties": {
                "name": "中银消费金融有限公司",
                "uid": "55525074ACFE2A73D56C75DFF1999F3D-101"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": false,
              "id": "101",
              "label": "enterprise",
              "properties": {
                "name": "中证信用有限公司",
                "uid": "55525074ACFE2A73D56C75DFF1999F3D",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": true,
              "id": "6",
              "label": "enterprise",
              "properties": {
                "name": "中信集团有限公司",
                "uid": "4A3DE15135ED2573114D99A2CC718F04",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            }
          ]
        ]
      },
      {
        "id": "5-201-202-7",
        "source": "5",
        "ratio": 68,
        "relationType": "indirect_invest",
        "linkedNodes": [
          {
            "id": "5",
            "is_hnjt": true,
            "label": "enterprise",
            "properties": {
              "name": "中银消费金融有限公司",
              "uid": "55525074ACFE2A73D56C75DFF1999F3D-101"
            },
            "entityType": "enterprise"
          },
          {
            "is_hnjt": false,
            "id": "201",
            "label": "enterprise",
            "properties": {
              "name": "企业1",
              "uid": "55525074ACFE2A73D56C75DFF1999F3D",
              "is_customer": "1"
            },
            "entityType": "enterprise"
          },
          {
            "is_hnjt": false,
            "id": "202",
            "label": "enterprise",
            "properties": {
              "name": "企业2",
              "uid": "4A3DE15135ED2573114D99A2CC718F04",
              "is_customer": "1"
            },
            "entityType": "enterprise"
          },
          {
            "is_hnjt": true,
            "id": "7",
            "label": "enterprise",
            "properties": {
              "name": "行内集团企业",
              "uid": "4A3DE15135ED2573114D99A2CC718F04",
              "is_customer": "1"
            },
            "entityType": "enterprise"
          }
        ],
        "linkedEdges": [
          {
            "relationType": "invest",
            "label": "投资50%",
            "id": "5->201",
            "target": "201",
            "source": "5",
            "properties": {
              "_edge_multi": "SIMPLE",
              "ratio": 50,
              "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-201",
              "_rule_uuid": [
                "202011241601283621c1506142e884cf"
              ]
            }
          },
          {
            "relationType": "invest",
            "label": "投资80%",
            "id": "201->202",
            "target": "202",
            "source": "201",
            "properties": {
              "_edge_multi": "SIMPLE",
              "ratio": 80,
              "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-202",
              "_rule_uuid": [
                "202011241601283621c1506142e884cf"
              ]
            }
          },
          {
            "relationType": "invest",
            "label": "投资80%",
            "id": "202->7",
            "target": "7",
            "source": "202",
            "properties": {
              "_edge_multi": "SIMPLE",
              "ratio": 80,
              "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-203",
              "_rule_uuid": [
                "202011241601283621c1506142e884cf"
              ]
            }
          }
        ],
        "target": "7",
        "isIndirect": true,
        "label": "间接持股68%",
        "style": {
          "lineDash": [
            10,
            5
          ],
          "endArrow": true,
          "cursor": "pointer"
        },
        "linkedEdgesArray": [
          [
            {
              "relationType": "invest",
              "label": "投资50%",
              "id": "5->201",
              "target": "201",
              "source": "5",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 50,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-201",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            },
            {
              "relationType": "invest",
              "label": "投资80%",
              "id": "201->202",
              "target": "202",
              "source": "201",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 80,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-202",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            },
            {
              "relationType": "invest",
              "label": "投资80%",
              "id": "202->7",
              "target": "7",
              "source": "202",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 80,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-203",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            }
          ],
          [
            {
              "relationType": "invest",
              "label": "投资30%",
              "id": "5->101",
              "target": "101",
              "source": "5",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 30,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-x201",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            },
            {
              "relationType": "invest",
              "label": "投资80%",
              "id": "101->203",
              "target": "203",
              "source": "101",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 80,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-x202",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            },
            {
              "relationType": "invest",
              "label": "投资50%",
              "id": "203->7",
              "target": "7",
              "source": "203",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 50,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-x203",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            }
          ],
          [
            {
              "relationType": "invest",
              "label": "投资30%",
              "id": "5->101",
              "target": "101",
              "source": "5",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 30,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-y201",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            },
            {
              "relationType": "invest",
              "label": "投资80%",
              "id": "101->7",
              "target": "7",
              "source": "101",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 80,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-y202",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            }
          ]
        ],
        "linkedNodesArray": [
          [
            {
              "id": "5",
              "is_hnjt": true,
              "label": "enterprise",
              "properties": {
                "name": "中银消费金融有限公司",
                "uid": "55525074ACFE2A73D56C75DFF1999F3D-101"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": false,
              "id": "201",
              "label": "enterprise",
              "properties": {
                "name": "企业1",
                "uid": "55525074ACFE2A73D56C75DFF1999F3D",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": false,
              "id": "202",
              "label": "enterprise",
              "properties": {
                "name": "企业2",
                "uid": "4A3DE15135ED2573114D99A2CC718F04",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": true,
              "id": "7",
              "label": "enterprise",
              "properties": {
                "name": "行内集团企业",
                "uid": "4A3DE15135ED2573114D99A2CC718F04",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            }
          ],
          [
            {
              "id": "5",
              "is_hnjt": true,
              "label": "enterprise",
              "properties": {
                "name": "中银消费金融有限公司",
                "uid": "55525074ACFE2A73D56C75DFF1999F3D-x1"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": false,
              "id": "101",
              "label": "enterprise",
              "properties": {
                "name": "中证信用有限公司",
                "uid": "55525074ACFE2A73D56C75DFF1999F3D-x2",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": false,
              "id": "203",
              "label": "enterprise",
              "properties": {
                "name": "企业3",
                "uid": "4A3DE15135ED2573114D99A2CC718F04",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": true,
              "id": "7",
              "label": "enterprise",
              "properties": {
                "name": "行内集团企业",
                "uid": "4A3DE15135ED2573114D99A2CC718F04",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            }
          ],
          [
            {
              "id": "5",
              "is_hnjt": true,
              "label": "enterprise",
              "properties": {
                "name": "中信投资有限公司",
                "uid": "55525074ACFE2A73D56C75DFF1999F3D-x1"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": false,
              "id": "101",
              "label": "enterprise",
              "properties": {
                "name": "中证信用有限公司",
                "uid": "55525074ACFE2A73D56C75DFF1999F3D-x2",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": true,
              "id": "7",
              "label": "enterprise",
              "properties": {
                "name": "行内集团企业",
                "uid": "4A3DE15135ED2573114D99A2CC718F04",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            }
          ]
        ]
      },
      {
        "id": "1-101-202-7",
        "source": "1",
        "ratio": 12,
        "relationType": "indirect_invest",
        "linkedNodes": [
          {
            "id": "1",
            "is_hnjt": true,
            "label": "enterprise",
            "properties": {
              "name": "中银消费金融有限公司",
              "uid": "55525074ACFE2A73D56C75DFF1999F3D-x1"
            },
            "entityType": "enterprise"
          },
          {
            "is_hnjt": false,
            "id": "101",
            "label": "enterprise",
            "properties": {
              "name": "中证信用有限公司",
              "uid": "55525074ACFE2A73D56C75DFF1999F3D-x2",
              "is_customer": "1"
            },
            "entityType": "enterprise"
          },
          {
            "is_hnjt": false,
            "id": "202",
            "label": "enterprise",
            "properties": {
              "name": "企业2",
              "uid": "4A3DE15135ED2573114D99A2CC718F04",
              "is_customer": "1"
            },
            "entityType": "enterprise"
          },
          {
            "is_hnjt": true,
            "id": "7",
            "label": "enterprise",
            "properties": {
              "name": "行内集团企业",
              "uid": "4A3DE15135ED2573114D99A2CC718F04",
              "is_customer": "1"
            },
            "entityType": "enterprise"
          }
        ],
        "linkedEdges": [
          {
            "relationType": "invest",
            "label": "投资10%",
            "id": "1->101",
            "target": "101",
            "source": "1",
            "properties": {
              "_edge_multi": "SIMPLE",
              "ratio": 10,
              "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-z201",
              "_rule_uuid": [
                "202011241601283621c1506142e884cf"
              ]
            }
          },
          {
            "relationType": "invest",
            "label": "投资80%",
            "id": "101->202",
            "target": "202",
            "source": "101",
            "properties": {
              "_edge_multi": "SIMPLE",
              "ratio": 80,
              "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-z202",
              "_rule_uuid": [
                "202011241601283621c1506142e884cf"
              ]
            }
          },
          {
            "relationType": "invest",
            "label": "投资50%",
            "id": "202->7",
            "target": "7",
            "source": "202",
            "properties": {
              "_edge_multi": "SIMPLE",
              "ratio": 50,
              "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-z202",
              "_rule_uuid": [
                "202011241601283621c1506142e884cf"
              ]
            }
          }
        ],
        "target": "7",
        "isIndirect": true,
        "label": "间接持股12%",
        "style": {
          "lineDash": [
            10,
            5
          ],
          "endArrow": true,
          "cursor": "pointer"
        },
        "linkedEdgesArray": [
          [
            {
              "relationType": "invest",
              "label": "投资10%",
              "id": "1->101",
              "target": "101",
              "source": "1",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 10,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-z201",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            },
            {
              "relationType": "invest",
              "label": "投资80%",
              "id": "101->202",
              "target": "202",
              "source": "101",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 80,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-z202",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            },
            {
              "relationType": "invest",
              "label": "投资50%",
              "id": "202->7",
              "target": "7",
              "source": "202",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 50,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-z202",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            }
          ],
          [
            {
              "relationType": "invest",
              "label": "投资10%",
              "id": "1->101",
              "target": "101",
              "source": "1",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 10,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-w201",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            },
            {
              "relationType": "invest",
              "label": "投资80%",
              "id": "101->7",
              "target": "7",
              "source": "101",
              "properties": {
                "_edge_multi": "SIMPLE",
                "ratio": 80,
                "edge_uid": "05d35d2dcdc202063a1aca4e4869e0210-w202",
                "_rule_uuid": [
                  "202011241601283621c1506142e884cf"
                ]
              }
            }
          ]
        ],
        "linkedNodesArray": [
          [
            {
              "id": "1",
              "is_hnjt": true,
              "label": "enterprise",
              "properties": {
                "name": "中银消费金融有限公司",
                "uid": "55525074ACFE2A73D56C75DFF1999F3D-x1"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": false,
              "id": "101",
              "label": "enterprise",
              "properties": {
                "name": "中证信用有限公司",
                "uid": "55525074ACFE2A73D56C75DFF1999F3D-x2",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": false,
              "id": "202",
              "label": "enterprise",
              "properties": {
                "name": "企业2",
                "uid": "4A3DE15135ED2573114D99A2CC718F04",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": true,
              "id": "7",
              "label": "enterprise",
              "properties": {
                "name": "行内集团企业",
                "uid": "4A3DE15135ED2573114D99A2CC718F04",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            }
          ],
          [
            {
              "id": "1",
              "is_hnjt": true,
              "label": "enterprise",
              "properties": {
                "name": "中银消费金融有限公司",
                "uid": "55525074ACFE2A73D56C75DFF1999F3D-x1"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": false,
              "id": "101",
              "label": "enterprise",
              "properties": {
                "name": "中证信用有限公司",
                "uid": "55525074ACFE2A73D56C75DFF1999F3D-x2",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            },
            {
              "is_hnjt": true,
              "id": "7",
              "label": "enterprise",
              "properties": {
                "name": "行内集团企业",
                "uid": "4A3DE15135ED2573114D99A2CC718F04",
                "is_customer": "1"
              },
              "entityType": "enterprise"
            }
          ]
        ]
      }
    ]
  };
export const dataMap = {
    case1,
    case2,
    data1,
    data2,
    data20,
    formatData
};