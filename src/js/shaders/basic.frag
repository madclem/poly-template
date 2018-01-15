precision mediump float;


uniform sampler2D uTexture;
uniform float uAlpha;
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;


uniform vec3 uAmbientColor;
uniform vec3 uPointLightingLocation;
uniform vec3 uPointLightingSpecularColor;
uniform vec3 uPointLightingDiffuseColor;
uniform float uMaterialShininess;

void main(void) {
	vec4 textureColor = texture2D(uTexture, vec2(vUv.s, vUv.t));

	vec3 lightDirection = normalize(uPointLightingLocation - vPos.xyz);
    float directionalLightWeighting = max(dot(normalize(vNormal), lightDirection), 0.0);

	vec3 normal = normalize(vNormal);
	vec3 eyeDirection = normalize(-vPos.xyz);
	vec3 reflectionDirection = reflect(-lightDirection, normal);
	float specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), uMaterialShininess);

	float diffuseLightWeighting = max(dot(normal, lightDirection), 0.0);

	vec3 lightWeighting = uAmbientColor
        + uPointLightingSpecularColor * specularLightWeighting
        + uPointLightingDiffuseColor * diffuseLightWeighting;

	gl_FragColor = vec4(textureColor.rgb * lightWeighting, textureColor.a * uAlpha);
	gl_FragColor.rgb *= uAlpha;
}
