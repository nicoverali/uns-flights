function getAllLocations() {

	return new Promise((resolve, reject) => {

		const result = JSON.parse(window.javaSQLBridge.ubicaciones());
		if (result.code === 1) {

			resolve(result.data);

		} else {

			reject(result.msg);

		}

	});

}

export { getAllLocations };
export default getAllLocations;
