import { getControlPoint } from './utils.js';

const Edge = function (options, nodes, edges) {
  if (!(this instanceof Edge)) {
    return new Edge(options);
  }

  const { id, name, source, target } = options;

  this.id = id;
  this.name = name;
  this.source = source;
  this.target = target;
  this.nodes = nodes;
  this.edges = edges;
};

Object.assign(Edge.prototype, {
  render() {
    const edgeNodes = this.getNodes();
    const pathPoints = this.getPathPoints(edgeNodes);
    const path = this.getPath(pathPoints);

    return `
          <g>
              <path
                  id="${this.id}"
                  d="${path}"
                  fill="none"
                  stroke="#ccc"
                  stroke-width="1"
                  marker-end="url(#arrow)"
              />
              <text>
                  <textPath
                      xlink:href="#${this.id}"
                      startOffset="50%"
                      text-anchor="middle"
                  >
                      ${this.name}
                  </textPath>
              </text>
          </g>
      `;
  },
  getNodes() {
    const {
      sourceNode,
      targetNode
    } = this.nodes.reduce((acc, cur) => {
      if (cur.id === this.source) {
        acc.sourceNode = cur;
      }
      if (cur.id === this.target) {
        acc.targetNode = cur;
      }
      return acc;
    }, {});

    return [sourceNode, targetNode];
  },
  getPathPoints(edgeNodes) {
    const { edges } = this;
    const [sourceNode, targetNode] = edgeNodes;
    const { x: startX, y: startY } = sourceNode;
    const { x: endX, y: endY } = targetNode;
    const sameNodesEdges = edges.filter(({ source, target }) => (
      this.source === source && this.target === target
      || this.source === target && this.target === source
    ));
    const edgeIndex = sameNodesEdges.findIndex(({ id }) => this.id === id);
    const edgeCount = sameNodesEdges.length;
    // const movePoint = (startPoint, endPoint, targetPoint, moveDistance) => {
    //     const pointsDistance = Math.sqrt(Math.pow(endPoint[1] - startPoint[1], 2) + Math.pow(endPoint[0] - startPoint[0], 2));
    //     const sinβ = Math.abs(endPoint[1] - startPoint[1]) / pointsDistance;
    //     const cosβ = Math.abs(endPoint[0] - startPoint[0]) / pointsDistance;

    //     return [
    //         targetPoint[0] - moveDistance * sinβ,
    //         targetPoint[1] + moveDistance * cosβ
    //     ];
    // };
    const sourcePoint = [startX, startY];
    const targetPoint = [endX, endY];

    // let startPoint = [startX, startY];
    // let endPoint = [endX, endY];
    const radius = (sourceNode.size || 30) + 0;
    let moveDistance = 0;
    let middle = ~~(edgeCount / 2);

    if (edgeCount % 2 === 1) {
      moveDistance = edgeCount === 1 ? 0 : middle - edgeIndex;
    } else {
      moveDistance = middle > edgeIndex ? edgeIndex - middle : (edgeIndex - middle + 1);
    }

    console.log('moveDistance...', moveDistance, edgeIndex);

    // const angle = edgeCount === 1 ? Math.atan((endY - startY) / (endX - startX)) : (Math.PI / 12) * moveDistance;
    const angle = Math.atan((endY - startY) / (endX - startX)) + (Math.PI / 12) * moveDistance;
    let atan = Math.atan((endY - startY) / (endX - startX));
    atan = atan < 0 ? Math.PI * 2 + atan : atan;
    let startPoint = [
      startX + radius * Math.cos(angle),
      startY + radius * Math.sin(angle)
    ];
    let endPoint = [
      endX - radius * Math.cos(angle),
      endY + radius * Math.sin(angle)
    ];
    console.log('atan...', atan);

    if (atan <= Math.PI / 2) {
      startPoint = [
        startX + radius * Math.cos(angle),
        startY + radius * Math.sin(angle)
      ];
      endPoint = [
        endX - radius * Math.cos(angle),
        endY - radius * Math.sin(angle)
      ];
    }

    if (atan > Math.PI / 2 && atan < Math.PI) {
      startPoint = [
        startX - radius * Math.cos(angle),
        startY - radius * Math.sin(angle)
      ];
      endPoint = [
        endX + radius * Math.cos(angle),
        endY + radius * Math.sin(angle)
      ];
    }

    if (atan >= Math.PI && atan < Math.PI * 1.5) {
      startPoint = [
        startX - radius * Math.cos(angle),
        startY + radius * Math.sin(angle)
      ];
      endPoint = [
        endX + radius * Math.cos(angle),
        endY - radius * Math.sin(angle)
      ];
    }

    if (atan >= Math.PI * 1.5) {
      startPoint = [
        startX - radius * Math.cos(angle),
        startY - radius * Math.sin(angle)
      ];
      endPoint = [
        endX + radius * Math.cos(angle),
        endY + radius * Math.sin(angle)
      ];
    }
    console.log(angle, Math.cos(angle), Math.sin(angle));
    const centerPoint = [
      startPoint[0] + (endPoint[0] - startPoint[0]) / 2,
      startPoint[1] + (endPoint[1] - startPoint[1]) / 2
    ];

    if (moveDistance !== 0) {
      // startPoint = movePoint(sourcePoint, targetPoint, sourcePoint, moveDistance);
      // endPoint = movePoint(sourcePoint, targetPoint, targetPoint, moveDistance);
      const controlPoint = getControlPoint(startPoint, endPoint, 30 * moveDistance);

      // return [startPoint, controlPoint, endPoint];
    }

    return [startPoint, centerPoint, endPoint];
  },
  getPath(points) {
    return `M${points[0].join(' ')} Q${points[1].join(' ')} ${points[2].join(' ')}`;
  }
});

export default Edge;
