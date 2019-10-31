
function reserveOneWayTrip(departureFlight, passenger, employeeId){
    return new Promise((resolve, reject) => {
        const result = window.javaSQLBridge.makeOneWayReservation(
            departureFlight.number,
            departureFlight.date,
            departureFlight.class,
            passenger.type,
            passenger.id,
            employeeId
        );

        const parsedResult = JSON.parse(result);
        console.log(JSON.stringify(parsedResult));

        if(parsedResult.code === 1){
            resolve(parsedResult.data);
        } else {
            reject({code: parsedResult.code, msg: parsedResult.msg});
        }
    })
}

function reserveRoundTrip(departureFlight, returnFlight, passenger, employeeId){
    return new Promise((resolve, reject) => {
        const result = window.javaSQLBridge.makeTwoWayReservation(
            departureFlight.number, 
            departureFlight.date, 
            departureFlight.class,
            passenger.type, 
            passenger.id, 
            employeeId,
            returnFlight.number,
            returnFlight.date,
            returnFlight.class
        );

        const parsedResult = JSON.parse(result);
        console.log(JSON.stringify(parsedResult));

        if(parsedResult.code === 1){
            resolve(parsedResult.data);
        } else {
            reject({code: parsedResult.code, msg: parsedResult.msg});
        }
    })
}

export {
    reserveOneWayTrip,
    reserveRoundTrip,
}