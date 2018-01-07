import * as POLY from 'poly/Poly';
import frag from './shaders/basic.frag';
import vert from './shaders/basic.vert';
import {mat4} from 'gl-matrix';

// function getShader(gl, src, id) {
//     var shader;
//     if (id == "frag")
//     {
//         shader = gl.createShader(gl.FRAGMENT_SHADER);
//     } else if (id == "vert")
//     {
//         shader = gl.createShader(gl.VERTEX_SHADER);
//     }
//
//     gl.shaderSource(shader, src);
//     gl.compileShader(shader);
//
//     if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//         alert(gl.getShaderInfoLog(shader));
//         return null;
//     }
//
//     return shader;
// }
//
//
// var shaderProgram;
let gl, program;
// function initShaders() {
//
//     let program = new POLY.
//     var fragmentShader = getShader(gl, frag, "frag");
//     var vertexShader = getShader(gl, vert, "vert");
//
//     shaderProgram = gl.createProgram();
//     gl.attachShader(shaderProgram, vertexShader);
//     gl.attachShader(shaderProgram, fragmentShader);
//     gl.linkProgram(shaderProgram);
//
//     if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
//         alert("Could not initialise shaders");
//     }
//
//     gl.useProgram(shaderProgram);
//
//     shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
//     gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
//
//     shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
//     shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
// }


var mvMatrix = mat4.create();
var pMatrix = mat4.create();

function setMatrixUniforms() {
    gl.uniformMatrix4fv(program.program.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(program.program.mvMatrixUniform, false, mvMatrix);
}



var triangleVertexPositionBuffer;
var squareVertexPositionBuffer;

function initBuffers() {
    triangleVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    var vertices = [
         0.0,  1.0,  0.0,
        -1.0, -1.0,  0.0,
         1.0, -1.0,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    triangleVertexPositionBuffer.itemSize = 3;
    triangleVertexPositionBuffer.numItems = 3;

    squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    vertices = [
         1.0,  1.0,  0.0,
        -1.0,  1.0,  0.0,
         1.0, -1.0,  0.0,
        -1.0, -1.0,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = 4;
}


function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(pMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

    mat4.identity(mvMatrix);

    mat4.translate(mvMatrix, mvMatrix, [-1.5, 0.0, -7.0]);
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    gl.vertexAttribPointer(program.program.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);


    mat4.translate(mvMatrix, mvMatrix, [3.0, 0.0, 0.0]);
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    gl.vertexAttribPointer(program.program.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
}



let init = ()=>{
    var canvas = document.getElementById("canvas");
    POLY.init(canvas);

    gl = POLY.gl;
    // initGL(canvas);
    // initShaders();
    program = new POLY.Program(vert, frag);

    initBuffers();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    drawScene();
}

init();
