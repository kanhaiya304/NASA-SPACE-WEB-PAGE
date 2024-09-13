// Orrery setup using Three.js
const canvas = document.getElementById('orreryCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });

// Resize renderer to fit full screen
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a starfield background
function createStarfield() {
    const starCount = 1000;
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

    const starVertices = [];
    for (let i = 0; i < starCount; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

// Create planets
function createPlanet(radius, color, distance) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const planet = new THREE.Mesh(geometry, material);

    planet.position.x = distance;
    scene.add(planet);

    return planet;
}

// Add the Sun
const sun = createPlanet(5, 0xffff00, 0);

// Add planets (example: Earth and Mars)
const earth = createPlanet(1, 0x0000ff, 15);
const mars = createPlanet(0.7, 0xff0000, 25);

// Create orbit function for the planets
function animatePlanet(planet, distance, speed) {
    const time = Date.now() * speed;
    planet.position.x = Math.cos(time) * distance;
    planet.position.z = Math.sin(time) * distance;
}

// Add animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate planets in their orbits
    animatePlanet(earth, 15, 0.001);
    animatePlanet(mars, 25, 0.0007);
    
    renderer.render(scene, camera);
}

// Add some lighting (optional)
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 0); // Light from the center (Sun)
scene.add(light);

// Set up camera position
camera.position.z = 50;

// Create starfield and animate
createStarfield();
animate();