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

		this.modelMatrix = mat4.create();

		this.camera = new POLY.cameras.PerspectiveCamera();
		this.orbitalControl = new POLY.control.OrbitalControl(this.camera.matrix);

	    this.gl = POLY.gl;

	    let texture = new POLY.Texture(window.ASSET_URL + 'image/nehe.gif');
	    texture.bind();
	    let uniforms = {
	        projectionMatrix: {
	        	value: this.camera.projectionMatrix,
	        	type: 'mat4'
	        },
	        modelMatrix: {
	        	value: this.modelMatrix,
	        	type: 'mat4'
	        },
	        viewMatrix: {
	        	value: this.camera.matrix,
	        	type: 'mat4'
	        },
	        uTexture: {
	        	value: texture,
	        	type: 'texture'
	        }
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

	     var textureCoords = [
	      // Front face
	      0.0, 0.0,
	      1.0, 0.0,
	      1.0, 1.0,
	      0.0, 1.0,

	      // Back face
	      1.0, 0.0,
	      1.0, 1.0,
	      0.0, 1.0,
	      0.0, 0.0,

	      // Top face
	      0.0, 1.0,
	      0.0, 0.0,
	      1.0, 0.0,
	      1.0, 1.0,

	      // Bottom face
	      1.0, 1.0,
	      0.0, 1.0,
	      0.0, 0.0,
	      1.0, 0.0,

	      // Right face
	      1.0, 0.0,
	      1.0, 1.0,
	      0.0, 1.0,
	      0.0, 0.0,

	      // Left face
	      0.0, 0.0,
	      1.0, 0.0,
	      1.0, 1.0,
	      0.0, 1.0,
	    ];

	    var cubeVertexIndices = [
	        0, 1, 2,      0, 2, 3,    // Front face
	        4, 5, 6,      4, 6, 7,    // Back face
	        8, 9, 10,     8, 10, 11,  // Top face
	        12, 13, 14,   12, 14, 15, // Bottom face
	        16, 17, 18,   16, 18, 19, // Right face
	        20, 21, 22,   20, 22, 23  // Left face
	    ];


	    this.cube.addPosition(vertices);
	    this.cube.addAttribute(textureCoords, 'aUv', 2);
	    this.cube.addIndices(cubeVertexIndices, false);

	    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	    this.gl.enable(this.gl.DEPTH_TEST);
	}

	render()
	{
		this.rot += .02;

		this.orbitalControl.update();
		this.camera.position[2] += .01;
		this.camera.perspective(45, POLY.GL.aspectRatio, 0.1, 100.0)

	    this.program.uniforms.uTexture.bind();
	    this.program.uniforms.modelMatrix = this.modelMatrix;
	    this.program.uniforms.projectionMatrix = this.camera.projectionMatrix;
	    this.program.uniforms.viewMatrix = this.camera.matrix;

	    POLY.GL.draw(this.cube);
	}
}
