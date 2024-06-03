// background.js

let scene, camera, renderer, particles, particleGeo, particleMaterial;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('background').appendChild(renderer.domElement);

    particleGeo = new THREE.BufferGeometry();
    const particleCount = 10000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = Math.random() * 2000 - 1000;
        positions[i * 3 + 1] = Math.random() * 2000 - 1000;
        positions[i * 3 + 2] = Math.random() * 2000 - 1000;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    particleMaterial = new THREE.PointsMaterial({
        color: 0xff6600,
        size: 5,
        map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png'),
        blending: THREE.AdditiveBlending,
        transparent: true
    });

    particles = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particles);

    animate();
}

function animate() {
    particles.rotation.y += 0.002;
    particles.rotation.z += 0.001;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
