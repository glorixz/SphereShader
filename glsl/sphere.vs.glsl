varying vec4 V_Normal_VCS;
varying vec4 V_ViewPosition;
varying vec3 V_lightVector;
uniform vec3 u_lightPosition;

void main() {
	V_Normal_VCS = vec4(normalMatrix * normal, 0.0);
	V_ViewPosition = modelViewMatrix * vec4(position, 1.0);
	V_lightVector = normalize(vec3(viewMatrix * vec4(u_lightPosition,0.0)));

	gl_Position = projectionMatrix *  modelViewMatrix * vec4(position, 1.0);
}