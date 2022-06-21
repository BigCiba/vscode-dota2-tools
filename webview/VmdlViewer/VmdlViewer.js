// import * as THREE from "../common/three";
const vscode = acquireVsCodeApi();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x3c3c3c);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

// 加个方块
// const geometry = new THREE.BoxGeometry(50, 50, 50);
// const material = new THREE.MeshLambertMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// 网格
const gridHelper = new Dota2GridHelper(200, 10);
scene.add(gridHelper);

// 坐标
// const axes = new THREE.AxesHelper(100);
// scene.add(axes);


// 点光源
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(400, 200, 300);
scene.add(pointLight);

// 环境光
const ambientLight = new THREE.AmbientLight(0x444444);
scene.add(ambientLight);


camera.position.set(200, 300, 200);
camera.lookAt(scene.position);

const tgaLoader = new THREE.TGALoader();

function animate() {
	// requestAnimationFrame(animate);

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	render.render(scene, camera);
};

animate();
const controls = new THREE.OrbitControls(camera, render.domElement);
controls.addEventListener("change", animate);

const transformControl = new THREE.TransformControls(camera, render.domElement);
transformControl.addEventListener('change', render);
transformControl.addEventListener('dragging-changed', function (event) {
	controls.enabled = !event.value;
});
scene.add(transformControl);


window.addEventListener('message', event => {
	const message = event.data; // The json data that the extension sent
	switch (message.type) {
		case 'update':
			const vmalData = message.vmalData;
			updateContent(vmalData);
			vscode.setState({ vmalData });
			return;
	}
});

function updateContent(vmalData) {
	const loader = new THREE.FBXLoader();
	const material = new THREE.MeshPhongMaterial({
		map: tgaLoader.load(vmalData.material),
		normalMap: tgaLoader.load(vmalData.normal),
		specularMap: tgaLoader.load(vmalData.specular),
		color: tgaLoader.load(vmalData.diffuse),
	});
	for (const mesh of vmalData.meshList) {
		loader.load(mesh, file => {

			scene.add(file);
			file.traverse(function (child) {
				try {
					// if (child instanceof THREE.SkinnedMesh) {
					// 	child.material.wireframe = true;
					// }
					if (child.isMesh) {
						child.material = material;
						child.castShadow = true;
						child.receiveShadow = true;
					}
					// console.log(child);
					animate();
				}
				catch (e) {
					console.log(e);
				}
			});
			animate();
		});
	}
}

// 加载状态
const state = vscode.getState();
if (state) {
	updateContent(state.vmalData);
}