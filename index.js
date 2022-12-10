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
