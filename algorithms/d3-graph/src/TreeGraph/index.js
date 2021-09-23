import React from 'react';
import Node from './Node';
import Edge from './Edge';
import { dagreLayout, dagreLayoutRecursive } from './layout';
import './index.less';


export default props => {
    const { data } = props;
    // const { hideEdges = [] } = data;
    // const { nodes, edges } = dagreLayout({
    //     nodes: data.nodes.map(node => ({
    //         ...node,
    //         size: '120*60',
    //         width: 120,
    //         height: 60
    //     })),
    //     edges: data.edges
    // }, { canvasHeight: window.innerHeight, canvasWidth: window.innerWidth });
    // const nodesMap = nodes.reduce((acc, cur) => {
    //     acc[cur.id] = cur;
    //     return acc;
    // }, {});

    const { nodes, edges, hideEdges, undirectedEdges } = dagreLayoutRecursive(data, { canvasHeight: window.innerHeight, canvasWidth: window.innerWidth });
    const nodesMap = nodes.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
    }, {}); 
    // console.log('after layout...', nodes, edges, hideEdges);
    console.log('undirectedEdges...', undirectedEdges);

    return (
        <svg
            className="tree-graph"
            textRendering="geometricPrecision"
        >
            <defs>
                <marker id="triangle" markerUnits="strokeWidth" fill="#C9D2DD" markerWidth="30" markerHeight="30" refX="0" refY="4" orient="auto">
                    <path d="M0,0 L0,8 L8,4 L0,0" />
                </marker>
                <marker id="top-edge-triangle" markerUnits="strokeWidth" fill="#C9D2DD" markerWidth="30" markerHeight="30" refX="30" refY="4" orient="auto">
                    <path d="M0,0 L0,8 L8,4 L0,0" />
                </marker>
                <marker id="triangle2" viewBox="0 0 10 10"
                    refX="1" refY="5"
                    markerUnits="strokeWidth"
                    markerWidth="10" markerHeight="10"
                    orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#f00"/>
                </marker>
            </defs>
            <g>
                <g className="nodes">
                    {
                        nodes?.map(node => (
                            <Node
                                key={node.id}
                                node={node}
                            />
                        ))
                    }
                </g>
                <g className="edges">
                    {
                        edges.map(edge => (
                            <Edge
                                key={edge.id}
                                edge={{
                                    ...edge,
                                    source: nodesMap[edge.source],
                                    target: nodesMap[edge.target]
                                }}
                            />
                        ))
                    }
                    {
                        hideEdges.filter(({ source, target }) => nodesMap[source] && nodesMap[target]).map(edge => (
                            <Edge
                                className="hide-edge"
                                key={edge.id}
                                stroke="rgba(255,0,0,.2)"
                                edge={{
                                    ...edge,
                                    source: nodesMap[edge.source],
                                    target: nodesMap[edge.target]
                                }}
                                getPath={(source, target) => {
                                    return `M${source.x + source.width / 2},${source.y + source.height / 2}L${target.x + target.width / 2},${target.y + target.height / 2}`;
                                }}
                                style={{
                                    markerEnd: `url(#triangle2)`
                                }}
                            />
                        ))
                    }
                    {
                        undirectedEdges?.map(edge => (
                            <Edge
                                className="undirected-edge"
                                key={edge.id}
                                stroke="rgba(0,255,0,.2)"
                                edge={{
                                    ...edge,
                                    source: nodesMap[edge.source],
                                    target: nodesMap[edge.target]
                                }}
                                getPath={(source, target) => {
                                    return `M${source.x + source.width / 2},${source.y + source.height / 2}L${target.x + target.width / 2},${target.y + target.height / 2}`;
                                }}
                                style={{
                                    markerEnd: `url(#triangle2)`
                                }}
                            />
                        ))
                    }
                </g>
            </g>
        </svg>
    );
};
