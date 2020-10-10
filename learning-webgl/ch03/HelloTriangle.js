var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = 10.0;
    }
`;

var FSHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

function main() {
    // get webgl context
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);

    if (!gl) {
        console.log('Failed to get webgl render context.');
        return;
    }

    // 初始化定点、片元shader
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initailize shaders.');
        return;
    }

    // 写入点的位置到定点shader
    var pointCount = initVertextBuffers(gl);

    // 指定清除canvas的颜色
    gl.clearColor(0, 0, 0, 1);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 画点
    gl.drawArrays(gl.POINTS, 0, pointCount);
    // gl.drawArrays(gl.LINE_LOOP, 0, pointCount);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, pointCount);
}

function initVertextBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5,
        0.5, 0.0,
        -0.5, 0.0
    ]);

    // 创建buffer
    var vertexBuffer = gl.createBuffer();

    if (!vertexBuffer) {
        console.log('Failed to creat the buffer object.');
        return;
    }

    // bind buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // set data to buffer
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position.');
        return -1;
    }

    // assign buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    return vertices.length / 2;
}