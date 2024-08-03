
document.getElementById("home").href = `/user`;
document.getElementById("postlink").href = `/upload`;
const opennav = document.getElementById("mySidenav");
const openbtn = document.querySelector(".openbtn");
const closebtn = document.querySelector(".closebtn");
openbtn.addEventListener("click", (e) => {
  opennav.style.width = "250px";
});
closebtn.addEventListener("click", (e) => {
  opennav.style.width = "0";
});
