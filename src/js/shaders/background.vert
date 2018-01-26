
attribute vec3 aPosition;
attribute vec2 aUv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

varying vec3 vPos;
varying vec3 vNormal;
varying vec2 vUv;


void main(void) {
	vPos = aPosition;
	// vUv = aPosition.xy;
	vUv = aUv;

	vec4 position = projectionMatrix * viewMatrix * modelMatrix * vec4(aPosition, 1.0);

    gl_Position =  position;
}
