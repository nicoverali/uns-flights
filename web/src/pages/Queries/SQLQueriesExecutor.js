function executeSelect(query) {

  return new Promise((resolve) => {

    const result = JSON.parse(window.javaSQLBridge.executeSelect(query));
    resolve({
      msg: result.msg,
      data: result.data,
    });

  });

}

function executeUpdate(query) {

  return new Promise((resolve) => {

    const result = JSON.parse(window.javaSQLBridge.executeUpdate(query));
    resolve({
      msg: result.msg,
      data: result.data,
    });

  });

}

function execute(query) {

  return new Promise((resolve) => {

    const result = JSON.parse(window.javaSQLBridge.execute(query));
    resolve({
      msg: result.msg,
      data: result.data,
    });

  });

}

export { executeSelect, executeUpdate, execute };
