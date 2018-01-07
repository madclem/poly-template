import * as POLY from 'poly/Poly';
import frag from '../shaders/basic.frag';
import vert from '../shaders/basic.vert';
import {mat4} from 'gl-matrix';

export default class MainScene
{
	constructor()
	{

		this.gl = null;
		this.program = null;
		this.cube = null;
		this.rot = null;
		this.angle = null;
		
		this.modelViewMatrix = mat4.create();
		this.projectionMatrix = mat4.create();
	    this.gl = POLY.gl;

	    let uniforms = {
	        projectionMatrix: this.projectionMatrix,
	        modelViewMatrix: this.modelViewMatrix 
	    }

	    this.program = new POLY.Program(vert, frag, uniforms);
	    this.cube = new POLY.Mesh(this.program);

	    const vertices = [
	        // Front face
	        -1.0, -1.0,  1.0,
	         1.0, -1.0,  1.0,
	         1.0,  1.0,  1.0,
	        -1.0,  1.0,  1.0,

	        // Back face
	        -1.0, -1.0, -1.0,
	        -1.0,  1.0, -1.0,
	         1.0,  1.0, -1.0,
	         1.0, -1.0, -1.0,

	        // Top face
	        -1.0,  1.0, -1.0,
	        -1.0,  1.0,  1.0,
	         1.0,  1.0,  1.0,
	         1.0,  1.0, -1.0,

	        // Bottom face
	        -1.0, -1.0, -1.0,
	         1.0, -1.0, -1.0,
	         1.0, -1.0,  1.0,
	        -1.0, -1.0,  1.0,

	        // Right face
	         1.0, -1.0, -1.0,
	         1.0,  1.0, -1.0,
	         1.0,  1.0,  1.0,
	         1.0, -1.0,  1.0,

	        // Left face
	        -1.0, -1.0, -1.0,
	        -1.0, -1.0,  1.0,
	        -1.0,  1.0,  1.0,
	        -1.0,  1.0, -1.0
	    ];

	    let colors = [
	        [1.0, 0.0, 0.0, 1.0], // Front face
	        [1.0, 1.0, 0.0, 1.0], // Back face
	        [0.0, 1.0, 0.0, 1.0], // Top face
	        [1.0, 0.5, 0.5, 1.0], // Bottom face
	        [1.0, 0.0, 1.0, 1.0], // Right face
	        [0.0, 0.0, 1.0, 1.0]  // Left face
	    ];
	    let unpackedColors = [];
	    for (let i in colors) {
	        let color = colors[i];
	        for (let j=0; j < 4; j++) {
	            unpackedColors = unpackedColors.concat(color);
	        }
	    }


	    var cubeVertexIndices = [
	        0, 1, 2,      0, 2, 3,    // Front face
	        4, 5, 6,      4, 6, 7,    // Back face
	        8, 9, 10,     8, 10, 11,  // Top face
	        12, 13, 14,   12, 14, 15, // Bottom face
	        16, 17, 18,   16, 18, 19, // Right face
	        20, 21, 22,   20, 22, 23  // Left face
	    ];


	    this.cube.addPosition(vertices);
	    this.cube.addAttribute(unpackedColors, 'aColor', 4);
	    this.cube.addIndices(cubeVertexIndices, false);

	    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	    this.gl.enable(this.gl.DEPTH_TEST);
	}

	render()
	{
		this.rot += .02;

	    mat4.perspective(this.projectionMatrix, 45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0);
	    mat4.identity(this.modelViewMatrix);
	    mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [-0, 0.0, -7.0]);
	    mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, this.rot, [0, 1, 1]);

	    this.program.uniforms.modelViewMatrix = this.modelViewMatrix;
	    this.program.uniforms.projectionMatrix = this.projectionMatrix;
	    
	    POLY.GL.draw(this.cube);
	}
}