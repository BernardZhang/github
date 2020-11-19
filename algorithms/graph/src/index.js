import G6 from '@antv/g6';
import { get, reduce, sumBy, minBy, maxBy, cloneDeep } from 'lodash';
import { parse } from 'query-string';
import { getControlPoint, adaptationNodes, fixedNum } from './utils';
import './node';
import './edge';
import data, { dataMap } from './data';
import './index.css';

const queryInfo = parse(window.location.search);

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
    const generateEdgeId = (inEdge, outEdge) => {
        let targetId = outEdge.target;

        if (outEdge.linkedEdges) {
            // targetId = outEdge.linkedEdges.map(({ source, target }) => `${source}->${target}`).join('_');
            targetId = outEdge.linkedEdges.reduce(
                (acc, { target }, index) => {
                    acc += index === 0 ? '' : '->';
                    acc += target;
                    return acc;
                },
                ''
            );
        }

        return `e${inEdge.source}->${inEdge.target}->${targetId}`;
    };
    const getLinkedOutEdges = outEdges => {
        const newOutEdges = [];
        // 目标节点为非行内集团企业的边，需要进一步连接起来，直到目标节点为行内集团企业
        const needLinkedEdges = outEdges.filter(
            ({ target }) => removeNodeIds.includes(target)
        );
        const generateLinkedEdges = inEdge => {
            const nextOutEdges = edges.filter(({ source }) => source === inEdge.target);

            nextOutEdges.forEach(nextOutEdge => {
                const value = fixedNum((inEdge.value * nextOutEdge.value) / 100);
                const linkedEdge = {
                    id: generateEdgeId(inEdge, nextOutEdge),
                    source: inEdge.source,
                    target: nextOutEdge.target,
                    value,
                    label: `${value}%`,
                    linkedEdges: [
                        ...(inEdge.linkedEdges || [inEdge]),
                        nextOutEdge
                    ]
                };

                // 如果下一个节点是非行内集团企业则继续连接边
                if (removeNodeIds.includes(nextOutEdge.target)) {
                    generateLinkedEdges(linkedEdge);
                } else {
                    newOutEdges.push(linkedEdge);
                }
            });
        };

        needLinkedEdges.forEach(inEdge => {
            generateLinkedEdges(inEdge);
        });

        return newOutEdges;
    };

    const newEdges = [];
    const newNodes = nodes.filter(({ id }) => !removeNodeIds.includes(id));
    const newNodesMap = newNodes.reduce((acc, { id }) => {
        acc[id] = true;
        return acc;
    }, {});

    removeNodeIds.forEach(id => {
        const { inEdges, outEdges } = relatedEdgesMap[id];
        const finalOutEdges = [
            ...outEdges.filter(({ target }) => !removeNodeIds.includes(target)),
            ...getLinkedOutEdges(outEdges)
        ];
        // const finalInEdges = [
        //     ...inEdges.filter(({ target }) => !removeNodeIds.includes(target)),
        //     ...getLinkedOutEdges(outEdges)
        // ];

        inEdges.forEach(inEdge => {
            finalOutEdges.forEach(outEdge => {
                const value = fixedNum((inEdge.value * outEdge.value) / 100);

                newEdges.push({
                    id: generateEdgeId(inEdge, outEdge),
                    source: inEdge.source,
                    target: outEdge.target,
                    value,
                    label: `${value}%`,
                    linkedEdges: [
                        inEdge,
                        outEdge
                    ],
                    style: {
                        lineDash: [10, 5],
                        endArrow: true
                    },
                    labelCfg: {
                        autoRotate: true
                    }
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
            ...mergeLinkedEdges(newEdges)
        ]
    };
};

/**
 * 合并边，起点与终点相同的边合并成一条边，value取和，并且需要记录合并的原始边信息
 * @param {Array} linkedEdges
 * [
 *     { id: '1', source: '1', target: '2', value: 1 },
 *     { id: '2', source: '1', target: '2', value: 2 },
 *     { id: '3', source: '1', target: '2', value: 3 },
 *     { id: '4', source: '1', target: '3', value: 2 },
 *     { id: '5', source: '1', target: '3', value: 2 },
 *     { id: '6', source: '1', target: '4', value: 2 }
 * ]
 * 合并后 =>
 * [
 *     { source: '1', target: '2', value: 4, linkedEdgesArray: [Edge1, Edge2, Edge3] },
 *     { source: '1', target: '3', value: 4, linkedEdgesArray: [Edge4, Edge5] },
 *     { source: '1', target: '4', value: 2, linkedEdgesArray: [Edge6] }
 * ]
 * 
 * @return {Array} 合并后的边
 */
const mergeLinkedEdges = linkedEdges => reduce(
    linkedEdges.reduce((sameNodesEdgesMap, linkedEdge) => {
        const { source, target } = linkedEdge;
        const key = `${source}-${target}`;

        sameNodesEdgesMap[key] = sameNodesEdgesMap[key] || [];
        sameNodesEdgesMap[key].push(linkedEdge);
        return sameNodesEdgesMap;
    }, {}),
    (acc, mergeEdges) => {
        const value = fixedNum(sumBy(mergeEdges, 'value'));

        acc = [
            ...acc,
            {
                ...mergeEdges[0],
                value,
                label: `${value}%`,
                linkedEdgesArray: mergeEdges.reduce((acc, cur) => {
                    acc.push(cur.linkedEdges);
                    return acc;
                }, [])
            }
        ];
        return acc;
    },
    []
);

// 共高管、共股东
const removePersonNodes = data => {
    const { nodes, edges } = data;
    const personNodeIds = nodes.filter(
        ({ labelType }) => labelType === 'person'
    ).map(({ id }) => id);
    const outEdgesMap = edges.reduce((acc, edge) => {
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

    for (const personNodeId in outEdgesMap) {
        const outEdges = outEdgesMap[personNodeId];

        removeEdgeIds = [
            ...removeEdgeIds,
            ...outEdges.map(({ id }) => id)
        ];

        for (let i = 0; i < outEdges.length - 1; i++) {
            const currentEdge = outEdges[0];

            for (let j = i + 1; j < outEdges.length; j++) {
                const source = currentEdge.target;
                const target = outEdges[j].target;
                const getRelationLabel = (edge1, edge2) => {
                    if (edge1.labelType === edge2.labelType) {
                        return edge1.labelType === 'invest' ? '共股东' : '共核心高管';
                    }

                    return '共股东兼核心高管';
                };

                newEdges.push({
                    id: `ep${source}-${target}`,
                    source,
                    target,
                    label: getRelationLabel(currentEdge, outEdges[j]),
                    sourceEdges: [currentEdge, outEdges[j]],
                    connectNode: nodes.find(({ id }) => id === personNodeId)
                });
            }
        }
    }

    return {
        nodes: newNodes,
        edges: [
            ...edges,
            ...newEdges
        ].filter(
            ({ id, source, target }) => (!removeEdgeIds.includes(id) && newNodesMap[source] && newNodesMap[target])
        )
    };
};

// 两点之间有多条边时，使用弧线type: arc
const updateEdgesType = data => {
    const sameNodesEdgesMap = data.edges.reduce((acc, edge) => {
        const { source, target } = edge;
        const key = `${source}-${target}`;
        const reverseKey = `${target}-${source}`;

        if (!acc[key] && !acc[reverseKey]) {
            acc[key] = [];
        }

        if (acc[key]) {
            acc[key].push(edge);
        } else {
            acc[reverseKey].push(edge);
        }

        return acc;
    }, {});
    const sameEdgesTypeMap = reduce(sameNodesEdgesMap, (acc, edges) => {
        if (edges.length > 2) {
            const groupEdgesByDirection = edges.reduce((acc, edge) => {
                const { source, target } = edge;
                const key = `${source}-${target}`;

                acc[key] = acc[key] || [];
                acc[key].push(edge);

                return acc;
            }, {});

            reduce(groupEdgesByDirection, (acc, groupEdges) => {
                if (groupEdges.length === 1) {
                    acc[groupEdges[0].id] = {
                        type: 'quadratic',
                        labelCfg: {
                            autoRotate: true
                        }
                    };
                } else {
                    groupEdges.forEach(({ id }, index) => {
                        acc[id] = {
                            type: 'quadratic',
                            // curveOffset: 30 * ((index + 1) % 2 ? 1 : -1),
                            curvePosition: (index + 1) * 0.3,
                            labelCfg: {
                                autoRotate: true
                            }
                        }
                    });
                }
                return acc;
            }, acc);
        }

        return acc;
    }, {});
    const sameNodesEdgeIdsMap = reduce(sameNodesEdgesMap, (acc, cur) => {
        if (cur.length > 2) {
            (cur || []).reduce((acc, cur) => {
                acc[cur.id] = true;
                return acc;
            }, acc);
        }

        return acc;
    }, {});

    return {
        nodes: data.nodes,
        edges: data.edges.map(edge => ({
            ...edge,
            ...(sameEdgesTypeMap[edge.id] || {})
            // type: sameNodesEdgeIdsMap[edge.id] ? 'quadratic' : 'polyline'
        }))
    };
};

const graph = new G6.Graph({
    container: 'container',
    renderer: 'svg',
    animate: true,
    animateCfg: {
        duration: 500, // Number，一次动画的时长
        easing: 'linearEasing', // String，动画函数
    },
    layout: {
        type: 'dagre',
        minZoom: 0.2,
        maxZoom: 5,
        
        // nodesepFunc: (d) => {
        //     if (d.id === '3') {
        //         return 50;
        //     }
        //     return 20;
        // },
        nodesep: 30,
        ranksep: 30,
        controlPoints: true,
    },
    modes: {
        default: [
            'drag-canvas',
            'zoom-canvas',
            'drag-node',
            {
                type: 'tooltip',
                formatText(model) {
                    return model.label;
                },
                offset: 10,
            },
        ],
    },
    fitView: true,
    fitCenter: true,
    fitViewPadding: 20,
    //   linkCenter: true,
    autoPaint: true,
    width: window.innerWidth,
    height: window.innerHeight,
    defaultNode: {
        size: 60,
        type: 'enterprise',
        style: {
            lineWidth: 2,
            stroke: '#5B8FF9',
            fill: '#C6E5FF',
        },
    },
    defaultEdge: {
        //   type: 'flow-line',
        type: 'polyline',
        // type: 'line',
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
            stroke: '#C2C8D5'
        }
    }
});


window.graph = graph;

graph.on('beforerender', () => {
    console.log('beforerender...', graph.getNodes());
});

graph.on('afterrender', () => {
    console.log('afterrender...', graph.getNodes());
});

const generateGraphData = data => {
    let result = data;
    console.log('generateGraphData...', data);

    if (/format/.test(location.search)) {
        result = removeEnterpriseNodes(data);
        console.log('removeEnterpriseNodes...', result);
    }

    if (/format=1/.test(location.search)) {
        result = removePersonNodes(result);
        console.log('removePersonNodes...', result);
    }

    result = updateEdgesType(result);

    return result;
};

const originalData = dataMap[queryInfo.data] || data; // data1;

const updateGraph = type => {
    let data = cloneDeep(originalData);

    switch (type) {
        case 'original':
            break;
        case 'displayGraph':
            data = removeEnterpriseNodes(data);
            data = removePersonNodes(data);
            break;
        case 'invest':
            data = removeEnterpriseNodes(data);
            break;
        case 'person':
            data = removePersonNodes(data);
            break;
    }

    graph.data(data);
    graph.render();
};

graph.data(generateGraphData(cloneDeep(originalData)));
graph.render();

document.getElementById('original').addEventListener('click', evt => {
    updateGraph(evt.target.getAttribute('id'));
});

document.getElementById('displayGraph').addEventListener('click', evt => {
    updateGraph(evt.target.getAttribute('id'));
});

document.getElementById('invest').addEventListener('click', evt => {
    updateGraph(evt.target.getAttribute('id'));
});

document.getElementById('person').addEventListener('click', evt => {
    updateGraph(evt.target.getAttribute('id'));
});
