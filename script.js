var currentDemo;

slideshow.on('afterShowSlide', function(slide) {
  console.log(slide.properties);
  switch (slide.properties.demo) {
    case 'rotate-cube':
      currentDemo = rotateCube();
      break;
  }
});

slideshow.on('hideSlide', function(slide) {
  currentDemo && currentDemo.stop();
});

function rotateCube() {
  var renderer = new THREE.WebGLRenderer();
  var container = document.querySelector('#rotate-cube');
  console.log(container.offsetWidth);
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  var camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 1, 1000);
  camera.position.z = 300;

  var scene = new THREE.Scene();

  var geometry = new THREE.CubeGeometry(200, 200, 200);
  var material = new THREE.MeshLambertMaterial({
      color: 0xff0000
  });

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  var light = new THREE.PointLight(0xffffff);
  light.position = new THREE.Vector3(0,100,400);
  scene.add(light);

  var pause = false;

  function animate() {
    !pause && requestAnimationFrame(animate);

    mesh.rotation.x += .005;
    mesh.rotation.y += .005;

    renderer.render(scene, camera);
  }
  animate();
  return {
    stop: function() {
      pause = true;
      container.innerHTML = "";
    }
  };
}
