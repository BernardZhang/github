const Node = function (options) {
  if (!(this instanceof Node)) {
    return new Node(options);
  }

  const { id, x, y, size = 30 } = options;

  this.id = id;
  this.x = x;
  this.y = y;
  this.size = size;
};

Object.assign(Node.prototype, {
  render() {
    const { x, y, size = 30 } = this;

    return `
          <circle
              cx=${x}
              cy=${y}
              r=${size}
              stroke="red"
              fill="red"
              stroke-width="2"
          />
      `;
  }
});

export default Node;
