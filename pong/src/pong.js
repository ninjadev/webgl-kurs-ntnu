function loop(){
  window.requestAnimationFrame(loop);
}

function main() {

  /* define some configuration variables */
  var width = 800;
  var height = 480;
  var view_angle = 45;
  var aspect = width / height;
  var near = 0.1;
  var far = 10000;

  /* Create a THREEJS WebGL renderer. */
  var renderer = new THREE.WebGLRenderer();

  /* Create a camera. This is the most useful camera type, acting like a real camera. */
  var camera = new THREE.PerspectiveCamera(view_angle, aspect, near, far);

  /* Create a scene.
   * All lights and objects have to be placed here. 
   * Use scene.add(object); */
  var scene = new THREE.Scene();

  /* Pull the camera back a little bit. Newly initialized cameras start at
   * (x: 0, y: 0, z: 0), so we need to pull the camera back so we can see
   * the center of the scene. */
  camera.position.z = 300;

  /* Set the size of the renderer */
  renderer.setSize(width, height);

  /* Attach the WebGL renderer to the html, so that it becomes visible in the
   * browser window */
  document.body.appendChild(renderer.domElement);

  /* Kickstart the game loop */
  window.requestAnimationFrame(loop);
}
