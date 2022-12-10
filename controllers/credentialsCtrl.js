console.log("credentialsCtrl.js")

const handleCredentialsTextInput = (className, charNumb, startsWith) => {
  var input = document.querySelector(`.input-container.${className} input`)
  var error = document.querySelector(`.input-error.${className}`)
  var result
  input.addEventListener('input', (e)=>{
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
    }
    else{
      result = 0;
      error.classList.remove("hidden")
    }
    console.log("result "+className)
    console.log(result)
  })
}

//private key: length 52 starts with S1
handleCredentialsTextInput("private-key", 52, "S1")
//public key: length 51 starts with P1
handleCredentialsTextInput("public-key", 51, "P1")
//address: length 51 starts with  A1
handleCredentialsTextInput("address", 51, "A1")