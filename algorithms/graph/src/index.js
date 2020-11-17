import G6 from '@antv/g6';
import { reduce } from 'lodash';
import './node';
import './edge';
import data, { data1 } from './data';
import './index.css';

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
    let newOutEdges = [];
    const getLinkedOutEdges = outEdges => {
        // 目标节点为非行内集团企业的边，需要进一步连接起来，直到目标节点为行内集团企业
        const needLinkedEdges = outEdges.filter(
            ({ target }) => removeNodeIds.includes(target)
        );
        const generateLinkedEdges = inEdge => {
            const nextOutEdges = edges.filter(({ source }) => source === inEdge.target);

            nextOutEdges.forEach(nextOutEdge => {
                const value = (inEdge.value * nextOutEdge.value) / 100;
                const linkedEdge = {
                    id: `e${inEdge.source}-${nextOutEdge.target}`,
                    source: inEdge.source,
                    target: nextOutEdge.target,
                    value,
                    label: `${value}%`,
                    linkedEdges: [
                        ...(inEdge.linkedEdges || []),
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

        inEdges.forEach(inEdge => {
            finalOutEdges.forEach(outEdge => {
                const value = (inEdge.value * outEdge.value) / 100;
                const generateEdgeId = (inEdge, outEdge) => {
                    let targetId = outEdge.target;

                    if (outEdge.linkedEdges) {
                        targetId = outEdge.linkedEdges.map(({ source, target }) => `${source}->${target}`).join('_');
                    }

                    return `e${inEdge.source}-${targetId}`;
                };
                newEdges.push({
                    id: generateEdgeId(inEdge, outEdge),
                    source: inEdge.source,
                    target: outEdge.target,
                    value,
                    label: `${value}%`,
                    originalEdges: [
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
            ...newEdges
        ]
    };
};

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
                    id: `e${source}-${target}`,
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
            ({ id, source, target }) => (!removeEdgeIds.includes(id)  && newNodesMap[source] && newNodesMap[target])
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
            type: sameNodesEdgeIdsMap[edge.id] ? 'arc' : 'polyline'
        }))
    };
};


const graph = new G6.Graph({
  container: "container",
  renderer: 'svg',
  layout: {
    type: 'dagre',
    nodesepFunc: (d) => {
        if (d.id === '3') {
            return 50;
        }
        return 20;
    },
    ranksep: 20,
    controlPoints: true,
  },
  width: window.innerWidth,
  height: window.innerHeight,
  defaultNode: {
    size: 50,
    type: 'enterprise',
    // type: 'icon-node',
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

const generateGraphData = data => {
    let result = data;

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

const originalData = data1;

graph.data(generateGraphData(originalData));
graph.render();
