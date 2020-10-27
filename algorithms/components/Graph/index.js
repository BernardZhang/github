import { Graph } from './Graph.js';

const render = (component, dom) => {
    dom.innerHTML = component.render();
};

render(
    new Graph({
        nodes: [
            {
                id: 1,
                name: '老师',
                x: 100,
                y: 200
            },
            {
                id: 2,
                name: '学生',
                x: 500,
                y: 200
            },
            {
                id: 3,
                name: '校长',
                x: 300,
                y: 500
            }
        ],
        edges: [
            {
                id: '1-2-0',
                name: '授课1',
                source: 1,
                target: 2
            },
            {
                id: '1-2-1',
                name: '授课2',
                source: 1,
                target: 2
            },
            {
                id: '1-2-2',
                name: '授课3',
                source: 1,
                target: 2
            },
            {
                id: '1-2-3',
                name: '授课4',
                source: 1,
                target: 2
            },
            {
                id: '1-2-4',
                name: '授课5',
                source: 1,
                target: 2
            },
            {
                id: '1-3',
                name: '授课6',
                source: 1,
                target: 3
            },
            {
                id: '1-3-1',
                name: '授课7',
                source: 3,
                target: 1
            },
            {
                id: '2-3',
                name: '授课',
                source: 2,
                target: 3
            },
            {
                id: '2-3-1',
                name: '授课1',
                source: 2,
                target: 3
            },
            {
                id: '2-3-2',
                name: '授课2',
                source: 2,
                target: 3
            },
            {
                id: '2-3-3',
                name: '授课3',
                source: 2,
                target: 3
            },
            {
                id: '2-3-4',
                name: '授课4',
                source: 3,
                target: 2
            },
            {
                id: '2-3-5',
                name: '授课5',
                source: 3,
                target: 2
            }
        ].slice(0, 6)
    }),
    document.body
);