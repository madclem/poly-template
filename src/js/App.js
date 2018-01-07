import * as POLY from 'poly/Poly';
import MainScene from './scenes/MainScene';

export default class App
{
	constructor()
	{
		let canvas = document.getElementById("canvas");
    	POLY.init(canvas);
	    this.gl = POLY.gl;

	    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	    this.gl.enable(this.gl.DEPTH_TEST);

	    this._loadComplete();
	}

	_loadComplete()
	{
		this.scene = new MainScene();
	    
	    POLY.utils.loop.add(this._update.bind(this));
	}

	_update()
	{
		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
	    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.scene.render();
	}
}