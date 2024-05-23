let cube = document.getElementById("cube-img");
let welcome = document.getElementById("welcome");

window.addEventListener("scroll", () => {
  let value = window.scrollY;

  welcome.style.marginTop = value * 2.5 + "px";
  cube.style.marginTop = value * 3 + "px";
});

console.log("rofl");
