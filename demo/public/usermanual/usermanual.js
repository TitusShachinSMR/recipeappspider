const userId = window.location.pathname.split("/").pop();
document.getElementById("home").href = `/user/${userId}`;
document.getElementById("postlink").href = `/upload/${userId}`;
const opennav = document.getElementById("mySidenav");
const openbtn = document.querySelector(".openbtn");
const closebtn = document.querySelector(".closebtn");
openbtn.addEventListener("click", (e) => {
  opennav.style.width = "250px";
});
closebtn.addEventListener("click", (e) => {
  opennav.style.width = "0";
});
