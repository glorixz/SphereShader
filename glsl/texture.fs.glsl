// Create shared variable. The value is given as the interpolation between normals computed in the vertex shader
varying vec2 texCoord;
uniform sampler2D u_rocksTexture;

void main() {

	// look up the color in the texture
  vec4 texColour = texture2D(u_rocksTexture, texCoord);

  // Set final rendered color according to the surface normal
  gl_FragColor = texture2D(u_rocksTexture, texCoord); 
}
