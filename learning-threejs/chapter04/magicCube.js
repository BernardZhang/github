const createCube = (size = 3) => {
    const faceColors = ['black', 'white', 'green', 'red', 'yellow', 'orange'];
    const faceMaterial = new THREE.MeshFaceMaterial(
        faceColors.reduce((acc, color) => {
            acc.push(new THREE.MeshBasicMaterial({ color }));
            // acc.push(new THREE.MeshBasicMaterial({ color }));
            return acc;
        }, [])
    );
    const cubeGeom = new THREE.BoxGeometry(size, size, size);

    return new THREE.Mesh(cubeGeom, faceMaterial);
};
const facesCubesIdxs = [
    // left
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    // right
    [18, 19, 20, 21, 22, 23, 24, 25, 26],
    // up
    [6, 7, 8, 15, 16, 17, 24, 25, 26],
    // bottom
    [0, 1, 2, 9, 10, 11, 18, 19, 20],
    // front
    [2, 5, 8, 11, 14, 17, 20, 23, 26],
    // back
    [0, 4, 7, 9, 13, 16, 18, 22, 25],
    
];

const createMagicCube = () => {
    const magicCube = new THREE.Mesh();
    let cube;
    let index = 0;

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                cube = createCube(2.9);
                // cube.position.set(x * 3 - 3, y * 3, z * 3 - 3);
                cube.position.set(x * 3, y * 3, z * 3);
                // cube.visible = facesCubesIdxs[4].includes(index);
                magicCube.add(cube);
                index++;
            }
        }
    }

    return magicCube;
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

camera.position.x = -40;
camera.position.y = 40;
camera.position.z = 40;
camera.lookAt(scene.position);

const axes = new THREE.AxisHelper(30);
scene.add(axes);

renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('root').appendChild(renderer.domElement);

const cube = createCube();

cube.position.set(-21, 0, 0);
// cube.visible = false;
scene.add(cube);

const magicCube = createMagicCube();

scene.add(magicCube);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 40, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'gray' })
);

plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -10;

scene.add(plane);


const rotateFace = (index, rotate) => {
    let axis = 'z';

    console.log('rotateFace', index);

    if ([0, 1].includes(index)) {
        axis = 'x';
    }

    if ([2, 3, 5].includes(index)) {
        axis = 'y';
    }

    console.log(axis)

    facesCubesIdxs[index].forEach((index, idx) => {
        let cube = magicCube.children[index];
        const r = 2.9;

        if (idx === 4) {
            cube.rotation[axis] += rotate;
        } else {
            const { x, y, z } = cube.position;

            // cube.position.set(
            //     x +  r * Math.sin(rotate),
            //     y * ( 1 - r * Math.cos(rotate)),
            //     z * ( 1 - r * Math.cos(rotate))
            // );
        }
        
    });
};
let face = 0;
let rotateCount = 0;
const animate = () => {
    renderer.render(scene, camera);
    // cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // magicCube.rotation.y += 0.005;
    // magicCube.rotation.x += 0.01;
    // magicCube.children[face % 6].rotation.z += 0.01;
    rotateFace(face % 6, 0.05 * Math.PI);
    rotateCount++;
    if (rotateCount >= 100) {
        console.log('rotateCount', rotateCount);
        rotateCount = 0;
        face++;
    }
    requestAnimationFrame(animate);
};

animate();
