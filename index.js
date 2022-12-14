console.log(window.massa)

let wls = window.localStorage;

/** handle darkmode */
var checkbox = document.querySelector(".checkbox")
const container = document.querySelector('.container')
const a = document.querySelectorAll('a')
const navbarContainer = document.querySelector(".navbar-container");
const footerContainer = document.querySelector(".footer-container");
console.log(checkbox)
console.log(container)
checkbox.addEventListener('change', ()=>{
    container.classList.toggle('light');
    [...a].forEach(linka => {
      linka.classList.toggle('light');
    })
    navbarContainer.classList.toggle("light")
    footerContainer.classList.toggle("light")
})

/** logout after 15min and delete localStorage */
let inactivityTime = function() {
  let time;
  let timeToLogOut = 900000; //15min
  // let timeToLogOut = 1000; //1sec
  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;
  function logout() {
    alert("You are now logged out.")
    wls.clear();
  }
  function resetTimer() {
    clearTimeout(time);
    time = setTimeout(logout, timeToLogOut)
  }
};
window.onload = function() {
  inactivityTime();
}