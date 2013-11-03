document.addEventListener('DOMContentLoaded', function() {
    var camera, scene, renderer;
    var geometry, material, mesh;

    init();
    animate();

    function init() {

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );

        scene = new THREE.Scene();

        geometry = new THREE.CubeGeometry( 200, 200, 200 );
        material = new THREE.MeshLambertMaterial({ color: 0xffa000 });

        mesh = new THREE.Mesh( geometry, material );
        mesh.position.z = -300;
        scene.add( mesh );

        scene.add(new THREE.DirectionalLight());
        scene.add(new THREE.AmbientLight(0x444444));

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( 400, 300);

        document.getElementById('three-1').appendChild( renderer.domElement );

    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render( scene, camera );
    }
});
