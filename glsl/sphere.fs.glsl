varying vec4 V_ViewPosition; // interpolated position in camera coords
varying vec4 V_Normal_VCS; // interpolated normal in camera coords
varying vec3 V_lightVector; // direction of light
uniform float u_kAmbient;
uniform float u_kDiffuse;
uniform float u_kSpecular;
uniform float u_shininess;
uniform vec3 u_lightColor;
uniform vec3 u_ambientColor;

// Toon shaded sphere
void main() {
	vec3 camSpaceNorm = normalize(vec3(V_Normal_VCS)); // normal in camera coords
	vec3 camSpacePos = vec3(V_ViewPosition); // position in camera coords

	vec4 ambient = u_kAmbient * vec4(u_ambientColor,1.0);
  
    // angle between light and normal
    // reduce the space to seven colours, with imtermediates snapping to a single shade. 
	float theta = floor(max(dot(V_lightVector, camSpaceNorm), 0.0) * 7.0) / 7.0; 

	vec4 diffuse = u_kDiffuse * vec4(u_lightColor, 1.0) * vec4(u_ambientColor, 1.0) * theta;
	
	// direction of the light's reflection
	vec3 reflectionVec = normalize(V_lightVector - 2.0*dot(V_lightVector, camSpaceNorm) * camSpaceNorm);
	// vector representing line-of-sight
	vec3 viewVec = normalize(camSpacePos);
    // reduce specular portion to five colours. 
	float specAmount = floor(pow(max(dot(reflectionVec, viewVec), 0.0), u_shininess)* 5.0)/5.0;
	vec4 specular = u_kSpecular * specAmount * vec4(u_lightColor, 1.0);

	gl_FragColor = ambient + diffuse + specular;
	
}