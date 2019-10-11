export default class LoginHandler {

    loginAsAdmin = (password) => new Promise((resolve,reject) => {
        let response = window.javaSQLBridge.connectToAdmin(password);
        if(JSON.parse(response).code === 1){
            resolve();
        }
        else{
            reject();
        }
    })

}