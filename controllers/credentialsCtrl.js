console.log("credentialsCtrl.js")

/** handle darkmode */
var checkbox = document.querySelector(".checkbox")
const credLabels = document.querySelectorAll('.input-container .input-label')
checkbox.addEventListener('change', ()=>{
    [...credLabels].forEach(label => {
      label.classList.toggle('light');
    })
})


/** massa connection */
//local, public or custom
//public passes tests
const typeOfNode = "public"; //local and custon have ERR-NET problem
const retry = false;

//common variables and Fns
//start common
const ClientFactory = window.massa.ClientFactory;
const DefaultProviderUrls = window.massa.DefaultProviderUrls;
const ProviderType = window.massa.ProviderType;

let baseAccount = {
  "address": "",
  "secretKey": "",
  "publicKey": "",
  "createdInThread": "",
}

let testnetClient, customClient;
let client;

/**
 * input error handling
 */
const wls = window.localStorage;
var success = document.querySelector(".credentials-login-success");
var fail = document.querySelector(".credentials-login-fail");

const handleCredentialsTextInput = (className, charNumb, startsWith) => {
  var input = document.querySelector(`.input-container.${className} input`)
  var error = document.querySelector(`.input-error.${className}`)
  var result
    if((input.value.length === charNumb)&&(input.value.substring(0,2) === startsWith)){
      result = input.value;
      error.classList.add("hidden")
      switch(className){
        case "public-key":
          baseAccount.publicKey = result;
          break;
        case "secret-key":
          baseAccount.secretKey = result;
          break;
        case "address":
          baseAccount.address = result;
          break;
        default:
          console.log("nothing has been saved in baseAccount");
      }


    }
    else{
      result = 0;
      error.classList.remove("hidden")
    }
    console.log("result "+className)
    console.log(result)
}

/**
 * handle login button
 */
const button = document.querySelector(".credentials-login-button button")
const handleLoginToClient = () => {
  button.addEventListener("click", async()=>{
    console.log("click")
    handleCredentialsTextInput("secret-key", 52, "S1")
    handleCredentialsTextInput("public-key", 51, "P1")
    handleCredentialsTextInput("address", 51, "A1")
    
    /**
     * create a massa client
     */
    console.log(baseAccount)


    switch (typeOfNode) {
    //local node
    case "local":
      console.log("this is local");
      console.log(baseAccount);
      console.log(typeof(baseAccount));
      testnetClient = await ClientFactory.createDefaultClient(
        DefaultProviderUrls.LOCALNET,
        retry,
        baseAccount
      );
      client = testnetClient;
      console.log("testnetClient");
      console.log(testnetClient);

      const nodeStatus = await testnetClient.publicApi().getNodeStatus();
      // console.log("nodeStatus")
      // console.log(nodeStatus)
      break;

    //public node
    case "public":
      console.log("this is public");
      // initialize a testnet client
      try{
        //connexion success to massaClient
        testnetClient = await ClientFactory.createDefaultClient(
          DefaultProviderUrls.TESTNET,
          retry,
          baseAccount
          );
        console.log(testnetClient)
        fail.classList.remove("visible")
        success.classList.add("visible")
        setTimeout(() => {
          success.classList.remove("visible")
        }, 7000);
        console.log("try");
        console.log(baseAccount)
        wls.setItem("secretKey", baseAccount.secretKey)
        wls.setItem("publicKey", baseAccount.publicKey)
        wls.setItem("address", baseAccount.address)
        wls.setItem("createdInThread", baseAccount.createdInThread)
      }
      catch(error){
        //connexion failed to massaClient
        success.classList.remove("visible")
        fail.classList.add("visible")
        setTimeout(() => {
          fail.classList.remove("visible")
        }, 7000);
        console.log(error)
      }
      client = testnetClient;
      console.log("testnetClient");
      console.log(testnetClient);
      break;

    //custom node
    case "custom":
      console.log("this is custom");
      const providers = [
        {
          url: "http://127.0.0.1:33035",
          type: ProviderType.PUBLIC,
        },
        {
          url: "http://127.0.0.1:33034",
          type: ProviderType.PRIVATE,
        },
      ];
      customClient = await ClientFactory.createCustomClient(
        providers,
        retry,
        baseAccount
      );
      client = customClient;
      console.log("customClient");
      console.log(customClient);
      break;

    default:
      console.log("please choose a correct node type.");
    }
    console.log(client);
  })
}

handleLoginToClient()
