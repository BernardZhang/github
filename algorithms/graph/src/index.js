import G6 from '@antv/g6';

const data = {
    nodes: [
        {
            id: '1',
            type: 'enterprise',
            label: '国资委',
            isInnerGroup: false
        },
        {
            id: '2',
            label: '中信集团有限公司',
            type: 'enterprise'
        },
        {
            id: '3',
            label: '中信证券有限公司',
            type: 'enterprise'
        },
        {
            id: '4',
            label: '中信投资有限公司',
            type: 'enterprise'
        },
        {
            id: '5',
            label: '忠诚商贸有限公司',
            type: 'enterprise'
        },
        {
            id: '6',
            label: '中银消费金融有限公司',
            type: 'enterprise'
        },
        {
            id: '7',
            label: '中原消费金融有限公司',
            type: 'enterprise'
        },
        {
            id: '8',
            label: '马上消费金融有限公司',
            type: 'enterprise'
        },
        {
            id: '9',
            label: '中证信用有限公司',
            type: 'enterprise',
            isInnerGroup: false
        },
        {
            id: '10',
            label: '中信信托有限公司',
            type: 'enterprise',
            isInnerGroup: false
        },
        {
            id: '11',
            label: '徐天堂',
            type: 'person'
        },
        {
            id: '12',
            label: '周柏豪',
            type: 'person'
        }
    ].map(item => {
        // item.type = 'rect';
        if (item.isInnerGroup === false || item.type === 'person') {
            item.style = {
                fill: '#fff'
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
            type: 'invest'
        },
        {
            id: 'e2',
            source: '2',
            target: '3',
            label: '投资',
            value: 100,
            type: 'invest'
        },
        {
            id: 'e3',
            source: '2',
            target: '5',
            label: '投资',
            value: 100,
            type: 'invest'
        },
        {
            id: 'e4',
            source: '2',
            target: '6',
            label: '投资',
            value: 100,
            type: 'invest'
        },
        {
            id: 'e5',
            source: '2',
            target: '10',
            label: '投资',
            value: 100,
            type: 'invest'
        },
        {
            id: 'e6',
            source: '3',
            target: '4',
            label: '投资',
            value: 28,
            type: 'invest'
        },
        {
            id: 'e7',
            source: '10',
            target: '4',
            label: '投资',
            value: 26,
            type: 'invest'
        },
        {
            id: 'e8',
            source: '5',
            target: '4',
            label: '投资',
            value: 20,
            type: 'invest'
        },
        {
            id: 'e9',
            source: '4',
            target: '9',
            label: '投资',
            value: 30,
            type: 'invest'
        },
        {
            id: 'e10',
            source: '9',
            target: '2',
            label: '投资',
            value: 10,
            type: 'invest'
        },
        {
            id: 'e11',
            source: '11',
            target: '2',
            label: '法人代表',
            type: 'position'
        },
        {
            id: 'e12',
            source: '11',
            target: '6',
            label: '董事长',
            type: 'position'
        },
        {
            id: 'e13',
            source: '12',
            target: '6',
            label: '60%',
            value: 60,
            type: 'invest'
        },
        {
            id: 'e14',
            source: '12',
            target: '7',
            label: '70%',
            value: 70,
            type: 'invest'
        },
        {
            id: 'e15',
            source: '12',
            target: '8',
            label: '总经理',
            type: 'position'
        }
    ]
};

// 移除isInnerGroup===false的节点，并更新对应关系
// A -> b -> C 移除b点并更新边：A -> C

const removeEnterpriseNodes = data => {
    const { nodes, edges } = data;
    const removeNodes = nodes.filter(node => node.isInnerGroup === false);
    const removeNodeIds = removeNodes.map(({ id }) => id);
    const relatedEdges = edges.filter(edge => {
        if (removeNodeIds.includes(edge.source) || removeNodeIds.includes(edge.target)) {
            return true;
        }

        return false;
    });
    const relatedEdgesMap = removeNodeIds.reduce((acc, id) => {
        acc[id] = {
            inEdges: relatedEdges.filter(({ target }) => target === id),
            outEdges: relatedEdges.filter(({ source }) => source === id)
        };
        return acc;
    }, {});

    const newEdges = [];
    const newNodes = nodes.filter(({ id }) => !removeNodeIds.includes(id));
    const newNodesMap = newNodes.reduce((acc, { id }) => {
        acc[id] = true;
        return acc;
    }, {});

    removeNodeIds.forEach(id => {
        const { inEdges, outEdges } = relatedEdgesMap[id];

        inEdges.forEach(inEdge => {
            outEdges.forEach(outEdge => {
                const value = (inEdge.value * outEdge.value) / 100;
                newEdges.push({
                    id: `e${inEdge.source}-${outEdge.target}`,
                    source: inEdge.source,
                    target: outEdge.target,
                    value,
                    label: `间接持股${value}%`,
                    originalEdges: [
                        inEdge,
                        outEdge
                    ]
                });
            });
        });
    });

    return {
        nodes: newNodes,
        edges: [
            ...data.edges.filter(
                ({ id, source, target }) => (relatedEdges.find(edge => edge.id !== id) && newNodesMap[source] && newNodesMap[target])
            ),
            ...newEdges
        ]
    };
};

const removePersonNodes = data => {
    const { nodes, edges } = data;
    const personNodeIds = nodes.filter(({ type }) => type === 'person').map(({ id }) => id);
    const relatedEdgesMap = edges.reduce((acc, edge) => {
        if (personNodeIds.includes(edge.source)) {
            acc[edge.source] = acc[edge.source] || [];
            acc[edge.source].push(edge);
        }
        
        return acc;
    }, {});
    const newEdges = [];
    const newNodes = nodes.filter(({ id }) => !personNodeIds.includes(id));
    const newNodesMap = newNodes.reduce((acc, { id }) => {
        acc[id] = true;
        return acc;
    }, {});
    let removeEdgeIds = []; 

    for (const personNodeId in relatedEdgesMap) {
        const relatedEdges = relatedEdgesMap[personNodeId];

        removeEdgeIds = [
            ...removeEdgeIds,
            ...relatedEdges.map(({ id }) => id)
        ];

        for (let i = 0; i < relatedEdges.length - 1; i++) {
            const currentEdge = relatedEdges[0];

            for (let j = i + 1; j < relatedEdges.length - 1; j++) {
                const source = currentEdge.target;
                const target = relatedEdges[j].target;
                const getRelationLabel = (edge1, edge2) => {
                    if (edge1.type === edge2.type) {
                        return edge1.type === 'invest' ? '共股东' : '共核心高管';
                    }

                    return '共股东兼核心高管';
                };

                newEdges.push({
                    id: `e${source}-${target}`,
                    source,
                    target,
                    label: getRelationLabel(currentEdge, relatedEdges[j]),
                    sourceEdges: [currentEdge, relatedEdges[j]],
                    connectNode: nodes.find(({ id }) => id === personNodeId)
                });
            }
        }
    }

    return {
        nodes: newNodes,
        edges: edges.filter(
            ({ id, source, target }) => (!removeEdgeIds.includes(id)  && newNodesMap[source] && newNodesMap[target])
        )
    };
};

const graph = new G6.Graph({
  container: "container",
  renderer: 'svg',
  layout: {
    // type: 'force',
    // padding: [160]
    type: 'fruchterman',
    // center: [200, 200], // The center of the graph by default
    // gravity: 20,
    // speed: 2,
    // clustering: true,
    // clusterGravity: 30,
    // maxIteration: 2000,
    // workerEnabled: true, // Whether to activate web-worker
  },
  layout: {
    type: 'dagre',
    nodesepFunc: (d) => {
        if (d.id === '3') {
        return 50;
        }
        return 20;
    },
    ranksep: 40,
    controlPoints: true,
  },
  width: window.innerWidth,
  height: window.innerHeight,
  defaultNode: {
    size: 50,
    // type: 'rect',
    style: {
      lineWidth: 2,
      stroke: '#5B8FF9',
      fill: '#C6E5FF',
    },
  },
  defaultEdge: {
    type: 'polyline',
    // type: 'cubic',
    // type: 'quadratic',
    // type: 'arc',
    // type: 'cubic-vertical',
    // type: 'cubic-horizontal',
    style: {
      radius: 20,
      offset: 45,
      endArrow: true,
      lineWidth: 1,
      stroke: '#C2C8D5',
    },
  },
//   defaultEdge: {
//     size: 1,
//     color: '#e2e2e2',
//     style: {
//       endArrow: {
//         path: 'M 0,0 L 8,4 L 8,-4 Z',
//         fill: '#e2e2e2',
//       },
//     },
//   },
});

let generateGraphData = data => {
    let result = removeEnterpriseNodes(data);

    console.log('removeEnterpriseNodes...', result);

    result = removePersonNodes(result);
    console.log('removePersonNodes...', result);
    return result;
};

graph.data(generateGraphData(data));
graph.render();
