function loginAsAdmin(password) {

  return new Promise((resolve, reject) => {

    const response = window.javaSQLBridge.connectToAdmin(password);
    if (JSON.parse(response).code === 1) {

      resolve();

    } else {

      reject();

    }

  });

}

function loginAsEmployee(empId, password) {

  return new Promise((resolve, reject) => {

    const response = JSON.parse(window.javaSQLBridge.connectToEmployee(empId, password));
    if (response.code == 1) {

      resolve();

    } else {

      reject();

    }

  });

}

export { loginAsAdmin, loginAsEmployee };
