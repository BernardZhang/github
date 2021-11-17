const Edge = function ({ source, target, name }) {
  this.source = source;
  this.target = target;
  this.name = name || `${source.name}->${target.name}`;
};

Edge.prototype.render = function () {
  const { source, target, name } = this;
  const pathD = `M${source.x},${source.y}L${target.x},${target.y}`;
  const textPoint = {
    x: (target.x + source.x) / 2,
    y: (target.y + source.y) / 2
  };
  const v1 = [target.x - source.x, target.y - source.y];
  const v2 = [1, 0];
  const angle = Math.acos((v1[0] * v2[0] + v1[1] * v2[1]) / Math.sqrt(Math.pow(v1[0], 2) + Math.pow(v1[1], 2))) * (180 / Math.PI);

  return (`
    <g class="edge">
      <path
        d="${pathD}"
        stroke="red"
        stroke-width="2"
      />
      <text
        x="${textPoint.x}"
        y="${textPoint.y - 6}"
        text-anchor="middle"
        font-size="12"
        transform="rotate(${angle}, ${textPoint.x} ${textPoint.y})"
      >
        ${name}
      </text>
    </g>
  `)
};

function render(dom) {
  const A = {
    x: 100,
    y: 200,
    name: 'A'
  };
  const B = {
    x: 210,
    y: 200,
    name: 'B'
  };
  const C = {
    x: 200,
    y: 100,
    name: 'C'
  };
  const D = {
    x: 100,
    y: 100,
    name: 'D'
  };
  const E = {
    x: 10,
    y: 100,
    name: 'E'
  };
  const F = {
    x: 10,
    y: 200,
    name: 'F'
  };
  const G = {
    x: 10,
    y: 300,
    name: 'G'
  };
  const H = {
    x: 100,
    y: 300,
    name: 'H'
  };
  const I = {
    x: 200,
    y: 300,
    name: 'I'
  };
  const edges = [
    new Edge({
      source: A,
      target: B
    }),
    new Edge({
      source: A,
      target: C
    }),
    new Edge({
      source: A,
      target: D
    }),
    new Edge({
      source: A,
      target: E
    }),
    new Edge({
      source: A,
      target: F
    }),
    new Edge({
      source: A,
      target: G
    }),
    new Edge({
      source: A,
      target: H
    }),
    new Edge({
      source: A,
      target: I
    })
  ];

  dom.innerHTML = edges.map(edge => edge.render()).join('');
}

render(document.querySelector('#graph .edges'))