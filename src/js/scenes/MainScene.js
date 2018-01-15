import * as POLY from 'poly/Poly';
import frag from '../shaders/basic.frag';
import vert from '../shaders/basic.vert';
import {mat3, mat4} from 'gl-matrix';

export default class MainScene
{
	constructor()
	{
		this.gl = null;
		this.program = null;
		this.cube = null;
		this.rot = null;
		this.tick = 0;
		this.angle = null;

		this.modelMatrix = mat4.create();

		this.camera = new POLY.cameras.PerspectiveCamera();
		this.camera.perspective(45, POLY.GL.aspectRatio, 0.1, 100.0)
		this.orbitalControl = new POLY.control.OrbitalControl(this.camera.matrix);

		this._matrix = mat4.create();
		this.normalMatrix = mat3.create();

	    this.gl = POLY.gl;

	    let texture = new POLY.Texture(window.ASSET_URL + 'image/crate.gif');
	    texture.bind();



	    let uniforms = {
	        projectionMatrix: {
	        	value: this.camera.projectionMatrix,
	        	type: 'mat4'
	        },
	        normalMatrix: {
	        	value: this.normalMatrix,
	        	type: 'mat3'
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
	        },
	        uAmbientColor: {
	        	value: [.2, .2, .2],
	        	type: 'vec3'
	        },
	        uPointLightingLocation: {
	        	value: [-2.0, .0, 0.],
	        	type: 'vec3'
	        },
	        uPointLightingColor: {
	        	value: [1., 0, 0],
	        	type: 'vec3'
	        },
	        uAlpha: {
	        	value: 1,
	        	type: 'float'
	        }
	    }

		let state = new POLY.State(this.gl);
		// state.blend = true;
		state.depthTest = true;

	    this.program = new POLY.Program(vert, frag, uniforms);

    	this.cube = new POLY.geometry.Cube(this.program, {}, state);
	}

	render()
	{
		this.tick++;

		this.orbitalControl.update();
		this.camera.position[2] += .01;
	    this.program.uniforms.uTexture.bind();

		// set uniforms
		let c = this.cube;

	    this.program.uniforms.projectionMatrix = this.camera.projectionMatrix;
	    this.program.uniforms.viewMatrix = this.camera.matrix;
		this.program.uniforms.normalMatrix = this.normalMatrix;

		mat4.multiply(this._matrix, this.camera.matrix, c._matrix);
		mat3.fromMat4(this.normalMatrix, this._matrix);
		mat3.transpose(this.normalMatrix, this.normalMatrix);

		this.program.uniforms.modelMatrix = c._matrix;
	   	POLY.GL.draw(c);
	}

	resize()
	{
		this.camera.setAspectRatio(POLY.GL.aspectRatio);
	}
}
