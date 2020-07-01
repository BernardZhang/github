// 定点着色器
var VSHADER_SOURCE = `
    void main() {
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0); // 点坐标
        gl_PointSize = 10.0; // 点大小
    }
`;

// 片元着色器
var FSHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(255.0, 0.0, 0.0, 1.0); // 点颜色
    }
`;

function main() {
    var canvas = document.getElementById('webgl');

    // 获取webgl render context
    var gl = getWebGLContext(canvas);

    if (!gl) {
        console.log('获取webgl render context失败');
        return;
    }

    // 初始化shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('初始化shaders失败');
        return;
    }

    // 设置canvas背景颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 清除颜色缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 画点
    gl.drawArrays(gl.POINTS, 0, 1);
}