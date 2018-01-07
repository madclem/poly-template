import * as POLY from 'poly/Poly';
import frag from './shaders/basic.frag';
import vert from './shaders/basic.vert';
import {mat4} from 'gl-matrix';

let gl, program, triangle;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();


function draw() 
{
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(pMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, mvMatrix, [-1.5, 0.0, -7.0]);

    program.uniforms.modelViewMatrix = mvMatrix;
    program.uniforms.projectionMatrix = pMatrix;
    
    POLY.GL.draw(triangle);
}



let init = ()=>{
    var canvas = document.getElementById("canvas");
    POLY.init(canvas);
    gl = POLY.gl;

    let uniforms = 
    {
        projectionMatrix: pMatrix,
        modelViewMatrix: mvMatrix 
    }

    program = new POLY.Program(vert, frag, uniforms);
    triangle = new POLY.Mesh(program);
    triangle.addPosition([
        0.0,  1.0,  0.0,
        -1.0, -1.0,  0.0,
        1.0, -1.0,  0.0
    ]);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    draw();
}

init();
