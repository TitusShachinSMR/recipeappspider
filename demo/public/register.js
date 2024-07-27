document.addEventListener("DOMContentLoaded", () => {
  const words = document.querySelectorAll(".slider .word");
  let currentIndex = 0;

  function showNextWord() {
    words[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % words.length;
    words[currentIndex].classList.add("active");
  }

  // Initialize the first word as active
  words[currentIndex].classList.add("active");

  // Change word every 2 seconds
  setInterval(showNextWord, 1000);
  document
    .getElementById("registerform")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert("registered successfully");
        window.location.href = "/login";
      } else {
        alert(result.message || "Login failed");
      }
    });
});
