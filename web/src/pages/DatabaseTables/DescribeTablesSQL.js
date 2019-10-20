function describeTable(tableName) {

	return new Promise((resolve) => {

		const result = JSON.parse(window.javaSQLBridge.describeTable(tableName));
		if (result.code === 1) {

			resolve(result.data);

		}

	});

}

function getAllTables() {

	return new Promise((resolve) => {

		const result = JSON.parse(window.javaSQLBridge.showTables());
		resolve(result.data);

	});

}

export { describeTable, getAllTables };
