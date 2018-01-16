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
		this.sphere = null;
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


		// this.fbo = new POLY.FrameBuffer();


		let vertQuad = `
			attribute vec3 aPosition;
			//attribute vec2 aUv;
			uniform mat4 modelMatrix;
			uniform mat4 viewMatrix;
			uniform mat4 projectionMatrix;

			varying vec3 vPos;
			//varying vec2 vUv;


			void main(void) {
				vPos = aPosition;
				//vUv = aUv;
			    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(aPosition, 1.0);
			}
		`

		let fragQuad = `
		precision mediump float;

		uniform sampler2D uTexture;

		varying vec3 vPos;
		varying vec2 vUv;

		void main(void) {

			//vec4 textureColor = texture2D(uTexture, vec2(vUv.s, vUv.t));
			gl_FragColor = vec4(1.);
			// gl_FragColor.rgb *= uAlpha;
		}

		`


		this.programQuad = new POLY.Program(vertQuad, fragQuad, {
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
		});
		this.quad = new POLY.geometry.Mesh(this.programQuad, null, POLY.gl.TRIANGLE_STRIP);
		this.quad.addPosition(
			[
				10.0, -10.0, 0.0,
				10.0, 10.0, 0.0,
				-10.0, -10.0, 0.0,
				-10.0, 10.0, 0.0
			]
		)
		this.quad.addIndices(
			[3,2,1,3,1,0]
		);

		this.quad.scale.x = 10.;
		this.quad.scale.y = 10.;
		this.quad.scale.z = 10.;

	    this.texture = new POLY.Texture(window.ASSET_URL + 'image/earth.jpg');
	    this.textureSpecular = new POLY.Texture(window.ASSET_URL + 'image/earth-specular.gif');

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
	        	value: this.texture,
	        	type: 'texture',
				index: 0
	        },
	        uTextureSpecular: {
	        	value: this.textureSpecular,
	        	type: 'texture',
				index: 1
	        },
	        uAmbientColor: {
	        	value: [.5, .5, .5],
	        	type: 'vec3'
	        },
	        uPointLightingLocation: {
	        	value: [-2.0, .0, 0.],
	        	type: 'vec3'
	        },
	        uPointLightingDiffuseColor: {
	        	value: [1., 0, 0],
	        	type: 'vec3'
	        },
	        uPointLightingSpecularColor: {
	        	value: [5., 5., 5.],
	        	type: 'vec3'
	        },
	        uMaterialShininess: {
	        	value: 40.,
	        	type: 'float'
	        },
	        uAlpha: {
	        	value: 1,
	        	type: 'float'
	        }
	    }

		let state = new POLY.State(this.gl);
		state.depthTest = true;

	    this.program = new POLY.Program(vert, frag, uniforms);

    	this.sphere = new POLY.geometry.Sphere(this.program, {}, state);
	}

	render()
	{
		this.tick++;

		this.orbitalControl.update();
		this.camera.position[2] += .01;
	    // this.program.uniforms.uTexture.bind();

		// set uniforms
		let c = this.sphere;

		c.rotation.y += .01;

		this.texture.bind(0);
		this.textureSpecular.bind(1);

		mat4.multiply(this._matrix, this.camera.matrix, c._matrix);
		mat3.fromMat4(this.normalMatrix, this._matrix);
		mat3.transpose(this.normalMatrix, this.normalMatrix);

	    this.program.uniforms.projectionMatrix = this.camera.projectionMatrix;
	    this.program.uniforms.viewMatrix = this.camera.matrix;
		this.program.uniforms.normalMatrix = this.normalMatrix;


		this.program.uniforms.modelMatrix = c._matrix;
	   	POLY.GL.draw(c);

		this.programQuad.uniforms.projectionMatrix = this.camera.projectionMatrix;
	    this.programQuad.uniforms.viewMatrix = this.camera.matrix;
		// this.programQuad.uniforms.modelMatrix = c._matrix;
		POLY.GL.draw(this.quad);
	}

	resize()
	{
		this.camera.setAspectRatio(POLY.GL.aspectRatio);
	}
}
