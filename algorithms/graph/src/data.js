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


export const dataMap = {
    case1,
    case2,
    data1,
    data2,
    data20
};