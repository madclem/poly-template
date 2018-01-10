precision mediump float;


uniform sampler2D uTexture;
varying vec2 vUv;
varying vec3 vWeightLighting;

void main(void) {
	vec4 textureColor = texture2D(uTexture, vec2(vUv.s, vUv.t));
	gl_FragColor = vec4(textureColor.rgb * vWeightLighting, textureColor.a);
}
