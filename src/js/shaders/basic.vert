attribute vec3 aPosition;
attribute vec4 aColor;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec4 vColor;

void main(void) {
	vColor = aColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(aPosition, 1.0);
}
