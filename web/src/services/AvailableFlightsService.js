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

function getAvailableClassesForFlight(flightNumber, date, fromLocation) {

	return new Promise((resolve, reject) => {

		const result = JSON.parse(
			window.javaSQLBridge.getClassesForFlight(flightNumber, date, fromLocation),
		);
		if (result.code === 1) {

			resolve(result.data);

		} else {

			reject(result.msg);

		}

	});

}

function getAvailableFlightsFor(fromLocation, toLocation, date) {

	return new Promise((resolve, reject) => {

		const result = JSON.parse(
			window.javaSQLBridge.getAvailableFlights(date, fromLocation, toLocation),
		);
		if (result.code === 1) {

			resolve(result.data);

		} else {

			reject(result.msg);

		}

	})
		.then((toTripFlights) => {

			const classesPromises = [];
			for (let i = 0; i < toTripFlights.length; i++) {

				const flight = toTripFlights[i];
				classesPromises.push(
					getAvailableClassesForFlight(flight.nro_vuelo, date, fromLocation),
				);

			}
			return Promise.all(classesPromises)
				.then((allClasses) => {

					const availablesFlights = [];
					for (let i = 0; i < toTripFlights.length; i++) {

						availablesFlights.push({
							flight: toTripFlights[i],
							classes: allClasses[i],
						});

					}
					return availablesFlights;

				})

		})

}

function formatDate(date) {

	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

}

function formatTime(time) {

	const seconds = time.lastIndexOf(':');
	return time.substring(0, seconds);

}

// eslint-disable-next-line max-len
export {
	getAllLocations,
	getAvailableClassesForFlight,
	getAvailableFlightsFor,
	formatDate,
	formatTime,
};
