import G6 from '@antv/g6';

G6.registerEdge('flow-line', {
    draw(cfg, group) {
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;

        const { style } = cfg;
        const shape = group.addShape('path', {
            attrs: {
                stroke: style.stroke,
                endArrow: style.endArrow,
                path: [
                    ['M', startPoint.x, startPoint.y],
                    ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
                    ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
                    ['L', endPoint.x, endPoint.y],
                ],
            },
        });

        return shape;
    },
});