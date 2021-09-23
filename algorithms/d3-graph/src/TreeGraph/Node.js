import React from 'react';

export default ({
    node,
    children
}) => (
    <g
        key={node.id}
        fill="lightblue"
        transform={`translate(${node.x}, ${node.y})`}
    >
        <rect
            rx="2"
            ry="2"
            stroke="#CCD9FD"
            width={node.width}
            height={node.height}
        />
        <foreignObject
            className="node-text"
            width={node.width}
            height={node.height}
        >
            <span>{node.label}</span>
        </foreignObject>
        {children}
    </g>
);