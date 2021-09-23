import dagre from 'dagre';

export const layout = data => {
	const graph = new dagre.graphlib.Graph().setGraph({}).setDefaultEdgeLabel(() => {
		return {};
	});

	data.nodes = data.nodes.map(node => ({
		...node,
		size: '120*60',
		width: 120,
		height: 60
	}))

	data.nodes.forEach((node) => {
		const size = (node.size || '120*60').split('*');
		const width = Number(size[0]);
		const height = Number(size[1]);
		graph.setNode(node.id, { width, height });
	});
	data.edges.forEach((edge) => {
		graph.setEdge(edge.source, edge.target);
	});
	dagre.layout(graph);

	return graph;
};

export const dagreLayout = (data, { canvasWidth, canvasHeight }) => {
	const graph = layout(data);
	let minX = Infinity;
	let maxX = 0;
	let minY = Infinity;
	let maxY = 0;
	const nextNodes = data.nodes.map((node) => {
		const graphNode = graph.node(node.id);
		minX = Math.min(minX, graphNode.x);
		maxX = Math.max(maxX, graphNode.x);
		minY = Math.min(minY, graphNode.y);
		maxY = Math.max(maxY, graphNode.y);
		return { ...node, x: graphNode.x, y: graphNode.y };
	});
	const offsetX = (canvasWidth - (maxX - minX + 120)) / 2;
	const offsetY = (canvasHeight - (maxY - minY + 60)) / 2;
	console.log('nextNodes...', nextNodes);
	const adjustY = (node, offsetY) => {
		if (node.controller) {
			return minY + offsetY;
		}
		return node.y + offsetY;
	};

	data.nodes = nextNodes.map((node) => ({
		...node,
		x: node.x + offsetX,
		y: adjustY(node, offsetY),
	}));
	console.log('data.nodes...', data.nodes);

	return data;
}

export const dagreLayoutRecursive = (data, { canvasWidth, canvasHeight }) => {
    let graphData = data;

    const graphList = [graphData];

    while (graphData.subGraph) {
        graphList.push(graphData.subGraph);
        graphData = graphData.subGraph;
    }

    console.log('graphList...', graphList);
	const graphs = graphList.map(graphData => layout(graphData));
	let preMaxX = 0;

	// TODO graphs排序已确保各个子图形成连通图后，尽量不要存在边穿过点的情况

	graphs.map((graph, i) => {
		let maxX = 0;
		graphList[i].nodes = graphList[i].nodes.map(node => {
			const graphNode = graph.node(node.id);

			maxX = Math.max(graphNode.x, maxX);

			return {
				...node,
				x: graphNode.x + (preMaxX ? (preMaxX + graphNode.width) : 0),
				y: graphNode.y
			};
		});
		preMaxX = maxX;
	});

	const allGraphData = graphList.reduce((acc, cur) => {
		acc.nodes = [
			...acc.nodes,
			...cur.nodes
		];
		acc.edges = [
			...acc.edges,
			...cur.edges
		];
		acc.undirectedEdges = [
			...acc.undirectedEdges,
			...(cur.undirectedEdges || [])
		];
		acc.hideEdges = [
			...acc.hideEdges,
			...(cur.hideEdges || [])
		];
		return acc;
	}, { nodes: [], edges: [], undirectedEdges: [], hideEdges: [] });

	let minX = Infinity;
	let maxX = 0;
	let minY = Infinity;
	let maxY = 0;
	allGraphData.nodes.forEach(node => {
		minX = Math.min(minX, node.x);
		maxX = Math.max(maxX, node.x);
		minY = Math.min(minY, node.y);
		maxY = Math.max(maxY, node.y);
	});
	const offsetX = (canvasWidth - (maxX - minX + 240)) / 2;
	const offsetY = (canvasHeight - (maxY - minY + 60)) / 2;

	const adjustY = (node, offsetY) => {
		if (node.controller) {
			return minY + offsetY;
		}
		return node.y + offsetY;
	};

	allGraphData.nodes = allGraphData.nodes.map((node) => ({
		...node,
		x: node.x + offsetX,
		y: adjustY(node, offsetY),
	}));

	console.log('graphs...', graphs);

	return allGraphData;
};
