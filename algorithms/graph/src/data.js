export default {
    nodes: [
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
            isInnerGroup: false
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
    ].map(item => {
        // item.type = 'rect';
        if (item.isInnerGroup === false || item.labelType === 'person') {
            item.style = {
                fill: '#fff',
                stroke: 'gray'
            };
        }
        return item;
    }),
    edges: [
        {
            id: 'e1',
            source: '1',
            target: '2',
            label: '投资90%',
            value: 90,
            labelType: 'invest'
        },
        {
            id: 'e2',
            source: '2',
            target: '3',
            label: '投资',
            value: 100,
            labelType: 'invest'
        },
        {
            id: 'e3',
            source: '2',
            target: '5',
            label: '投资',
            value: 100,
            labelType: 'invest'
        },
        {
            id: 'e4',
            source: '2',
            target: '6',
            label: '投资',
            value: 100,
            labelType: 'invest'
        },
        {
            id: 'e5',
            source: '2',
            target: '10',
            label: '投资',
            value: 100,
            labelType: 'invest'
        },
        {
            id: 'e6',
            source: '3',
            target: '4',
            label: '投资',
            value: 28,
            labelType: 'invest'
        },
        {
            id: 'e7',
            source: '10',
            target: '4',
            label: '投资',
            value: 26,
            labelType: 'invest'
        },
        {
            id: 'e8',
            source: '5',
            target: '4',
            label: '投资',
            value: 20,
            labelType: 'invest'
        },
        {
            id: 'e9',
            source: '4',
            target: '9',
            label: '投资',
            value: 30,
            labelType: 'invest'
        },
        {
            id: 'e10',
            source: '9',
            target: '2',
            label: '投资',
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
        }
    ]
};
