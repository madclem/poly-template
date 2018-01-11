
attribute vec3 aPosition;
attribute vec2 aUv;
attribute vec3 aNormal;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform vec3 uAmbientColor;
uniform vec3 uLightingDirection;
uniform vec3 uDirectionalColor;
varying vec2 vUv;
varying vec3 vWeightLighting;

void main(void) {
	vUv = aUv;
	vec3 transformedNormal = aNormal * normalMatrix;
	// vec3 transformedNormal = vec4(vec4(aNormal, 1.)  * modelMatrix * viewMatrix).rgb;
	float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);
	vWeightLighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(aPosition, 1.0);
}
