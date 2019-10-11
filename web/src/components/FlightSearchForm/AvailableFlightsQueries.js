
function getAvailableFlightsFor(fromLocation, toLocation, date){
    console.log("ahi le pido a franco");
    return new Promise((resolve, reject) => {
        let result = JSON.parse(window.javaSQLBridge.getAvailableFlights(date, fromLocation, toLocation));
        console.log("Resultado de flights: " + JSON.stringify(result));
        if(result.code == 1){
            resolve(result.data);
        }
        else{
            reject(result.msg);
        }
    }).then((toTripFlights) => {
        let classesPromises = [];
        console.log("Holaaaa!");
        for(let i = 0; i < toTripFlights.length; i++){
            let flight = toTripFlights[i];
            classesPromises.push(getAvailableClassesForFlight(flight.nro_vuelo, date, fromLocation));
        }
        return Promise.all(classesPromises)
            .then((allClasses) => {
                let availablesFlights = [];
                for(let i = 0; i < toTripFlights.length; i++){
                    availablesFlights.push({
                        flight: toTripFlights[i],
                        classes: allClasses[i]
                    })
                }
                return availablesFlights;
            })
            .catch((err) => console.log("Fallo en pedir las clases" + err))
    }).catch(()=> console.log("Fallo en pedir los vuelos"))
}

function getAvailableClassesForFlight(flightNumber, date, fromLocation){
    return new Promise((resolve, reject) => {
        let result = JSON.parse(window.javaSQLBridge.getClassesForFlight(flightNumber, date, fromLocation));
        console.log("Resultado de clases: " + JSON.stringify(result));
        if(result.code == 1){
            resolve(result.data);
        }else{
            reject(result.msg);
        }
    })
}

function formatDate(date){
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}


export {getAvailableFlightsFor, getAvailableClassesForFlight, formatDate};