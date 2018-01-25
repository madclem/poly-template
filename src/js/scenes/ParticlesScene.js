import * as POLY from 'poly/Poly';
import frag from '../shaders/particles.frag';
import vert from '../shaders/particles.vert';
import simulation_fs from '../shaders/simulation_fs.frag';
import simulation_vs from '../shaders/simulation_vs.vert';
import render_fs from '../shaders/render.frag';
import render_vs from '../shaders/render.vert';
import test_fs from '../shaders/test.frag';
import test_vs from '../shaders/test.vert';
import {mat3, mat4} from 'gl-matrix';

export default class ParticlesScene
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

		let stateRendering = new POLY.State(this.gl);
        stateRendering.depthTest = true;

		let width = 1024;
		let height = 1024;
		this.fbo = new POLY.FrameBuffer(width, height);

        let w = width;
        let h = height;
        let len = w * h * 4;
        let data = new Float32Array( len );

        while( len-- )data[len] = ( Math.random() );

        this.dataTexture = new POLY.DataTexture(data, w, h);


        this.simulationProgram = new POLY.Program(simulation_vs, simulation_fs, {
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
	        }
        });
        this.geomSim = new POLY.geometry.Quad(this.simulationProgram, null, stateRendering);

        this.renderingProgram = new POLY.Program(render_vs, render_fs, {
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
	        pointSize: {
	        	value: 1,
	        	type: 'float'
	        }
        });

 
        let l = width * height;
		let vertices = new Float32Array(l * 3);
		for ( var i = 0; i < l; i++ ) 
		{
            var i3 = i * 3;
            vertices[ i3 ] = ( i % width ) / width;
            vertices[ i3 + 1 ] = ( i / width ) / height;
        }

        
        this.geomRendering = new POLY.geometry.Mesh(this.renderingProgram, stateRendering, POLY.gl.POINTS);
        this.geomRendering.addPosition(vertices);

	}

	render()
	{
		this.tick++;

		this.orbitalControl.update();
		this.camera.position[2] += .01;
	  	mat3.fromMat4(this.normalMatrix, this._matrix);
		mat3.transpose(this.normalMatrix, this.normalMatrix);
		

	    
		this.fbo.bind();
		this.simulationProgram.bind();
		this.dataTexture.bind(0);
		this.simulationProgram.uniforms.projectionMatrix = this.camera.projectionMatrix;
	    this.simulationProgram.uniforms.viewMatrix = this.camera.matrix;
	   	POLY.GL.draw(this.geomSim);
		this.fbo.unbind();


		this.renderingProgram.bind();
		this.fbo.textures[0].bind(0);
		this.renderingProgram.uniforms.projectionMatrix = this.camera.projectionMatrix;
	    this.renderingProgram.uniforms.viewMatrix = this.camera.matrix;
	    POLY.GL.draw(this.geomRendering);

	    this.fbo.clear();
	}

	resize()
	{
		this.camera.setAspectRatio(POLY.GL.aspectRatio);
	}
}
