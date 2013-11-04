var scene;
var renderer;
var camera;
var ball;
var leftPaddle;
var rightPaddle;

function loop() {
  window.requestAnimationFrame(loop);
  renderer.render(scene, camera);

  if(KEYS[87]) { /* W */
    leftPaddle.speed.y = 3;
  } else if(KEYS[83]) { /* S */
    leftPaddle.speed.y = -3;
  } else {
    leftPaddle.speed.y = 0;
  }

  if(KEYS[38]) { /* up arrow */
    rightPaddle.speed.y = 3;
  } else if(KEYS[40]) { /* down arrow */
    rightPaddle.speed.y = -3;
  } else {
    rightPaddle.speed.y = 0;
  }

  leftPaddle.position.x += leftPaddle.speed.x;
  leftPaddle.position.y += leftPaddle.speed.y;
  leftPaddle.position.z += leftPaddle.speed.z;

  rightPaddle.position.x += rightPaddle.speed.x;
  rightPaddle.position.y += rightPaddle.speed.y;
  rightPaddle.position.z += rightPaddle.speed.z;

  ball.position.x += ball.speed.x;
  ball.position.y += ball.speed.y;
  ball.position.z += ball.speed.z;

  if(ball.position.x > rightPaddle.position.x &&
      ball.position.y < rightPaddle.position.y + rightPaddle.geometry.height / 2 &&
      ball.position.y > rightPaddle.position.y - rightPaddle.geometry.height / 2) {
    ball.position.x = rightPaddle.position.x;
    ball.speed.x = -ball.speed.x;
  }

  if(ball.position.x < leftPaddle.position.x &&
      ball.position.y < leftPaddle.position.y + leftPaddle.geometry.height / 2 &&
      ball.position.y > leftPaddle.position.y - leftPaddle.geometry.height / 2) {
    ball.position.x = leftPaddle.position.x;
    ball.speed.x = -ball.speed.x;
  }

  if(ball.position.x < -350){
    ball.position.x = 0;
    ball.position.y = 0;
  }

  if(ball.position.x > 350){
    ball.position.x = 0;
    ball.position.y = 0;
  }

  if(ball.position.y < -200) {
    ball.position.y = -200;
    ball.speed.y = -ball.speed.y;
  }

  if(ball.position.y > 200) {
    ball.position.y = 200;
    ball.speed.y = -ball.speed.y;
  }

  ball.rotation.x += 0.011;
  ball.rotation.y += 0.013;
  ball.rotation.z += 0.018;
}


function main() {
  setup();

  ball = new THREE.Mesh(
    new THREE.CubeGeometry(30, 30, 30),
    new THREE.MeshLambertMaterial({color: 0xff0000}));
  scene.add(ball);
  var xSpeed = Math.random() * 6;
  var ySpeed = 6 - xSpeed;
  ball.speed = {x: xSpeed, y: ySpeed, z: 0};

  leftPaddle = new THREE.Mesh(
    new THREE.CubeGeometry(10, 150, 60),
    new THREE.MeshLambertMaterial({color: 0x00ff00}));
  scene.add(leftPaddle);
  leftPaddle.position.x = -300;
  leftPaddle.speed = {x: 0, y: 0, z: 0};

  rightPaddle = new THREE.Mesh(
    new THREE.CubeGeometry(10, 150, 60),
    new THREE.MeshLambertMaterial({color: 0x0000ff}));
  scene.add(rightPaddle);
  rightPaddle.position.x = 300;
  rightPaddle.speed = {x: 0, y: 0, z: 0};
}


function setup(){
  /* define some configuration variables */
  var width = 1600;
  var height = 900;
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
  camera.position.z = 500;

  /* Set the size of the renderer */
  renderer.setSize(width, height);

    /* add subtle blue ambient lighting */
    var ambientLight = new THREE.AmbientLight(0x000044);
    scene.add(ambientLight);
      
    /* directional lighting */
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(100, 100, 100);
    scene.add(directionalLight);

  /* Attach the WebGL renderer to the html, so that it becomes visible in the
   * browser window */
  document.body.appendChild(renderer.domElement);

  /* Kickstart the game loop */
  window.requestAnimationFrame(loop);


  /* add key listeners */
  KEYS = [];
  for(var i=0;i<256;i++){
    KEYS[i] = false;
  }

  document.addEventListener("keydown",function(e){
    KEYS[e.keyCode] = true;
  });

  document.addEventListener("keyup",function(e){
    KEYS[e.keyCode] = false;
  });

  renderer.setClearColorHex(0x000000, 1);
}
