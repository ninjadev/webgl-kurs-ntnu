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

  /* Create a THREEJS WebGL renderer. This <blah blah> TODO: document better */
  var renderer = new THREE.WebGLRenderer();

  /* Create a THREEJS renderer. This <blah blah> TODO: document better */
  var camera = new THREE.PerspectiveCamera(view_angle, aspect, near, far);

  /* Create a THREEJS renderer. This <blah blah> TODO: document better */
  var scene = new THREE.Scene();

  /* Add the camera to scene. All THREE objects need to be added to a scene
   * to become visible for the renderer */
  scene.add(camera);

  /* Pull the camera back a little bit. Newly initialized cameras start at
   * (x: 0, y: 0, z: 0), so we need to pull the camera back so we can see
   * the center of the scene. */
  camera.position.z = 300;

  /* Set the size of the renderer */
  renderer.setSize(width, height);

  /* Attach the WebGL renderer to the html, so that it becomes visible in the
   * browser window */
  document.querySelector('body').appendChild(renderer.domElement);

  /* Kickstart the game loop */
  window.requestAnimationFrame(loop);
}
