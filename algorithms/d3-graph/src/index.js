import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { uniqBy, get } from 'lodash';
import TreeGraph from './TreeGraph';
import { dataMap } from './data';
import './index.less';

const generateTreeGraph = (data, rootNodeId) => {
    const { nodes } = data;
    const { edges, undirectedEdges } = data.edges.reduce((acc, cur) => {
        acc[cur.type === 'relatives' ? 'undirectedEdges' : 'edges'].push(cur);
        return acc;
    }, { edges: [], undirectedEdges: [] });
    const nodesMap = nodes.reduce((acc, node) => {
        acc[node.id] = node;
        return acc;
    }, {});
    
    const rootNode = nodes.find(({ id }) => id === rootNodeId) || nodes[0];
    const nodesLevelMap = {
        [rootNode.id]: 1
    };

    let visibleNodes = [rootNode];
    let visibleEdges = [];
    const hideEdges = [];

    const getLinkedEdges = (node, edges) => edges.reduce((acc, edge) => {
        if (edge.source === node.id) {
            acc.outEdges.push(edge);
        }
        if (edge.target === node.id) {
            acc.inEdges.push(edge);
        }
        return acc;
    }, { inEdges: [], outEdges: [] });

    const nodeEdgesMap = nodes?.reduce((acc, node) => {
        acc[node.id] = getLinkedEdges(node, edges);
        return acc;
    }, {});

    const buildNextEdges = nodes => {
        const nextEdges = [];
        const nextNodes = [];

        for (let i = 0; i < [...nodes, ...nextNodes].length; i++) {
            const node = [...nodes, ...nextNodes][i];
            const { outEdges } = nodeEdgesMap[node.id];

            outEdges.forEach(edge => {
                const { target } = edge;
                const level = nodesLevelMap[node.id] + 1;

                // 未访问过
                if (!nodesLevelMap[target]) {
                    nodesLevelMap[target] = level;
                    nextNodes.push(nodesMap[target]);
                    nextEdges.push(edge);
                } else { // 访问过
                    // 层级有改变则该条边隐藏
                    if (level !== nodesLevelMap[target]) {
                        hideEdges.push(edge);
                    } else { // 层级无变化则该条边显示（参与图布局）
                        nextEdges.push(edge);
                    }
                }
            });
        }

        return { nextEdges, nextNodes };
    };

    const { nextEdges, nextNodes } = buildNextEdges([rootNode]);

    visibleNodes = [...visibleNodes, ...nextNodes];
    visibleEdges = [...visibleEdges, ...nextEdges];

    const visibleNodesMap = visibleNodes.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
    }, {});

    const buildPreEdges = nodes => {
        const preNodes = [];
        const preEdges = [];

        for (let i = 0; i < [...nodes, ...preNodes].length; i++) {
            const node = [...nodes, ...preNodes][i];
            const { inEdges } = nodeEdgesMap[node.id];
            const level = nodesLevelMap[node.id] - 1;

            inEdges.forEach(edge => {
                if (!visibleNodesMap[edge.source]) {
                    preNodes.push(nodesMap[edge.source]);
                    preEdges.push(edge);
                    visibleNodesMap[edge.source] = nodesMap[edge.source];
                    nodesLevelMap[edge.source] = level;
                } else {
                    if (level !== nodesLevelMap[edge.source]) {
                        hideEdges.push(edge);
                    } else {
                        preEdges.push(edge);
                    }
                }
            });
        }

        return { preNodes, preEdges };
    };

    const { preNodes: preVisibleNodes, preEdges: preVisibleEdges } = buildPreEdges(visibleNodes);

    visibleNodes = uniqBy([...visibleNodes, ...preVisibleNodes], 'id');
    visibleEdges = uniqBy([...visibleEdges, ...preVisibleEdges], 'id');
    console.log('hideEdges...', hideEdges);

    const visibleEdgesMap = visibleEdges.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
    }, {});

    Object.assign(visibleNodesMap, preVisibleNodes.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
    }, {}));

    const hideEdgesMap = {};
    const nodeHideEdgesMap = hideEdges.reduce((acc, cur) => {
        const { source, target } = cur;
        acc[source] = acc[source] || [];
        acc[target] = acc[target] || [];
        acc[source].push(cur);
        acc[target].push(cur);
        hideEdgesMap[cur.id] = cur;
        return acc;
    }, {});

    // 将孤立的点再则按照上面的逻辑形成一个子图
    const subGraph = {
        nodes: nodes.filter(({ id }) => !visibleNodesMap[id]),
        edges: edges.filter(({ id }) => (!visibleEdgesMap[id] && !hideEdgesMap[id]))
    };

    const graphData = {
        nodes: visibleNodes.map(node => ({
            ...node,
            hideEdges: nodeHideEdgesMap[node.id] || []
        })),
        edges: visibleEdges,
        hideEdges,
        undirectedEdges
    };

    if (subGraph.nodes.length) {
        graphData.subGraph = generateTreeGraph(subGraph, subGraph.nodes.find(({ type }) => type === 'person') || subGraph.nodes[0])
    }

    return graphData;
};

const data = dataMap[get(location.search.match(/data=(.+)/), '1', 'data')]; 

const TreeGraphDemo = () => {
    const [graphData, setGraphData] = useState(data);

    const update = evt => {
        const id = evt.target.id;
        let graphData = data;

        switch (id) {
            case 'treeGraph':
                graphData = generateTreeGraph(data, 'p1');
                break;
        }

        console.log('graphData...', graphData);

        setGraphData(graphData);
    };

    return (
        <div className="tree-graph-demo">
            <TreeGraph
                data={graphData}
            />
            <div class="toolbar">
                <button id="original" onClick={update}>原始数据</button>
                <button id="treeGraph" onClick={update}>TreeGraph(剪枝)</button>
            </div>
        </div>
    )
};

ReactDOM.render(
    <TreeGraphDemo />,
    document.getElementById('root')
);
