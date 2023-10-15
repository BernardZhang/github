class MagicCube {
    faceNames = ['F', 'B', 'L', 'R', 'U', 'D']

    constructor(dimension = 3, size = 1, scene) {
        this.dimension = dimension;
        this.size = size;
        this.cubes = [];
        this.mesh = new THREE.Mesh();
        this.scene = scene;
        this.createCubes(dimension, size);
    }

    createCubes(dimension, size) {
        for (let x = 0; x < dimension; x++) {
            for (let y = 0; y < dimension; y++) {
                for (let z = 0; z < dimension; z++) {
                    const cube = this.createCube(size);
                    cube.position.set((x - 1) * size, (y - 1) * size, (z - 1) * size);
                    this.cubes.push(cube);
                    this.mesh.add(cube);
                }
            }
        }

        this.scene.add(this.mesh)

        return this.cubes;
    }

    createCube(size) {
        const faceColors = ['black', 'white', 'green', 'red', 'yellow', 'orange'];
        const faceMaterial = new THREE.MeshFaceMaterial(
            faceColors.reduce((acc, color) => [
                ...acc,
                new THREE.MeshBasicMaterial({ color })
            ], [])
        );
        const cubeGeom = new THREE.BoxGeometry(size * .98, size * .98, size * .98);

        return new THREE.Mesh(cubeGeom, faceMaterial);
    }

    animation(value, iterationCount = 100, callback, complete) {
        let current = 0;
        const animate = () => {
            if (current === iterationCount) {
                current = 0;
                complete?.();
            } else {
                current++;
                callback(value / iterationCount);
                requestAnimationFrame(animate);
            }
        };

        animate()
    }

    rotate(angle, axis) {
        const allCubesGroup = new THREE.Group();

        this.cubes.forEach(cube => {
            this.attach(cube, this.mesh, allCubesGroup)
        })
        this.scene.add(allCubesGroup)

        this.animation(angle, 100, (delta) => {
            allCubesGroup.rotation[axis] += delta
        }, () => {
            this.cubes.forEach(cube => {
                this.detach(cube, allCubesGroup, this.mesh)
            })
        })
    }

    rotateFace(faceName, angle) {
        const faceCubes = this.getFaceCubes(faceName);
        const faceCubesGroup = new THREE.Group()
        const axis = this.getAxisByFaceName(faceName)

        faceCubes.forEach(cube => {
            // faceCubesGroup.add(cube)
            this.attach(cube, this.mesh, faceCubesGroup)
        })

        this.scene.add(faceCubesGroup);

        this.animation(angle, 100, (delta) => {
            faceCubesGroup.rotation[axis] += delta
        }, () => {
            faceCubes.forEach(cube => {
                this.detach(cube, faceCubesGroup, this.mesh);
            })
        })
    }

    getAxisByFaceName(faceName) {
        return {
            F: 'z',
            B: 'z',
            L: 'x',
            R: 'x',
            U: 'y',
            D: 'y'
        }[faceName]
    }

    getFaceCubes(faceName) {
        return this.cubes.filter(cube =>
            cube.position[this.getAxisByFaceName(faceName)] === this.size * (['B', 'L', 'D'].includes(faceName) ? -1 : 1)
        )
    }

    detach(child, parent, scene) {
        child.applyMatrix(parent.matrixWorld);
        parent.remove(child);
        scene.add(child);
    }

    attach(child, scene, parent) {
        var matrixWorldInverse = new THREE.Matrix4();
        matrixWorldInverse.getInverse(parent.matrixWorld);
        child.applyMatrix(matrixWorldInverse);

        scene.remove(child);
        parent.add(child);
    }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

camera.position.x = -40;
camera.position.y = 40;
camera.position.z = 40;
camera.lookAt(scene.position);

const orbitControls = new THREE.OrbitControls(camera);
orbitControls.autoRotate = false;
const clock = new THREE.Clock();

const axes = new THREE.AxisHelper(30);
scene.add(axes);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 40, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'gray' })
);

plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -10;

scene.add(plane);

const magicCube = new MagicCube(3, 3, scene);

renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('root').appendChild(renderer.domElement);

render()

renderUIActions({
    faceHandler: rotateFaceByKey,
    magicCubeHandler: rotateMagicCube
})

function render() {
    orbitControls.update(clock.getDelta());
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}



function rotateFaceByKey(faceKey, direction = 1) {
    magicCube.rotateFace(faceKey, -0.5 * Math.PI * direction)
}

function rotateMagicCube(axis, direction = 1) {
    magicCube.rotate(Math.PI * 0.5 * direction, axis)
}