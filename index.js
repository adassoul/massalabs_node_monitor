console.log(window.massa)

// console.log(_1)

// var checkbox = document.querySelector("input[name='checkbox']");
var checkbox = document.querySelector(".checkbox")
const container = document.querySelector('.container')
console.log(checkbox)
console.log(container)
checkbox.addEventListener('change', ()=>{
  container.classList.toggle('dark');
})

// const checkbox = document.getElementById('checkbox');

// checkbox.addEventListener('change', ()=>{
//   document.body.classList.toggle('dark');
// })

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

const handleContentContainersWithLink = (className) => {
  var link = document.querySelector(`.link.${className}>li>a`) 
  var contentContainers = document.querySelectorAll('.content-container')
  link.addEventListener("click", ()=>{
    contentContainers.forEach(container => {
      if (container.classList.contains(className)){
        container.classList.add("active")
      }
      else{
        container.classList.remove("active")
      }
    })
  }) 
}

handleContentContainersWithLink("credentials")
handleContentContainersWithLink("public-api")
handleContentContainersWithLink("private-api")
handleContentContainersWithLink("smart-contracts")
handleContentContainersWithLink("wallet")

//private key: length 52 starts with S1
handleCredentialsTextInput("private-key", 52, "S1")
//public key: length 51 starts with P1
handleCredentialsTextInput("public-key", 51, "P1")
//address: length 51 starts with  A1
handleCredentialsTextInput("address", 51, "A1")