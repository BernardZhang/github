import React, { useRef, useEffect } from 'react';
import { select, event } from 'd3-selection';
// import * as d3Selection from 'd3-selection';
import { zoom } from 'd3-zoom';
import Node from './Node';
import Edge from './Edge';
import { dagreLayout, dagreLayoutRecursive } from './layout';
import './index.less';

export const getPath = ({ source, target }) => {
    const sp = {
        x: source.x + source.width / 2,
        y: source.y + (source.y === target.y ? source.height : 0)
    };
    const tp = {
        x: target.x + target.width / 2,
        y: target.y + target.height
    };
    const cp = getControlPoint(sp, tp);

    return `M${sp.x},${sp.y} Q${cp.x}, ${cp.y} ${tp.x}, ${tp.y}`
};

const getControlPoint = (sp, tp) => {
    const distance = Math.sqrt(Math.pow(sp.x - tp.x, 2) + Math.pow(sp.y - tp.y, 2)) || 1;
    const cpd = Math.abs(sp.x - tp.x) * 0.5 / distance; // 向量方向长度系数
    const v1 = [(tp.x - sp.x) / 2, (tp.y - sp.y) / 2];
    const direction = sp.x < tp.x ? 1 : -1;
    const v2 = [-v1[1] * cpd * direction, v1[0] * cpd * direction];

    // 控制点
    return {
        x: v1[0] + v2[0] + sp.x,
        y: v1[1] + v2[1] + sp.y,
    };
};

export default props => {
    const { data } = props;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const svgRef = useRef();
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

    const addZoomBehavior = dom => {
        console.log('addZoomBehavior....', dom)
        select(dom).call(
            zoom()
                .extent([[0, 0], [width, height]])
                .scaleExtent([0.2, 5])
                .on('zoom', () => {
                    select(svgRef.current.querySelector('g')).attr('transform', event.transform);
                })
        )
        // .call(tooltip);
    };

    useEffect(() => {
        addZoomBehavior(svgRef.current)
    }, [])

    return (
        <svg
            ref={svgRef}
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
                <marker
                    id="hideEdge"
                    viewBox="0 0 10 10"
                    refX="10"
                    refY="5"
                    markerUnits="strokeWidth"
                    markerWidth="8"
                    markerHeight="8"
                    orient="auto"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#C9D2DD" />
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
                        edges.map(edge => {
                            if (edge.isManual) {
                                return (
                                    <Edge
                                        key={edge.id}
                                        stroke="#126BFB"
                                        edge={{
                                            ...edge,
                                            source: nodesMap[edge.source],
                                            target: nodesMap[edge.target]
                                        }}
                                        getPath={(source, target) => {
                                            if (source.x > target.x) {
                                                return `M${source.x},${source.y + source.height / 2}L${target.x + target.width * .75},${target.y - 8}`;
                                            }

                                            return `M${source.x + source.width},${source.y + source.height / 2}L${target.x + target.width * .25},${target.y - 5}`;
                                        }}
                                    />
                                )
                            }

                            return (
                                <Edge
                                    key={edge.id}
                                    edge={{
                                        ...edge,
                                        source: nodesMap[edge.source],
                                        target: nodesMap[edge.target]
                                    }}
                                />
                            )
                        })
                    }
                    {
                        hideEdges.filter(({ source, target }) => nodesMap[source] && nodesMap[target]).map(edge => (
                            <Edge
                                className="hide-edge"
                                key={edge.id}
                                stroke="#C9D2DD"
                                strokeDasharray="5,5"
                                edge={{
                                    ...edge,
                                    source: nodesMap[edge.source],
                                    target: nodesMap[edge.target]
                                }}
                                getPath={(source, target) => getPath({ source, target })}
                                style={{
                                    markerEnd: `url(#hideEdge)`
                                }}
                            />
                        ))
                    }
                    {
                        undirectedEdges?.map(edge => (
                            <Edge
                                className="undirected-edge"
                                key={edge.id}
                                stroke="rgba(0,255,0,.6)"
                                edge={{
                                    ...edge,
                                    source: nodesMap[edge.source],
                                    target: nodesMap[edge.target]
                                }}
                                getPath={(source, target) => {
                                    return `M${source.x + source.width / 2},${source.y + source.height / 2}L${target.x + target.width / 2},${target.y + target.height / 2}`;
                                }}
                                style={{
                                    // markerEnd: `url(#triangle2)`
                                }}
                            />
                        ))
                    }
                </g>
            </g>
        </svg>
    );
};
