console.log("publicApiCtrl.js")

let wls = window.localStorage;

// console.log(wls.getItem("massaClient")[''])
// console.log(Object.keys(wls.getItem("massaClient")))
// console.log(Object.values(wls.getItem("massaClient")))

let publicKey, secretKey, address, createdInThread;
publicKey = wls.getItem("publicKey");
secretKey = wls.getItem("secretKey");
address = wls.getItem("address");
createdInThread = wls.getItem("createdInThread");
console.log("publicKey");
console.log(publicKey);
console.log("secretKey");
console.log(secretKey);
console.log("address");
console.log(address);
console.log("createdInThread");
console.log(createdInThread);
