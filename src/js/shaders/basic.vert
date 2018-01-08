
attribute vec3 aPosition;
attribute vec2 aUv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main(void) {
	vUv = aUv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(aPosition, 1.0);
}

