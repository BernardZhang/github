import React from 'react';

export default ({
    node,
    children
}) => (
    <g
        key={node.id}
        fill="#fff"
        className="tree-graph-node"
        transform={`translate(${node.x}, ${node.y})`}
    >
        <rect
            rx="2"
            ry="2"
            stroke="#5E7092"
            width={node.width}
            height={node.height}
        />
        <foreignObject
            className="node-text"
            width={node.width}
            height={node.height}
        >
            <span>{node.label}</span>
            {
                node.hideEdges?.length > 0 && (
                    <label>{node.hideEdges.length}</label>
                )
            }
        </foreignObject>
        {children}
    </g>
);