varying vec4 V_Color;
uniform float u_kAmbient;
uniform float u_kDiffuse;
uniform float u_kSpecular;
uniform float u_shininess;
uniform vec3 u_lightColor;
uniform vec3 u_lightPosition;
uniform vec3 u_ambientColor;

// GOURAUD: use the normal at each vertex to compute the colour.
void main() {
	// direction of light; same for all vertices. 
	// convert it first into camera coordinates, then normalize. 
	vec3 lightVector = normalize(vec3(viewMatrix * vec4(u_lightPosition,0.0)));

	//transform position and normal into camera coords as well.
	vec3 camSpacePos = vec3(modelViewMatrix * vec4(position,1.0));
	vec3 camSpaceNorm = normalize(normalMatrix * normal);

	vec4 ambient = u_kAmbient * vec4(u_ambientColor,1.0);
	
	float theta = max(dot(lightVector, camSpaceNorm), 0.0); // angle between light and normal
	vec4 diffuse = u_kDiffuse * vec4(u_lightColor, 1.0) * vec4(u_ambientColor, 1.0) * theta;
	
	// direction of the light's reflection
	vec3 reflectionVec = normalize(lightVector - 2.0*dot(lightVector, camSpaceNorm) * camSpaceNorm);
	// vector representing line-of-sight
	vec3 viewVec = normalize(camSpacePos);
	float specAmount = pow(max(dot(reflectionVec, viewVec), 0.0), u_shininess);
	vec4 specular = u_kSpecular * specAmount * vec4(u_lightColor, 1.0);

	
	V_Color = ambient + diffuse + specular;

	// Position
	gl_Position = projectionMatrix *  modelViewMatrix * vec4(position, 1.0);
}