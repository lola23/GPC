// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
    // Make the loop animated
    animate: true,
    // Get a WebGL canvas rather than 2D
    context: "webgl",
    scaleToView: true
};

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;


function toRad(degrees) {
    const pi = Math.PI;
    return degrees * (pi/180);
}

const solar_system = ({ context }) => {
    // RENDERER
    const renderer = new THREE.WebGLRenderer({
        canvas: context.canvas,
        alpha: true,
    });

    // CAMERA
    const camera = new THREE.PerspectiveCamera(100, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
    camera.position.set(30, 5, 35);

    // ORBIT CONTROLS
    const controls = new THREE.OrbitControls(camera, context.canvas);
    controls.target.set(30, 0, 0);

    /*
     * TEXTURES
     */
    const loader = new THREE.TextureLoader();
    const starsTexture = loader.load("assets/stars.jpg");
    const sunTexture = loader.load("assets/sun.jpg");
    const mercuryTexture = loader.load("assets/mercury.jpg");
    const venusTexture = loader.load("assets/venus.jpg");
    const earthTexture = loader.load("assets/earth.jpg");
    const marsTexture = loader.load("assets/mars.jpg");
    const jupiterTexture = loader.load("assets/jupiter.jpg");
    const saturnTexture = loader.load("assets/saturn.jpg");
    const uranusTexture = loader.load("assets/uranus.jpg");
    const neptuneTexture = loader.load("assets/neptune.jpg");
    const plutoTexture = loader.load("assets/pluto.jpeg");

    /*
     * MATERIALS
     */
    const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture });
    const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });
    const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
    const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture});
    const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
    const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });
    const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture });
    const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture });
    const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture });
    const plutoMaterial = new THREE.MeshStandardMaterial({ map: plutoTexture });

    /*
     * MESH
     */
    const scene = new THREE.Scene();
    /*
     * SKYBOX
     */
    const loaderCube = new THREE.CubeTextureLoader();
    const texture = loaderCube.load([
        'assets/skybox/three/front.png',
        'assets/skybox/three/back.png',
        'assets/skybox/three/top.png',
        'assets/skybox/three/bottom.png',
        'assets/skybox/three/left.png',
        'assets/skybox/three/right.png',
    ]);
    scene.background = texture;
    const geometry = new THREE.SphereGeometry(1, 32, 16);

    const sunMesh = new THREE.Mesh(geometry, sunMaterial);
    sunMesh.position.set(0, 0, 0);
    sunMesh.scale.setScalar(10);
    scene.add(sunMesh);

    const mercuryOrbitMaterial = new THREE.LineBasicMaterial( { color : 0xf2d8d4 } );
    createOrbit(scene, mercuryOrbitMaterial, 25, 25, toRad(7.01));

    const mercuryGroup = new THREE.Group();
    const mercuryMesh = new THREE.Mesh(geometry, mercuryMaterial);
    createPlanet(scene, mercuryMesh, mercuryGroup, 25, 0.8);

    const venusOrbitMaterial = new THREE.LineBasicMaterial( { color : 0xe6aea8 } );
    createOrbit(scene, venusOrbitMaterial, 28,  28, toRad(3.39));
    const venusGroup = new THREE.Group();
    const venusMesh = new THREE.Mesh(geometry, venusMaterial);
    createPlanet(scene, venusMesh, venusGroup, 28, 0.9);

    const earthOrbitMaterial = new THREE.LineBasicMaterial( { color : 0xffcfa9 } );
    createOrbit(scene, earthOrbitMaterial, 31,  31, 0);
    const earthGroup = new THREE.Group();
    const earthMesh = new THREE.Mesh(geometry, earthMaterial);
    createPlanet(scene, earthMesh, earthGroup, 31, 1);

    const marsOrbitMaterial = new THREE.LineBasicMaterial( { color : 0xf9a387 } );
    createOrbit(scene, marsOrbitMaterial, 34,  34, toRad(1.85));
    const marsGroup = new THREE.Group();
    const marsMesh = new THREE.Mesh(geometry, marsMaterial);
    createPlanet(scene, marsMesh, marsGroup, 34, 0.8);

    const jupiterOrbitMaterial = new THREE.LineBasicMaterial( { color : 0xff8578 } );
    createOrbit(scene, jupiterOrbitMaterial, 42,  42, toRad(1.31));
    const jupiterGroup = new THREE.Group();
    const jupiterMesh = new THREE.Mesh(geometry, jupiterMaterial);
    createPlanet(scene, jupiterMesh, jupiterGroup, 42, 3.5);

    const saturnOrbitMaterial = new THREE.LineBasicMaterial( { color : 0xda6458 } );
    createOrbit(scene, saturnOrbitMaterial, 50,  50, toRad(2.49));
    const saturnGroup = new THREE.Group();
    const saturnMesh = new THREE.Mesh(geometry, saturnMaterial);
    createPlanet(scene, saturnMesh, saturnGroup, 50, 2.9);

    const uranusOrbitMaterial = new THREE.LineBasicMaterial( { color : 0xa62d21 } );
    createOrbit(scene, uranusOrbitMaterial, 56,  56, toRad(0.77));
    const uranusGroup = new THREE.Group();
    const uranusMesh = new THREE.Mesh(geometry, uranusMaterial);
    createPlanet(scene, uranusMesh, uranusGroup, 56, 1.7);

    const neptuneOrbitMaterial = new THREE.LineBasicMaterial( { color : 0xa62d21 } );
    createOrbit(scene, neptuneOrbitMaterial, 60,  60, toRad(1.77));
    const neptuneGroup = new THREE.Group();
    const neptuneMesh = new THREE.Mesh(geometry, neptuneMaterial);
    createPlanet(scene, neptuneMesh, neptuneGroup, 60, 1.65);

    const plutoOrbitMaterial = new THREE.LineBasicMaterial( { color : 0x871d12 } );
    createOrbit(scene, plutoOrbitMaterial, 64,  64, toRad(17.14));
    const plutoGroup = new THREE.Group();
    const plutoMesh = new THREE.Mesh(geometry, plutoMaterial);
    createPlanet(scene, plutoMesh, plutoGroup, 64, 0.5);

    /*
     * LIGHTING
     */
    const light = new THREE.PointLight("white", 1.25);
    light.position.set(0, 0, 0);
    scene.add(light);

    // illuminate the sun
    createSpotlights(scene);

    // draw each frame
    return {

        render({ time }) {

            const ORP = time / 10;      // Earth's orbital rotation period
            const ARP = ORP * 365;      // Rotation around axis

            // sunMesh.rotation.y = time;

            mercuryGroup.rotation.y = ORP * 1.59;   // rotate around the sun
            mercuryGroup.rotation.x = toRad(7.01);
            mercuryMesh.rotation.y = ARP * 58.65;   // rotate planet

            venusGroup.rotation.y = ORP * 1.18;
            venusGroup.rotation.x = toRad(3.39);
            venusMesh.rotation.y = ARP * -243.02;

            earthGroup.rotation.y = ORP;
            earthGroup.rotation.x = toRad(0);
            earthMesh.rotation.y = ARP;

            marsGroup.rotation.y = ORP * 0.8;
            marsGroup.rotation.x = toRad(1.85);
            marsMesh.rotation.y = ARP * 1.03;

            jupiterGroup.rotation.y = ORP * 0.43;
            jupiterGroup.rotation.x = toRad(1.31);
            jupiterMesh.rotation.y = ARP * 0.41;

            saturnGroup.rotation.y = ORP * 0.325;
            saturnGroup.rotation.x = toRad(2.49);
            saturnMesh.rotation.y = ARP * 0.45;

            uranusGroup.rotation.y = ORP * 0.22;
            uranusGroup.rotation.x = toRad(0.77);
            uranusMesh.rotation.y = ARP * -0.72;

            neptuneGroup.rotation.y = ORP * 0.18;
            neptuneGroup.rotation.x = toRad(1.77);
            neptuneMesh.rotation.y = ARP * 0.67;

            plutoGroup.rotation.y = ORP * 0.15;
            plutoGroup.rotation.x = toRad(17.14);
            plutoMesh.rotation.y = ARP * 6.41;

            controls.update();
            renderer.render(scene, camera);
        },
        // Dispose of events & renderer for cleaner hot-reloading
        unload() {
            controls.dispose();
            renderer.dispose();
        }
    };
};

function createPlanet(scene, mesh, group, x, scale) {
    mesh.position.set(x, 0, 0);
    mesh.scale.setScalar(scale);
    group.add(mesh);
    scene.add(group);
}

function createOrbit(scene, material, xRadius, yRadius, angle) {
    const curve = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        xRadius, yRadius,           // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                // aRotation
    );
    const points = curve.getPoints( 200 );
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints( points );

    const orbit = new THREE.Line( orbitGeometry, material );
    orbit.rotateX(1.57 + angle);
    scene.add(orbit);

}

function createSpotlights(scene) {
    const color = 0xFFFFFF;
    const intensity = 5;
    const distance = 25;
    const angle = Math.PI / 7;

    new Array(6).fill('').forEach((item, i) => {
        const spotlight = new THREE.SpotLight(color, intensity, distance, angle);
        const value = i % 2 === 0 ? 25 : -25;

        spotlight.position.set(
            i < 2 ? value : 0,
            i >= 2 && i < 4 ? value : 0,
            i >= 4 ? value : 0
        );
        scene.add( spotlight );
    });
}

canvasSketch(solar_system, settings);
