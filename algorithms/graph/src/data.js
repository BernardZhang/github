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
            label: '80%',
            value: 80,
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
            label: '80%',
            value: 80,
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
            label: '80%',
            value: 80,
            labelType: 'invest'
        },
        {
            id: 'e4-node3',
            source: '4',
            target: 'node3',
            label: '80%',
            value: 80,
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

export const dataMap = {
    data1,
    case1
};