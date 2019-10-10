
function getAvailableFlightsFor(fromLocation, toLocation, date){
    return new Promise((resolve, reject) => {
        let result = JSON.parse(window.javaSQLBridge.getAvalaibleFlyes(date, fromLocation));
        if(result.code == 1){
            resolve(result.data);
        }
        else{
            reject(result.msg);
        }
    })
}

function getAvailableClassesForFlight(flightNumber, date, fromLocation){
    return new Promise((resolve, reject) => {
        let result = JSON.parse(window.javaSQLBridge.getClassesForFlight(flightNumber, date, fromLocation));
        if(result.code == 1){
            resolve(result.data);
        }else{
            reject(result.msg);
        }
    })
}


export {getAvailableFlightsFor, getAvailableClassesForFlight};