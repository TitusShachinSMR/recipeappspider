const slides = document.querySelectorAll(".slides img"); //selecting the slide images
let slideIndex = 0; //intialising the slide index
let intervalId = null; //intialising the intervalId to null
window.addEventListener("load", () => {
  window.speechSynthesis.cancel();
});
document.addEventListener("DOMContentLoaded", initializeSlider);
//the function for creating slider in the page
function initializeSlider() {
  if (slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(nextSlide, 3000);
  }
}

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  slides[slideIndex].classList.add("displaySlide");
}
//function for prvious slide , that is decreasingthe index of the slide and clearing animation interval and showing the slide
function prevSlide() {
  clearInterval(intervalId);
  slideIndex--;
  showSlide(slideIndex);
}
//function for next slide, that is increasing the index of the slide and clearing animation interval and showing the slide
function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (response.ok) {
    localStorage.setItem("userid", result.userId);
    localStorage.setItem("username", result.username);
    window.location.href = "/user";
  } else {
    alert(result.message || "Login failed");
  }
});
