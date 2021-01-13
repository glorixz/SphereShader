varying vec2 texCoord;

void main() {
    texCoord = uv;
   
    // Multiply each vertex by the model-view matrix and the projection matrix to get final vertex position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
