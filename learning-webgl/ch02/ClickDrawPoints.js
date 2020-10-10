// 定点着色器
var VSHADER_SOURCE = `
    attribute vec4 a_Position; // 点位置变量
    void main() {
        gl_Position = a_Position;
        gl_PointSize = 10.0;
    }
`;

// 片元着色器
var FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_FragColor; // uniform变量，点颜色
    void main() {
        gl_FragColor = u_FragColor; // 点颜色
    }
`;

function main() {
    var canvas = document.getElementById('webgl');

    // webgl render context
    var gl = getWebGLContext(canvas);

    if (!gl) {
        console.log('Failed to get webgl render context');
        return;
    }

    // 初始化shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('intialize shaders failed');
        return;
    }

    // 设置canvas 颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 清除颜色缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 获取a_Position变量的存储地址
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    if (a_Position < 0) {
        console.log('获取a_Position变量存储地址失败');
        return;
    }

    // 获取u_FragColor变量存储地址
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

    if (u_FragColor < 0) {
        console.log('获取u_FragColor变量存储地址失败');
        return;
    }

    // 传点坐标位置给a_Position变量
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

    // 传点颜色给u_FragColor
    gl.uniform4f(u_FragColor, 0.0, 0.0, 255.0, 1.0)

    // 画点
    gl.drawArrays(gl.POINTS, 0, 1);

    var points = [];
    var clickHandle = (evt, gl, canvas, a_Position, u_FragColor) => {
        var getPointPosition = function (evt, canvas) {
            var x = evt.clientX;
            var y = evt.clientY;
            var rect = canvas.getBoundingClientRect();

            x = (x - rect.left - (rect.width / 2)) / (rect.width / 2);
            y = (rect.height / 2 - (y - rect.top)) / (rect.height / 2);

            return { x, y };
        };
        var getColorByPosition = function (position) {
            var colorVec4 = [1.0, 1.0, 1.0, 1.0]; // 白色
            var x = position.x;
            var y = position.y;

            // 第一象限 红色
            if (x >= 0 && y >= 0) {
                colorVec4 = [1.0, 0.0, 0.0, 1.0];
            }

            // 第二象限 绿色
            if (x > 0 && y < 0) {
                colorVec4 = [0.0, 1.0, 0.0, 1.0];
            }

            // 第三象限 蓝色
            if (x < 0 && y < 0) {
                colorVec4 = [0.0, 0.0, 1.0, 1.0];
            }

            return colorVec4;
        };

        points.push(getPointPosition(evt, canvas));

        // 清除canvas颜色缓冲区
        gl.clear(gl.COLOR_BUFFER_BIT);

        for (var i = 0; i < points.length; i++) {
            // 设置点位置
            gl.vertexAttrib3f(a_Position, points[i].x, points[i].y, 0.0);
            // 设置点颜色
            gl.uniform4f(u_FragColor, ...getColorByPosition(points[i]));
            // 画点
            gl.drawArrays(gl.POINTS, 0, 1);
        }
    };

    canvas.addEventListener('mousedown', evt => {
        clickHandle(evt, gl, canvas, a_Position, u_FragColor);
    });
}