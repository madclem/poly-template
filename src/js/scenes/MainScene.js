import * as POLY from 'poly/Poly';
import frag from '../shaders/basic.frag';
import vert from '../shaders/basic.vert';
import ViewBg from '../views/ViewBg';
import {mat3, mat4} from 'gl-matrix';

export default class MainScene
{
	constructor()
	{
		this.gl = null;
		this.tick = 0;
		this.gl = POLY.gl;

		this.camera = new POLY.cameras.PerspectiveCamera();
		this.camera.perspective(45, POLY.GL.aspectRatio, 0.1, 100.0)

		this.orbitalControl = new POLY.control.OrbitalControl(this.camera.matrix);
		POLY.GL.setCamera(this.camera);

		this.viewBg = new ViewBg(window.ASSET_URL + 'image/sky_gradient.jpg');
		this._bPlanes = new POLY.helpers.BatchPlanes();
	}

	render()
	{
		this.orbitalControl.update();
		// this.camera.position[2] += .01;
		POLY.gl.disable(POLY.gl.DEPTH_TEST);
		this.viewBg.render();
		this._bPlanes.draw();
		POLY.gl.enable(POLY.gl.DEPTH_TEST);

	}

	resize()
	{
		this.camera.setAspectRatio(POLY.GL.aspectRatio);

	}
}
