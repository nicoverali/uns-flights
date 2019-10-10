

function getAllLocations(){
    return new Promise((resolve, reject)=>{
        window.javaSQLBridge.connectToAdmin("admin");
        let result = JSON.parse(window.javaSQLBridge.ubicaciones());
        if(result.code == 1){ 
            resolve(result.data);
        }
        else{
            reject(result.msg);
        }
    })
}


export {getAllLocations};