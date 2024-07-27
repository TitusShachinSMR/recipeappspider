document.addEventListener("DOMContentLoaded", () => {
  let ingredientInstant;
  let rating;
  let recipeid;
  const savedrecipe = [];
  // for getting the user id
  const userId = localStorage.getItem("userid");
  const username = localStorage.getItem("username");
  //for creating link for upload page using user id
  document.getElementById("postlink").href = `/upload`;
  document.getElementById("usermanual").href = `/usermanual`;
  document.querySelector(".username").textContent = username;
  // making the side nav button interractive
  const opennav = document.getElementById("mySidenav");
  const openbtn = document.querySelector(".openbtn");
  const closebtn = document.querySelector(".closebtn");
  openbtn.addEventListener("click", (e) => {
    opennav.style.width = "250px";
  });
  closebtn.addEventListener("click", (e) => {
    opennav.style.width = "0";
  });
  const ingredienttype = document.querySelectorAll(".ingtype");
  // Fetching type of ingredients data
  //based on the category of the the ingredients chose
  ingredienttype.forEach((button) => {
    button.addEventListener("click", (event) => {
      const type = event.target.textContent;
      document.querySelector(".addtocart").style.display = "block";
      fetch("/ingredients/" + type)
        .then((response) => response.json())
        .then((data) => {
          const checklist = document.querySelector(".ingredientslist");
          // Clear existing content before appending new checkboxes
          checklist.innerHTML = "";

          data.forEach((ingredient) => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = ingredient.ingredient;
            checkbox.name = "ingredient";
            checkbox.value = ingredient.ingredient;
            checkbox.classList.add("checkbox");
            checkbox.style.width = "100px";
            checkbox.style.height = "30px";
            const label = document.createElement("label");
            label.style.fontWeight = "bold";
            label.htmlFor = ingredient.ingredient;
            label.textContent = ingredient.ingredient;

            const br = document.createElement("br");
            checklist.style.maxHeight = "400px";
            checklist.style.overflowY = "auto";
            checklist.style.color = "white";
            checklist.style.backgroundColor = "rgba(0, 0, 0, 0.849)";
            checklist.appendChild(checkbox);
            checklist.appendChild(label);
            checklist.appendChild(br);
          });
          ingredientInstant = document.querySelectorAll(".checkbox");
        })
        .catch((error) => console.error("Error fetching ingredients:", error));
    });
  });

  //doubleclick to remove ingredients from container(you can delete the selected ingredients in card on double click)
  function doubleclick() {
    document.querySelectorAll(".chosen").forEach((div) => {
      div.addEventListener("dblclick", function () {
        this.remove();
      });
    });
  }
  //making top button interactive to scroll the page to top
  document.querySelector(".top").addEventListener("click", (e) => {
    window.scrollTo({
      top: document.querySelector(".ingredientscontainer").offsetTop,
      behavior: "smooth",
    });
  });
  //search - getting top 5  results of the ingredients which is typed in the search container
  document.querySelector(".search").addEventListener("input", function () {
    const query = this.value;

    fetch(`/search?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        const resultsContainer = document.querySelector(".search-results");
        resultsContainer.style.display = "block";
        resultsContainer.style.zIndex = "3";
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
            item.classList.add("chosen");
            item.textContent = li.textContent; // Add ingredient name to the selected item
            document.querySelector(".choseingredients").appendChild(item);
            doubleclick();
          });
        });
      })
      .catch((error) => console.error("Error:", error));
  });
  //for removing the search result container if the the mouse click somewhere else
  document.addEventListener("click", function (event) {
    // Check if the click event target is not the container or a child of the container
    if (!document.querySelector(".searchcontainer").contains(event.target)) {
      // Click is outside the container
      document.querySelector(".search-results").style.display = "none";
      // Execute desired logic here
    }
  });

  // Move checked items to cart
  const chosenIngredients = document.querySelector(".choseingredients");
  const addtocart = document.querySelector(".addtocart");
  addtocart.addEventListener("click", (event) => {
    ingredientInstant.forEach((checkbox) => {
      if (checkbox.checked) {
        const cell = document.createElement("div");
        cell.textContent = checkbox.value;
        cell.classList.add("chosen");
        cell.style.fontWeight = "bold";
        cell.style.backgroundColor = "rgba(255, 255, 255, 0.726)";
        cell.style.color = "black";
        cell.style.cursor = "pointer";
        chosenIngredients.appendChild(cell);
        window.scrollTo({
          top: document.querySelector(".cart").offsetTop,
          behavior: "smooth",
        });
        doubleclick();
      }
    });
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
  const preparationtimelist = document.querySelectorAll(".time");
  preparationtimelist.forEach((object) => {
    object.addEventListener("click", (e) => {
      prepartiontimediv.textContent =
        "Preparation Time : " + e.target.textContent;
      timefinalised = parseInt(e.target.textContent);
      console.log(typeof timefinalised);
      timeoptioncontainer.classList.remove("active");
    });
  });

  // Handling dietary restrictions
  const diet = [];
  const dietaryrestriction = document.querySelector(".dietaryrestriction");
  const dietcontainer = document.querySelector(".dietcontainer");
  dietaryrestriction.addEventListener("click", () => {
    dietcontainer.classList.toggle("active");
  });
  const dietlist = document.querySelectorAll("input[name='diet']");

  //function for fetching the comments
  async function fetchComments(recipeId) {
    try {
      const response = await fetch(`/comments/${recipeId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const rating = document.querySelector(".ratingfordish");
      const comments = document.querySelector(".commentsfordish");
      const data = await response.json();
      if (data.length == 0) {
        console.log("No comments");
        comments.innerHTML = "";
        rating.innerHTML = "";
        comments.innerHTML = "No comments yet.";
        rating.innerHTML = "No ratings yet.";
        return;
      }
      comments.innerHTML = ""; // Clear previous comments
      const commentsText = data
        .filter((item) => item.comment !== null)
        .map((item) => `${item.username}: ${item.comment}`)
        .join("<br>");
      comments.innerHTML = commentsText;

      rating.innerHTML = ""; // Clear previous comments
      const ratingarray = [
        ...new Set(
          data.map((item) => `${item.username}:  ${item.rating}\u2605`)
        ),
      ];
      const boxrating = document.createElement("div");
      const textrating = ratingarray.map((item) => `${item}`).join("<br>");
      boxrating.innerHTML = textrating;
      rating.appendChild(boxrating);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  async function addRecipeClickListeners() {
    const recipes = document.querySelectorAll(".recipe");
    const showrecipe = document.querySelector(".showrecipe");

    recipes.forEach((object) => {
      object.addEventListener("click", async (event) => {
        showrecipe.style.display = "block";
        document.querySelector(".heart-button").style.display = "block";
        document.querySelector(".heart-button").classList.remove("liked");
        const img = document.createElement("img");
        img.src = "../heart.png";
        img.classList.add("nonelike");
        document.querySelector(".heart-button").innerHTML = "";
        document.querySelector(".heart-button").appendChild(img);
        const recipeId = object.getAttribute("data-recipe-id");
        console.log(recipeId);
        const like = document.querySelector(".heart-button");
        like.setAttribute("data-recipe-id", recipeId);
        like.addEventListener("click", async (event) => {
          if (!like.classList.contains("liked")) {
            if (confirm("Do you want to save the recipe?")) {
              const userId = localStorage.getItem("userid");
              console.log("userid", userId);
              console.log("recipeid", like.getAttribute("data-recipe-id"));
              await fetch("/saverecipe", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId: userId,
                  recipeid: like.getAttribute("data-recipe-id"),
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  alert(data.message);
                  like.classList.add("liked");
                  like.innerHTML = "";
                  const red = document.createElement("img");
                  red.src = "../readheart.png";
                  red.classList.add("readheart");
                  like.appendChild(red);
                })
                .catch((error) => {
                  console.error("Error saving recipe:", error.error);
                });
            } else {
              console.log("Recipe not saved.");
            }
          }
        });

        document.querySelectorAll(".star").forEach((star) => {
          star.classList.remove("selected");
        });
        document.querySelector("#userreview").value = "";
        fetchComments(recipeId);

        function commentforfilter() {
          const review = document.querySelector(".reviewfordish");
          console.log(recipeId);
          console.log(document.querySelector(".reviewfordish").value);
          console.log(document.querySelector(".rating").getAttribute("value"));
          const postData = {
            recipe_id: recipeId,
            user_id: localStorage.getItem("userid"),
            comment: document.querySelector(".reviewfordish").value,
            rating: document.querySelector(".rating").getAttribute("value"),
          };
          console.log(recipeId);
          fetch("/comments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
              alert(data.message);
              review.value = "";
              document.querySelectorAll(".star").forEach((star) => {
                star.classList.remove("selected");
              });
              fetchComments(recipeId);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
        document
          .querySelector("#userreviewbutton")
          .addEventListener("click", commentforfilter);

        try {
          const response = await fetch(`/recipe/${recipeId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          data = await response.json();
          console.log(data);
          data = Array.from(data);
          console.log(data);
          const recipetitle = document.querySelector(".recipetitle");
          recipetitle.textContent = data[0].name;
          const recipeimage = document.querySelector(".recipeimage");
          let img = document.createElement("img");
          img.classList.add("reciperealimg");
          img.src = `${data[0].image_path}`;
          img.alt = "recipe image";
          recipeimage.innerHTML = "";
          recipeimage.appendChild(img);
          const recipesteps = document.querySelector(".procedure");
          recipesteps.style.fontWeight = "bold";

          recipesteps.textContent = data[0].steps;
          const ingredientarray = [
            ...new Set(data.map((item) => item.ingredient)),
          ];
          const ingredientlist = document.querySelector(
            ".ingredientsforselected"
          );

          ingredientlist.innerHTML = "";
          const box = document.createElement("div");
          const text = ingredientarray.map((item) => `${item}`).join("<br>");
          box.style.fontWeight = "bold";
          box.innerHTML = text;
          ingredientlist.appendChild(box);
          currentrecipe = data[0].id;
          console.log(ingredientarray);
          window.scrollTo(0, 0);
          document.querySelector(".showrecipe").style.display = "block";
          document.querySelector(".top").style.display = "none";
          document.querySelector(".close").addEventListener("click", (e) => {
            window.speechSynthesis.cancel();
            document.querySelector(".showrecipe").style.display = "none";
            document.querySelector(".top").style.display = "flex";
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      });
    });
  }
  //function for fetching and displaying based on the recipes which are given by backend for our filter
  async function fetchAndDisplayRecipes() {
    const diet = [];
    const cuisine = [];
    const finalingredients = [];
    dietlist.forEach((object) => {
      if (object.checked) {
        diet.push(object.value);
      }
    });

    cuisinelist.forEach((cuisines) => {
      if (cuisines.checked) {
        cuisine.push(cuisines.value);
      }
    });
    document.querySelectorAll(".chosen").forEach((chosen) => {
      finalingredients.push(chosen.textContent);
    });

    const requestData = {
      diet: diet,
      cuisine: cuisine,
      time: parseInt(timefinalised), // Ensure timefinalised is parsed correctly
      ingredients: finalingredients,
    };

    console.log("Request Data:", requestData);

    try {
      const response = await fetch("/getRecipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const recipeContainer = document.querySelector(".ingredientslist");
      recipeContainer.innerHTML = ""; // Clear previous results
      console.log(Array.from(data));
      if (Array.from(data).length == 0) {
        // Check if data array is empty
        const message = document.createElement("div");
        message.innerHTML =
          "No results found !<br/> try with other set of ingredients<br/> and constrictions";
        message.classList.add("noresults");
        recipeContainer.appendChild(message);
      } else {
        data.forEach((recipe) => {
          const recipeDiv = document.createElement("div");
          recipeDiv.classList.add("recipe");
          const recipeTitle = document.createElement("div");
          recipeTitle.classList.add("recipename");
          recipeTitle.textContent = recipe.name;
          const img = document.createElement("img");
          img.classList.add("recipe-resultimage");
          img.src = `${recipe.image_path}`;
          img.alt = "";
          const recipeDetails = document.createElement("div");
          recipeDetails.classList.add("recipedetails");
          recipeDetails.textContent = `Cuisine: ${recipe.cuisine}, Preparation Time: ${recipe.preparation_time} minutes`;
          recipeDiv.appendChild(img);
          recipeDiv.appendChild(recipeTitle);
          recipeDiv.appendChild(recipeDetails);
          recipeContainer.appendChild(recipeDiv);
          console.log(recipe.id);
          recipeDiv.setAttribute("data-recipe-id", recipe.id);
        });
      }
      window.scrollTo({
        top: document.querySelector(".recipe").offsetTop,
        behavior: "smooth",
      });
      // Add event listeners after recipes are rendered
      addRecipeClickListeners();
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }

  // Submit button event
  document.querySelector(".submitfinal").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default form submission if this is inside a form
    document.querySelector(".addtocart").style.display = "none";
    const dietlist = document.querySelectorAll(".diet-checkbox"); // Ensure correct selectors
    const cuisinelist = document.querySelectorAll(".cuisine-checkbox"); // Ensure correct selectors
    fetchAndDisplayRecipes();
    window.scrollTo(0, 0);
  });

  // Function to fetch and display recipes

  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = star.getAttribute("data-value");

      // Remove selected class from all stars
      stars.forEach((s) => s.classList.remove("selected"));

      // Add selected class to the clicked star and all previous stars
      star.classList.add("selected");
      let previousStar = star.previousElementSibling;
      while (previousStar) {
        previousStar.classList.add("selected");
        previousStar = previousStar.previousElementSibling;
      }

      // Log the rating value to the console
      rating = value;
      document.querySelector(".rating").setAttribute("value", rating);
    });
  });

  // Function to make the voice over , for procedure;
  const speakButton = document.querySelector(".read");
  const pauseButton = document.getElementById("pauseButton");
  const resumeButton = document.getElementById("resumeButton");

  let utterance;

  if (!window.speechSynthesis) {
    alert("Sorry, your browser does not support speech synthesis.");
    return;
  }
  speakButton.addEventListener("click", () => {
    const paragraph = document.querySelector(".procedure").innerText;
    utterance = new SpeechSynthesisUtterance(paragraph);
    // Start new speech
    // Optionally, you can set some properties of the utterance
    utterance.lang = "en-US"; // Language and accent
    utterance.pitch = 1; // 0 to 2, default is 1
    utterance.rate = 1; // 0.1 to 10, default is 1
    utterance.volume = 1; // 0 to 1, default is 1

    window.speechSynthesis.speak(utterance);
  });

  pauseButton.addEventListener("click", () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      pauseButton.classList.add("clicked");
      resumeButton.classList.remove("clicked");
    }
  });

  resumeButton.addEventListener("click", () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      resumeButton.classList.add("clicked");
      pauseButton.classList.remove("clicked");
    }
  });
});

// adding function to view the displayed liked recipes when it is clicked
opennav = document.getElementById("mySidenav");
const viewsaved = document.querySelector(".savedrecipe");

viewsaved.addEventListener("click", (e) => {
  opennav.style.width = "0";
  document.querySelector(".showrecipe").style.display = "none";
  window.speechSynthesis.cancel();
  function addRecipeClickListeners() {
    const recipes = document.querySelectorAll(".recipe");
    const showrecipe = document.querySelector(".showrecipe");
    async function showcomments(recipeId) {
      try {
        const response = await fetch(`/comments/${recipeId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const rating = document.querySelector(".ratingfordish");
        const comments = document.querySelector(".commentsfordish");
        const data = await response.json();
        if (data.length == 0) {
          console.log("No comments");
          comments.innerHTML = "";
          rating.innerHTML = "";
          comments.innerHTML = "No comments yet.";
          rating.innerHTML = "No ratings yet.";
        } else {
          comments.innerHTML = ""; // Clear previous comments
          const commentsText = data
            .filter((item) => item.comment !== null)
            .map((item) => `${item.username}: ${item.comment}`)
            .join("<br>");
          comments.innerHTML = commentsText;

          rating.innerHTML = ""; // Clear previous comments
          const ratingarray = [
            ...new Set(
              data.map((item) => `${item.username}:  ${item.rating}\u2605`)
            ),
          ];
          const boxrating = document.createElement("div");
          const textrating = ratingarray.map((item) => `${item}`).join("<br>");
          boxrating.innerHTML = textrating;
          rating.appendChild(boxrating);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    recipes.forEach((object) => {
      object.addEventListener("click", async (event) => {
        showrecipe.style.display = "block";
        document.querySelectorAll(".star").forEach((star) => {
          star.classList.remove("selected");
        });
        document.querySelector("#userreview").value = "";

        document.querySelector(".heart-button").style.display = "none";

        const recipeId = object.getAttribute("data-recipe-id");
        console.log(recipeId);
        const comment = document.querySelector("#userreviewbutton");
        comment.setAttribute("data-recipe-id", recipeId);
        showcomments(recipeId);
        function commentforsaved() {
          const review = document.querySelector(".reviewfordish");
          console.log(recipeId);
          console.log(review.value);
          console.log(document.querySelector(".rating").getAttribute("value"));

          const postData = {
            recipe_id: recipeId,
            user_id: localStorage.getItem("userid"),
            comment: review.value,
            rating: document.querySelector(".rating").getAttribute("value"),
          };
          console.log(recipeId);
          fetch("/commentsaved", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
              alert(data.message);
              review.value = "";
              document.querySelectorAll(".star").forEach((star) => {
                star.classList.remove("selected");
              });
              showcomments(recipeId);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
        comment.addEventListener("click", commentforsaved);

        try {
          const response = await fetch(`/recipe/${recipeId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          data = await response.json();
          console.log(data);
          data = Array.from(data);
          console.log(data);
          const recipetitle = document.querySelector(".recipetitle");
          recipetitle.textContent = data[0].name;
          const recipeimage = document.querySelector(".recipeimage");
          let img = document.createElement("img");
          img.src = `${data[0].image_path}`;
          img.alt = "recipe image";
          recipeimage.innerHTML = "";
          recipeimage.appendChild(img);
          const recipesteps = document.querySelector(".procedure");

          recipesteps.textContent = data[0].steps;

          const ingredientarray = [
            ...new Set(data.map((item) => item.ingredient)),
          ];
          const ingredientlist = document.querySelector(
            ".ingredientsforselected"
          );
          ingredientlist.innerHTML = "";
          const box = document.createElement("div");
          const text = ingredientarray.map((item) => `${item}`).join("<br>");
          box.innerHTML = text;
          ingredientlist.appendChild(box);
          console.log(ingredientarray);
          const targetElement = document.querySelector(".showrecipe");
          window.scrollTo(0, 0);
          document.querySelector(".showrecipe").style.display = "block";
          document.querySelector(".top").style.display = "none";
          document.querySelector(".close").addEventListener("click", (e) => {
            window.speechSynthesis.cancel();
            document.querySelector(".showrecipe").style.display = "none";
            document.querySelector(".top").style.display = "flex";
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      });
    });
  }

  //for displaying the liked recipe in index page
  async function displayliked() {
    document.querySelector(".addtocart").style.display = "none";
    try {
      const userId = localStorage.getItem("userid");
      const response = await fetch(`/saved-recipes/${userId}`, {
        method: "GET", // Use GET method for fetching data
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const recipeContainer = document.querySelector(".ingredientslist");
      recipeContainer.innerHTML = ""; // Clear previous results

      if (Array.from(data).length == 0) {
        // Check if data array is empty
        const message = document.createElement("div");
        message.innerHTML = "No recipe Saved yet ! ";
        message.classList.add("noresults");
        recipeContainer.appendChild(message);
        message.style.color = "rgba(255, 255, 255";
        message.style.fontFamily = "PT Sans Serif";
        message.style.textAlign = "center";
        message.style.fontSize = "32px";
        message.style.backgroundColor = "rgba(0,0,0,0.75)";
      } else {
        const savedtitle = document.createElement("div");
        savedtitle.textContent = "Saved Recipes ❤️";
        recipeContainer.appendChild(savedtitle);
        savedtitle.classList.add("savedtitle");
        data.forEach((recipe) => {
          const recipeDiv = document.createElement("div");
          recipeDiv.classList.add("recipe");
          const recipeTitle = document.createElement("div");
          recipeTitle.classList.add("recipename");
          recipeTitle.textContent = recipe.name;
          const img = document.createElement("img");
          img.classList.add("recipe-resultimage");
          img.src = `${recipe.image_path}`;
          img.alt = "";
          const recipeDetails = document.createElement("div");
          recipeDetails.classList.add("recipedetails");
          recipeDetails.textContent = `Cuisine: ${recipe.cuisine}, Preparation Time: ${recipe.preparation_time} minutes`;
          recipeDiv.appendChild(img);
          recipeDiv.appendChild(recipeTitle);
          recipeDiv.appendChild(recipeDetails);

          recipeContainer.appendChild(recipeDiv);
          recipeDiv.setAttribute("data-recipe-id", recipe.id);
          window.scrollTo({
            top: savedtitle.offsetTop,
            behavior: "smooth",
          });
        });
      }

      // Add event listeners after recipes are rendered
      console.log("eventclickelistener");
      addRecipeClickListeners();
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }
  displayliked();
});
