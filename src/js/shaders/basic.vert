attribute vec3 aPosition;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main(void) {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(aPosition, 1.0);
}
