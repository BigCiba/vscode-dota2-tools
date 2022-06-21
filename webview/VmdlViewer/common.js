class Dota2GridHelper extends THREE.LineSegments {
	constructor(size = 200, divisions = 10) {
		const color1 = new THREE.Color(0xff0000);
		const color2 = new THREE.Color(0xffffff);
		const color3 = new THREE.Color(0x00ff00);
		const center = divisions / 2;
		const step = size / divisions;
		const halfSize = size / 2;
		const vertices = [],
			colors = [];

		for (let i = 0, j = 0, k = -halfSize; i <= divisions; i++, k += step) {
			const isCenter = i === center;
			if (isCenter) {
				vertices.push(-halfSize, 0, k, 0, 0, k, 0, 0, k, halfSize, 0, k);
				color2.toArray(colors, j);
				j += 3;
				color2.toArray(colors, j);
				j += 3;
				color3.toArray(colors, j);
				j += 3;
				color3.toArray(colors, j);
				j += 3;
				vertices.push(k, 0, -halfSize, k, 0, 0, k, 0, 0, k, 0, halfSize);
				color2.toArray(colors, j);
				j += 3;
				color2.toArray(colors, j);
				j += 3;
				color1.toArray(colors, j);
				j += 3;
				color1.toArray(colors, j);
				j += 3;
			} else {
				vertices.push(-halfSize, 0, k, halfSize, 0, k);
				vertices.push(k, 0, -halfSize, k, 0, halfSize);
				color2.toArray(colors, j);
				j += 3;
				color2.toArray(colors, j);
				j += 3;
				color2.toArray(colors, j);
				j += 3;
				color2.toArray(colors, j);
				j += 3;
			}
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
		const material = new THREE.LineBasicMaterial({
			vertexColors: true,
			toneMapped: false
		});
		super(geometry, material);
		this.type = 'GridHelper';
	}
}