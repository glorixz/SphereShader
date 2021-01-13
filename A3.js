/**
 * Sphere shader creating a simple 3D environment that demonstrates several different 
 * shading techniques, with movable light and changeable sphere/light colour. 
 * See README for controls. 
 */

// CREATE SCENE
var scene = new THREE.Scene();

// SETUP RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xcdcdcd);
document.body.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(25.0,(window.innerWidth/window.innerHeight), 0.1, 10000);
camera.position.set(0.0,15.0,40.0);
scene.add(camera);

// SETUP ORBIT CONTROL OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

// FLOOR 
var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4,4);

var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(30.0, 30.0), floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

//TEXTURES
var rocksTexture =  new THREE.ImageUtils.loadTexture('images/gravel-rocks-texture.jpg');

//BACKGROUND
var bkgTexture = new THREE.ImageUtils.loadTexture('images/wide_street_02_2k.jpg');
var bkgmaterial = new THREE.MeshBasicMaterial({map: bkgTexture, side: THREE.DoubleSide});

let bkgmesh = new THREE.Mesh(new THREE.SphereGeometry(200,60,40), bkgmaterial);
scene.add(bkgmesh);

//LIGHTING PROPERTIES
var lightColor = {type: "c", value: new THREE.Color(1.0,1.0,1.0)};
var ambientColor = {type: "c", value: new THREE.Color(0.4,0.4,0.4)};
var lightPosition = {type: "v3", value: new THREE.Vector3(0.49,0.79,0.49)};

//MATERIAL PROPERTIES 
var kAmbient = {type: "f", value: 0.4 };
var kDiffuse = {type: "f", value: 1.8 };
var kSpecular = {type: "f", value: 0.8 };
var shininess = {type: "f", value: 10.0 };

// SHADER MATERIALS
var gouraudMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_kAmbient: kAmbient,
    u_kDiffuse: kDiffuse,
    u_kSpecular: kSpecular,
    u_shininess: shininess,
    u_lightColor: lightColor,
    u_lightPosition: lightPosition,
    u_ambientColor: ambientColor,
  }
});
var phongMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_kAmbient: kAmbient,
    u_kDiffuse: kDiffuse,
    u_kSpecular: kSpecular,
    u_shininess: shininess,
    u_lightColor: lightColor,
    u_lightPosition: lightPosition,
    u_ambientColor: ambientColor,
  }
});
var blinnPhongMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_kAmbient: kAmbient,
    u_kDiffuse: kDiffuse,
    u_kSpecular: kSpecular,
    u_shininess: shininess,
    u_lightColor: lightColor,
    u_lightPosition: lightPosition,
    u_ambientColor: ambientColor,
  }
});
var textureMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_rocksTexture: {type: "t", value: rocksTexture},
  }
});

var toonMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_bkgTexture: {type: "t", value: bkgTexture},
    u_lightPosition: lightPosition,
    u_ambientColor: ambientColor,
    u_kAmbient: kAmbient,
    u_kDiffuse: kDiffuse,
    u_kSpecular: kSpecular,
    u_shininess: shininess,
    u_lightColor: lightColor,
  }
});

// LOAD SHADERS
var shaderFiles = [
  'glsl/gouraud.fs.glsl','glsl/gouraud.vs.glsl',
  'glsl/phong.vs.glsl','glsl/phong.fs.glsl',
  'glsl/blinnPhong.vs.glsl','glsl/blinnPhong.fs.glsl',
  'glsl/texture.fs.glsl','glsl/texture.vs.glsl',
  'glsl/sphere.fs.glsl','glsl/sphere.vs.glsl',
];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
 gouraudMaterial.vertexShader = shaders['glsl/gouraud.vs.glsl'];
 gouraudMaterial.fragmentShader = shaders['glsl/gouraud.fs.glsl'];
 phongMaterial.vertexShader = shaders['glsl/phong.vs.glsl'];
 phongMaterial.fragmentShader = shaders['glsl/phong.fs.glsl'];
 blinnPhongMaterial.vertexShader = shaders['glsl/blinnPhong.vs.glsl'];
 blinnPhongMaterial.fragmentShader = shaders['glsl/blinnPhong.fs.glsl'];
 textureMaterial.fragmentShader = shaders['glsl/texture.fs.glsl'];
 textureMaterial.vertexShader = shaders['glsl/texture.vs.glsl'];
 toonMaterial.fragmentShader = shaders['glsl/sphere.fs.glsl'];
 toonMaterial.vertexShader = shaders['glsl/sphere.vs.glsl'];
})

// CREATE SPHERES
var sphereRadius = 2.0;
var sphere = new THREE.SphereGeometry(sphereRadius, 16, 16);

var gouraudSphere = new THREE.Mesh(sphere, gouraudMaterial); 
gouraudSphere.position.set(-7.5, sphereRadius, 0);
scene.add(gouraudSphere);

var phongSphere = new THREE.Mesh(sphere, phongMaterial); 
phongSphere.position.set(-2.5, sphereRadius, 0);
scene.add(phongSphere);

var blinnPhongSphere = new THREE.Mesh(sphere, blinnPhongMaterial); 
blinnPhongSphere.position.set(2.5, sphereRadius, 0);
scene.add(blinnPhongSphere);

var textureSphere = new THREE.Mesh(sphere, textureMaterial); 
textureSphere.position.set(7.5, sphereRadius, 0);
scene.add(textureSphere);

var toonSphere = new THREE.Mesh(sphere, toonMaterial);
toonSphere.position.set(-2.5, sphereRadius, 10);
scene.add(toonSphere);

// LISTEN TO KEYBOARD
var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("L")) { // change light colour randomly
    lightColor.value = getRandomColour();
  } 
  if (keyboard.pressed("M")) { // change sphere colour randomly
    ambientColor.value = getRandomColour();
  }
  if (keyboard.pressed("R")) { // reset light and sphere colour
    lightColor.value = new THREE.Color(1.0, 1.0, 1.0);
    ambientColor.value = new THREE.Color(0.4,0.4,0.4);
    lightPosition.value = new THREE.Vector3(0.49,0.79,0.49);
  }
  if (keyboard.pressed("W")) {
    lightPosition.value.y += 0.1;
  } else if (keyboard.pressed("S")) {
    lightPosition.value.y -= 0.1;
  }
    
  if (keyboard.pressed("A")) {
    lightPosition.value.x -= 0.1;
  } else if (keyboard.pressed("D")) {
    lightPosition.value.x += 0.1;
  }

  if (keyboard.pressed("Q")) {
    lightPosition.value.z -= 0.1;
  } else if (keyboard.pressed("Z")) {
    lightPosition.value.z += 0.1;
  }
}

// https://www.kirupa.com/html5/generating_random_colors.htm
function getRandomNumber(low, high) {
  var r = Math.floor(Math.random() * (high - low + 1)) + low;
  return r;
}

// generate random colour of max saturation. 
function getRandomColour() {
  let hue = getRandomNumber(0,360);
  let saturation = 100;
  let lightness = getRandomNumber(50,100);
  let colour = HSLToRGB(hue, saturation, lightness);
  return colour;
}

// https://css-tricks.com/converting-color-spaces-in-javascript/
// input: h[0-360], s[0-100], l[0-100]
// output: THREE.Color(r,g,b) where r,g,b[0-1]
function HSLToRGB(h,s,l) {
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.round(r + m);
  g = Math.round(g + m);
  b = Math.round(b + m);

  return new THREE.Color(r,g,b);
}

// SETUP UPDATE CALL-BACK
var render = function() {
  checkKeyboard();
	textureMaterial.needsUpdate = true;
	phongMaterial.needsUpdate = true;
	blinnPhongMaterial.needsUpdate = true;
  gouraudMaterial.needsUpdate = true;
  toonMaterial.needsUpdate = true;
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

render();