import { get } from 'lodash';

export const getControlPoint = (startPoint, endPoint, moveDistance) => {
    const centerPoint = [
        startPoint[0] + (endPoint[0] - startPoint[0]) / 2,
        startPoint[1] + (endPoint[1] - startPoint[1]) / 2
    ];
    const angle = Math.atan((endPoint[1] - startPoint[1]) / (endPoint[0] - startPoint[0]));

    return [
        centerPoint[0] - moveDistance * Math.sin(angle),
        centerPoint[1] + moveDistance * Math.cos(angle)
    ];

    // const pointsDistance = Math.sqrt(Math.pow(endPoint[1] - startPoint[1], 2) + Math.pow(endPoint[0] - startPoint[0], 2));
    // const sinβ = Math.abs(endPoint[1] - startPoint[1]) / pointsDistance;
    // const cosβ = Math.abs(endPoint[0] - startPoint[0]) / pointsDistance;

    // return [
    //     centerPoint[0] - moveDistance * sinβ,
    //     centerPoint[1] + moveDistance * cosβ
    // ];
};


export const fixedNum = (num, count = 2) => {
    if (get(num.toString().split('.'), '1', '').length > count) {
        return +num.toFixed(count);
    }

    return num;
};
