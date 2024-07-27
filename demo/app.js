if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
let userId;

// Requiring modules
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const path = require("path");
const app = express();
const fs = require("fs");
const multer = require("multer");
// Parsing the information
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    process.exit(1); // Exit the process with an error code
  } else {
    console.log("Connected to MySQL as id " + db.threadId);
  }
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Set up session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Routes

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
  });
  console.log("Logged out");
  res.render("login");
});
app.get("/user", (req, res) => {
  if (req.session.loggedin) {
    res.render("index");
  } else {
    res.render("logintoview");
  }
});
app.get("/usermanual", (req, res) => {
  if (req.session.loggedin) {
    res.render("usermanual");
  } else {
    res.render("logintoview");
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the username already exists
    const findinguser = "SELECT * FROM users WHERE username = ?";
    db.query(findinguser, [username], (err, result) => {
      if (err) {
        console.error("Error checking username:", err);
        return res.status(500).json({ message: "Error checking username" });
      }

      if (result.length > 0) {
        return res.status(409).json({ message: "Username already exists" });
      }

      // If username does not exist, insert the new user
      const sql = "INSERT INTO users SET ?";
      const user = { username, password: hashedPassword };
      db.query(sql, user, (err, result) => {
        if (err) {
          console.error("Error registering user:", err);
          return res.status(500).json({ message: "Error registering user" });
        }

        return res.status(201).json({ message: "Registered successfully" });
      });
    });
  } catch (error) {
    console.error("Error in registration process:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
      if (err) {
        console.error("Error authenticating user:", err);
        res.status(500).send("Error authenticating user");
        return;
      }

      if (results.length > 0) {
        const comparison = await bcrypt.compare(password, results[0].password);
        if (comparison) {
          req.session.loggedin = true;
          req.session.username = username;
          const userId = results[0].id;
          res.json({ userId: userId, username: username });
        } else {
          res.status(403).json({ message: "invalid credentials" });
        }
      } else {
        res.status(403).redirect("/login");
      }
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send("Error logging in");
  }
});

app.get("/upload", (req, res) => {
  if (req.session.loggedin) {
    const userId = req.params.userId;
    res.render("post");
  } else {
    res.render("logintoview");
  }
});

// Route to fetch ingredients by type
app.get("/ingredients/:type", (req, res) => {
  const ingredientType = req.params.type;

  // Query MySQL database to fetch ingredients for the specified type
  const sql = "SELECT ingredient FROM ingredients WHERE category = ?";
  db.query(sql, [ingredientType], (err, results) => {
    if (err) {
      console.error("Error fetching ingredients:", err);
      res.status(500).json({ error: "Error fetching ingredients" });
      return;
    }

    const ingredients = results.map((row) => ({ ingredient: row.ingredient }));

    res.json(ingredients);
  });
});

// Fetching data to get recipes based on the requirements

app.post("/getRecipes", (req, res) => {
  const { diet, cuisine, time, ingredients } = req.body;
  console.log("ingredients", ingredients);
  let query = `
    SELECT DISTINCT recipes.*
    FROM recipes
    JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id
    where 1=1
  `;
  if (time) {
    query += `AND recipes.preparation_time <= ${time}`;
  }

  if (cuisine && cuisine.length > 0) {
    query += ` AND recipes.cuisine IN (${cuisine
      .map((c) => mysql.escape(c))
      .join(", ")})`;
  }

  if (diet && diet.length > 0) {
    query += ` AND recipes.diet_type_id IN (
    SELECT restriction_id FROM dietary_restrictions WHERE restriction_name IN (${diet
      .map((d) => mysql.escape(d))
      .join(", ")})
  )`;
  }

  if (ingredients && ingredients.length > 0) {
    query += `
    AND EXISTS (
      SELECT 1
      FROM ingredients i
      JOIN recipe_ingredients ri ON i.ingredients_id = ri.ingredient_id
      WHERE ri.recipe_id = recipes.id
      AND i.ingredient IN (${ingredients
        .map((ingredient) => mysql.escape(ingredient))
        .join(", ")})
      )
  `;
  }

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving recipes");
      return;
    }
    res.json(results);
  });
});

app.get("/recipe/:id", (req, res) => {
  const recipeId = parseInt(req.params.id, 10);

  // Validate the recipe ID
  if (isNaN(recipeId)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }

  const query = `
    SELECT 
      recipes.*, 
      ingredients.ingredients_id, 
      ingredients.ingredient,
      recipe_comments.user_id,
      recipe_comments.comment ,
      recipe_comments.rating,
      users.username
    FROM 
      recipes
    LEFT JOIN 
      recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id
    LEFT JOIN 
      ingredients ON recipe_ingredients.ingredient_id = ingredients.ingredients_id
    LEFT JOIN 
      recipe_comments ON recipes.id = recipe_comments.recipe_id
    LEFT JOIN
      users ON recipe_comments.user_id = users.id
    WHERE 
      recipes.id = ?
  `;

  // Use a parameterized query to prevent SQL injection
  db.query(query, [recipeId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log(results);
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  });
});

app.get("/search", (req, res) => {
  const searchTerm = req.query.q;
  const query = `SELECT * FROM ingredients WHERE ingredient LIKE ? LIMIT 5`;
  db.query(query, [`%${searchTerm}%`], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(results);
  });
});

app.post("/comments", (req, res) => {
  const { recipe_id, user_id, comment, rating } = req.body;

  // Basic validation
  if (!recipe_id || !user_id || !comment || !rating) {
    return res.json({ message: "provide both review and rating" });
  }

  // SQL query to insert a new comment
  const sql =
    "INSERT INTO recipe_comments (recipe_id, user_id, comment, rating) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE comment = VALUES(comment), rating = VALUES(rating)";
  const values = [recipe_id, user_id, comment, rating];

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting comment:", err);
      return res.status(500).json({ error: "Error inserting comment" });
    }

    console.log("Inserted comment:", result);
    // Send a response back to the client
    res.status(201).json({ message: "Commented successfully" });
  });
});

app.post("/commentsaved", (req, res) => {
  const { recipe_id, user_id, comment, rating } = req.body;

  // Basic validation
  if (!recipe_id || !user_id || !comment || !rating) {
    return res.json({ message: "provide both review and rating" });
  }

  // SQL query to insert a new comment
  const sql =
    "INSERT INTO recipe_comments (recipe_id, user_id, comment, rating) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE comment = VALUES(comment), rating = VALUES(rating)";
  const values = [recipe_id, user_id, comment, rating];

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting comment:", err);
      return res.status(500).json({ error: "Error inserting comment" });
    }

    console.log("Inserted comment:", result);
    // Send a response back to the client
    res.status(201).json({ message: "Commented successfully" });
  });
});
// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.post("/submit-recipe", upload.single("image"), (req, res) => {
  const {
    recipeName,
    author_id,
    cuisine,
    preparationTime,
    dietType,
    steps,
    ingredients,
  } = req.body;
  const imagePath = req.file ? `/images/${req.file.filename}` : null;
  // Query to get the diet_type_id based on the provided dietType
  const getDietTypeIdQuery = `SELECT restriction_id FROM dietary_restrictions WHERE restriction_name = ?`;

  db.query(getDietTypeIdQuery, [dietType], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid diet type" });
    }

    const dietTypeId = results[0].restriction_id;

    // Insert the new recipe into the recipes table
    const insertRecipeQuery = `INSERT INTO recipes (name, author_id, cuisine, preparation_time, diet_type_id, steps, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      insertRecipeQuery,
      [
        recipeName,
        author_id,
        cuisine,
        preparationTime,
        dietTypeId,
        steps,
        imagePath,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        const recipeId = result.insertId; // Retrieve the ID of the newly inserted recipe

        // Lookup ingredient IDs based on the ingredient names provided
        const ingredientArray = Array.isArray(ingredients)
          ? ingredients
          : ingredients.split(",").map((ing) => ing.trim());

        const ingredientLookupQuery = `SELECT * FROM ingredients WHERE ingredient IN (${ingredientArray
          .map((d) => mysql.escape(d))
          .join(", ")})`;
        console.log(ingredientLookupQuery);
        db.query(ingredientLookupQuery, (err, ingredientResults) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          console.log("ingredient result", ingredientResults);
          // Prepare the values for the recipe_ingredients insertion

          const ingredientValues = ingredientResults.map((ingredient) => [
            recipeId,
            ingredient.ingredients_id,
          ]);
          console.log("ingredient values ", ingredientValues);
          ingredientValues.map((pair) => `(${pair[0]}, ${pair[1]})`).join(", ");
          console.log(ingredientValues);

          // Insert the ingredients into the recipe_ingredients table
          const insertIngredientQuery = `INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES ?`;

          db.query(insertIngredientQuery, [ingredientValues], (err, result) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            res.json({ message: "Recipe submitted successfully!" });
          });
        });
      }
    );
  });
});
// Endpoint to handle saving recipe
app.post("/saverecipe", (req, res) => {
  const { userId, recipeid } = req.body;
  console.log(userId, recipeid);
  if (!userId || !recipeid) {
    res.status(500).json({ error: "some error" });
    return;
  }
  const insertQuery =
    "INSERT INTO saved_recipes (user_id, recipe_id) VALUES (?, ?) on duplicate key update recipe_id = values(recipe_id)";
  db.query(insertQuery, [userId, recipeid], (err, results) => {
    if (err) {
      console.error("Error saving recipe:", err);
      res.status(500).json({ error: "You can't save same recipe twice " });
      return;
    }
    console.log("Recipe saved successfully!");
    res.status(200).json({ message: "Recipe saved successfully!" });
  });
});
// creating end point for getting all the recipe save by user
app.get("/saved-recipes/:user_id", (req, res) => {
  const userId = req.params.user_id;

  // Query to fetch saved recipes by user_id
  const query = `
      SELECT * FROM recipes WHERE id IN (
    SELECT recipe_id 
    FROM saved_recipes 
    WHERE user_id = ?)`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching saved recipes:", err);
      res.status(500).json({ error: "Error fetching saved recipes" });
      return;
    }

    res.status(200).json(results);
  });
});
//for fetching the recipe comments

app.get("/comments/:recipe_id", (req, res) => {
  const recipeId = req.params.recipe_id;

  const query = `
  SELECT c.*, u.username 
  FROM recipe_comments c 
  INNER JOIN users u 
  ON c.user_id = u.id 
  WHERE c.recipe_id = ?
`;

  db.query(query, [recipeId], (err, results) => {
    if (err) {
      console.error("Error fetching comments:", err);
      res.status(500).json({ error: "Error fetching comments" });
      return;
    }

    res.status(200).json(results);
  });
});
// Port Number
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
