console.log("credentialsCtrl.js")
/**
 * input error handling
 */
const wls = window.localStorage;


const handleCredentialsTextInput = (className, charNumb, startsWith) => {
  var input = document.querySelector(`.input-container.${className} input`)
  var error = document.querySelector(`.input-error.${className}`)
  var success = document.querySelector(".credentials-login-success");
  var result
    result = (
              (input.value.length === charNumb)
              &&
              (input.value.substring(0,2) === startsWith)
            ) 
      ? input.value 
      : 0

    if((input.value.length === charNumb)&&(input.value.substring(0,2) === startsWith)){
      result = input.value;
      error.classList.add("hidden")
      success.classList.add("visible")
      setTimeout(() => {
        success.classList.remove("visible")
      }, 7000);
      wls.setItem(className, result)
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
  button.addEventListener("click", ()=>{
    console.log("click")
    handleCredentialsTextInput("private-key", 52, "S1")
    handleCredentialsTextInput("public-key", 51, "P1")
    handleCredentialsTextInput("address", 51, "A1")

  })
}

/**
 * handle connexion to client
 */

const handleClientCreation = () => {
  console.log("client connexion")
  console.log(wls.getItem("private-key"))
  console.log(wls.getItem("public-key"))
  console.log(wls.getItem("address"))
  wls.clear()
}


/**
 * main
 */
//private key: length 52 starts with S1
//public key: length 51 starts with P1
//address: length 51 starts with  A1

handleLoginToClient()

handleClientCreation()