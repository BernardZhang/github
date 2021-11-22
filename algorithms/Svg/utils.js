export const getControlPoint = (startPoint, endPoint, distance) => {
  const v1 = [(startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2]; // 启始点到终点向量
  const v2 = [v1[1] * distance, v1[0] * distance * -1]; // v1的垂直向量

  // 向量v1 + v2得到控制点到起始点的方向向量，从而得出控制点坐标
  return {
    x: v1[0] + v2[0] + startPoint.x,
    y: v1[1] + v2[0] + startPoint.y
  };
};

export const getBezierCurvePath = (startPoint, controlPoint, endPoint) => ``;

export const getLinePath = (...points) => ``;