
attribute vec3 position;
attribute vec2 aUv;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

varying vec2 vUv;
void main() {
    vUv = vec2(aUv.x, aUv.y);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
}