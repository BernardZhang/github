import Node from './Node.js';
import Edge from './Edge.js';

export const Graph = function (options) {
    if (!(this instanceof Graph)) {
        return new Graph(options);
    }

    this.nodes = options.nodes || [];
    this.edges = options.edges || [];
};

const renderNodes = nodes => (
    `<g>
        ${nodes.map(node => new Node(node).render()).join('')}
    </g>`
);

const renderEdges = (edges, nodes) => (
    `<g>
        ${edges.map(edge => new Edge(edge, nodes, edges).render()).join('')}
    </g>`
);

Object.assign(Graph.prototype, {
    render() {
        const { nodes, edges } = this;

        return (
            `<svg class="graph">
                <defs>
                    <marker id="arrow" 
                        markerUnits="strokeWidth" 
                        markerWidth="12" 
                        markerHeight="12" 
                        viewBox="0 0 12 12" 
                        refX="6" 
                        refY="4" 
                        orient="auto"
                    >
                        <path d="M0,0 L0,8 L8,4 L0,0" style="fill: #ccc;" />
                    </marker>
                </defs>
                ${renderNodes(nodes)}
                ${renderEdges(edges, nodes)}
            </svg>`
        );
    },
    addNode() {

    },
    removeNode() {

    },
    addEdge() {

    },
    removeEdge() {

    },
    setActiveNode() {

    },
    setActiveEdge() {

    }
});

export default Graph;
