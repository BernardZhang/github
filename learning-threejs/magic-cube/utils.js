export const rotateAroundPoint = (cx, cy, angle, p) => {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  // translate point back to origin:
  p.x -= cx;
  p.y -= cy;

  // rotate point
  const newX = p.x * cos - p.y * sin;
  const newY = p.x * sin + p.y * cos;

  // translate point back:
  p.x = newX + cx;
  p.y = newY + cy;

  return p;
};