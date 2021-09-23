import React from 'react';

const getPath = (source, target, ranksep = 40) => {
    const startPoint = [source.x + source.width / 2, source.y + source.height];
    const endPoint = [target.x + target.width / 2, target.y - 12];

    if (startPoint[0] === endPoint[0]) {
        return `M${startPoint.join(',')} L${endPoint.join(',')}`;
    }

    if (source.y === target.y) {
        startPoint[0] = source.x + source.width;
        startPoint[1] = source.y + source.height / 2;
        endPoint[0] = target.x;
        endPoint[1] = target.y + target.height / 2;
        return `M${startPoint.join(',')} L${endPoint.join(',')}`;
    }

    const controlPointsPath = [
        [startPoint[0], startPoint[1] + ranksep * 0.8],
        [startPoint[0] - (startPoint[0] - endPoint[0]), startPoint[1] + ranksep * 0.8]
    ].reduce((acc, cur) => {
        acc += ` L${cur.join(',')} `
        return acc;
    }, '');

    return `M${startPoint.join(',')}${controlPointsPath}L${endPoint.join(',')}`;
};

export default ({ edge, ranksep = 40, className = '', ...rest }) => {
    const { source, target } = edge;

    return (
        <g className={`edge ${className}`}>
            <path
                d={(rest.getPath || getPath)(source, target, ranksep)}
                stroke="#C9D2DD"
                fill="transparent"
                style={{
                    markerEnd: `url(#triangle)`
                }}
                {...rest}
            />
            {/* <foreignObject
                className="edge-text"
                width={40}
                height={20}
                x={edge.target.x + edge.target.width / 2 - 20}
                y={edge.target.y - 40}
            >
                <span>{edge.label}</span>
            </foreignObject> */}
        </g>
    );
};