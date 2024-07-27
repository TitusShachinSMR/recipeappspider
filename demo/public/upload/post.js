document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("load", () => {
    window.speechSynthesis.cancel();
  });
  document.getElementById("home").href = `/user`;
  document.getElementById("usermanual").href = `/usermanual`;
  const userId = localStorage.getItem("userid");
  const username = localStorage.getItem("username");
  document.querySelector(".username").textContent = username;
  const opennav = document.getElementById("mySidenav");
  const openbtn = document.querySelector(".openbtn");
  const closebtn = document.querySelector(".closebtn");
  openbtn.addEventListener("click", (e) => {
    opennav.style.width = "250px";
  });
  closebtn.addEventListener("click", (e) => {
    opennav.style.width = "0";
  });
  // for choosing the recipe informations and showing it to the users
  document.querySelectorAll(".option").forEach((object) => {
    object.addEventListener("click", (e) => {
      document.querySelector(".chosecuisine").textContent = e.target.innerText;
      document.querySelector(".options-container").classList.toggle("active");
    });
  });
  document.querySelectorAll(".time").forEach((object) => {
    object.addEventListener("click", (e) => {
      document.querySelector(".chosetime").textContent = e.target.innerText;
      document
        .querySelector(".preparationtimecontainer")
        .classList.toggle("active");
    });
  });
  document.querySelectorAll(".diet").forEach((object) => {
    object.addEventListener("click", (e) => {
      document.querySelector(".chosediet").textContent = e.target.innerText;
      document.querySelector(".dietcontainer").classList.toggle("active");
    });
  });

  // for uploading the image and showing the preview
  document
    .getElementById("fileUpload")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];
      const previewContainer = document.getElementById("imagePreview");
      const previewImage = document.getElementById("imagePreviewImg");
      const previewText = document.querySelector(".image-preview-text");

      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          previewImage.setAttribute("src", e.target.result);
          previewImage.style.display = "block";
          previewText.style.display = "none";
        };
        reader.readAsDataURL(file);
      } else {
        previewImage.style.display = "none";
        previewText.style.display = null;
        previewImage.setAttribute("src", "");
      }
    });
  // Making the cuisines div interactive
  const cuisineDiv = document.querySelector(".cuisine");
  const optionsContainer = document.querySelector(".options-container");

  cuisineDiv.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
  });

  // Making the cuisine clicked to get into the button
  const cuisine = [];
  const cuisinelist = document.querySelectorAll("input[name='cuisine']");

  // Making the preparation time container interactive
  let timefinalised;
  const prepartiontimediv = document.querySelector(".preparationtime");
  const timeoptioncontainer = document.querySelector(
    ".preparationtimecontainer"
  );
  prepartiontimediv.addEventListener("click", () => {
    timeoptioncontainer.classList.toggle("active");
  });
  const dietaryrestriction = document.querySelector(".dietaryrestriction");
  const dietcontainer = document.querySelector(".dietcontainer");
  dietaryrestriction.addEventListener("click", () => {
    dietcontainer.classList.toggle("active");
  });
  // for making the search container active
  document
    .querySelector(".ingredientssearch")
    .addEventListener("input", function () {
      const query = this.value;
      fetch(`/search?q=${query}`)
        .then((response) => response.json())
        .then((data) => {
          const resultsContainer = document.getElementById("search-results");
          resultsContainer.innerHTML = "";
          data.slice(0, 5).forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item.ingredient;
            li.classList.add("listed");
            resultsContainer.appendChild(li);
          });

          // Add click event listeners to the newly created list items
          document.querySelectorAll(".listed").forEach((li) => {
            li.addEventListener("click", (event) => {
              const item = document.createElement("div");
              item.classList.add("postingredients");
              item.textContent = li.textContent; // Add ingredient name to the selected item
              document.querySelector(".selectedingredients").appendChild(item);
              doubleclick();
            });
          });
        })
        .catch((error) => console.error("Error:", error));
    });

  function doubleclick() {
    document.querySelectorAll(".postingredients").forEach((div) => {
      div.addEventListener("dblclick", function () {
        this.remove();
      });
    });
  }

  document.querySelector(".submitfinal").addEventListener("click", (e) => {
    const imageInput = document.querySelector("#fileUpload");
    const recipeName = document.querySelector(".recipename").value.trim();
    const cuisine = document.querySelector(".chosecuisine").textContent;
    const preparationTime = document.querySelector(".chosetime").textContent;
    const dietType = document.querySelector(".chosediet").textContent;
    const steps = document.getElementById("steps").value.trim();
    const ingredientElements = document.querySelectorAll(".postingredients");
    const ingredientarray = [
      ...new Set(
        Array.from(ingredientElements).map((ingredient) =>
          ingredient.textContent.trim()
        )
      ),
    ];
    console.log(ingredientarray);
    console.log(dietType);
    console.log(preparationTime);
    console.log(cuisine);
    console.log(recipeName);

    const formData = new FormData();
    formData.append("recipeName", recipeName);
    formData.append("author_id", userId);
    formData.append("cuisine", cuisine);
    formData.append("preparationTime", preparationTime);
    formData.append("dietType", dietType);
    formData.append("steps", steps);
    // Create a string in the format "('Ingredient1','Ingredient2','Ingredient3')"

    // Append this formatted string to FormData
    formData.append("ingredients", ingredientarray);

    if (imageInput.files[0]) {
      formData.append("image", imageInput.files[0]);
    }

    fetch("/submit-recipe", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
