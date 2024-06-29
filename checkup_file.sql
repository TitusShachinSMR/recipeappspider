-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: demorecipe
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cuisines`
--

DROP TABLE IF EXISTS `cuisines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuisines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cuisine_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuisines`
--

LOCK TABLES `cuisines` WRITE;
/*!40000 ALTER TABLE `cuisines` DISABLE KEYS */;
INSERT INTO `cuisines` VALUES (1,'Italian'),(2,'Chinese'),(3,'Indian'),(4,'Mexican'),(5,'Japanese'),(6,'Thai'),(7,'French'),(8,'Greek'),(9,'Spanish'),(10,'Mediterranean');
/*!40000 ALTER TABLE `cuisines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dietary_restrictions`
--

DROP TABLE IF EXISTS `dietary_restrictions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dietary_restrictions` (
  `restriction_id` int NOT NULL AUTO_INCREMENT,
  `restriction_name` varchar(255) NOT NULL,
  PRIMARY KEY (`restriction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dietary_restrictions`
--

LOCK TABLES `dietary_restrictions` WRITE;
/*!40000 ALTER TABLE `dietary_restrictions` DISABLE KEYS */;
INSERT INTO `dietary_restrictions` VALUES (1,'Vegetarian'),(2,'Vegan'),(3,'Gluten-Free'),(4,'Dairy-Free'),(5,'Nut-Free'),(6,'Soy-Free'),(7,'Keto'),(8,'Paleo'),(9,'Low FODMAP'),(10,'Kosher'),(11,'Halal'),(12,'Pescatarian'),(13,'Low-Carb'),(14,'Low-Sodium'),(15,'Diabetic'),(16,'None');
/*!40000 ALTER TABLE `dietary_restrictions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `category` varchar(255) DEFAULT NULL,
  `ingredient` varchar(255) DEFAULT NULL,
  `ingredients_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ingredients_id`)
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES ('protein','chicken',1),('protein','beef',2),('protein','Bison',3),('protein','Kangaroo',4),('protein','turkey',5),('protein','mutton',6),('protein','Mackerel',7),('protein','shrimp',8),('protein','tofu',9),('protein','Swordfish',10),('Staples','Rice',11),('Staples','Pasta',12),('Staples','Quinoa',13),('Staples','Oats',14),('Staples','Bread',15),('Staples','Flour',16),('Staples','Cornmeal',17),('Staples','Cereal',18),('Staples','Beans',19),('Staples','Lentils',20),('Meat and Poultry','Guinea Fowl',21),('Meat and Poultry','Veal',22),('Meat and Poultry','Pork',23),('Meat and Poultry','Ostrich',24),('Meat and Poultry','Lamb',25),('Meat and Poultry','Duck',26),('Meat and Poultry','Goose',27),('Meat and Poultry','Venison',28),('Meat and Poultry','Quail',29),('Meat and Poultry','Rabbit',30),('Seafood','Salmon',31),('Seafood','Snapper',32),('Seafood','Tuna',33),('Seafood','Cod',34),('Seafood','Crab',35),('Seafood','Lobster',36),('Seafood','Oysters',37),('Seafood','Mussels',38),('Seafood','Clams',39),('Seafood','Sardines',40),('Eggs','Chicken Eggs',41),('Eggs','Duck Eggs',42),('Eggs','Quail Eggs',43),('Eggs','Goose Eggs',44),('Eggs','Ostrich Eggs',45),('Eggs','Emu Eggs',46),('Eggs','Turkey Eggs',47),('Eggs','Pheasant Eggs',48),('Eggs','Guinea Fowl Eggs',49),('Eggs','Peafowl Eggs',50),('Dairy','Milk',51),('Dairy','Butter',52),('Dairy','Cheese',53),('Dairy','Yogurt',54),('Dairy','Cream',55),('Dairy','Cottage Cheese',56),('Dairy','Sour Cream',57),('Dairy','Whipping Cream',58),('Dairy','Condensed Milk',59),('Dairy','Evaporated Milk',60),('Plant-Based Proteins','Millet',61),('Plant-Based Proteins','Tempeh',62),('Plant-Based Proteins','Seitan',63),('Plant-Based Proteins','Eggplant',64),('Plant-Based Proteins','Chickpeas',65),('Plant-Based Proteins','Black Beans',66),('Plant-Based Proteins','Kidney Beans',67),('Plant-Based Proteins','Amaranth',68),('Plant-Based Proteins','Soybeans',69),('Plant-Based Proteins','Edamame',70),('Fruits and Vegetables','Apple',71),('Fruits and Vegetables','Banana',72),('Fruits and Vegetables','Orange',73),('Fruits and Vegetables','Carrot',74),('Fruits and Vegetables','Tomato',75),('Fruits and Vegetables','Broccoli',76),('Fruits and Vegetables','Spinach',77),('Fruits and Vegetables','Kale',78),('Fruits and Vegetables','Bell Pepper',79),('Fruits and Vegetables','Strawberry',80),('Herbs and Spices','Basil',81),('Herbs and Spices','Cilantro',82),('Herbs and Spices','Rosemary',83),('Herbs and Spices','Thyme',84),('Herbs and Spices','Oregano',85),('Herbs and Spices','Parsley',86),('Herbs and Spices','Cumin',87),('Herbs and Spices','Coriander',88),('Herbs and Spices','Cinnamon',89),('Herbs and Spices','Ginger',90),('Oils and Fats','Olive Oil',91),('Oils and Fats','Vegetable Oil',92),('Oils and Fats','Coconut Oil',93),('Oils and Fats','Ricotta',94),('Oils and Fats','Ghee',95),('Oils and Fats','Avocado Oil',96),('Oils and Fats','Sesame Oil',97),('Oils and Fats','Canola Oil',98),('Oils and Fats','Peanut Oil',99),('Oils and Fats','Sunflower Oil',100),('Flour and Baking Ingredients','All-Purpose Flour',101),('Flour and Baking Ingredients','Whole Wheat Flour',102),('Flour and Baking Ingredients','Baking Powder',103),('Flour and Baking Ingredients','Baking Soda',104),('Flour and Baking Ingredients','Yeast',105),('Flour and Baking Ingredients','Cornstarch',106),('Flour and Baking Ingredients','Cake Flour',107),('Flour and Baking Ingredients','Almond Flour',108),('Flour and Baking Ingredients','Coconut Flour',109),('Flour and Baking Ingredients','Oat Flour',110),('Liquid Ingredients','Water',111),('Liquid Ingredients','Lactose',112),('Liquid Ingredients','Buttermilk',113),('Liquid Ingredients','Chicken Broth',114),('Liquid Ingredients','Beef Broth',115),('Liquid Ingredients','Vegetable Broth',116),('Liquid Ingredients','Wine',117),('Liquid Ingredients','Soy Sauce',118),('Liquid Ingredients','Fish Sauce',119),('Liquid Ingredients','Vinegar',120),('Condiments and Sauces','Ketchup',121),('Condiments and Sauces','Mustard',122),('Condiments and Sauces','Mayonnaise',123),('Condiments and Sauces','Teriyaki Sauce',124),('Condiments and Sauces','Alfredo Sauce',125),('Condiments and Sauces','BBQ Sauce',126),('Condiments and Sauces','Worcestershire Sauce',127),('Condiments and Sauces','Hot Sauce',128),('Condiments and Sauces','Salsa',129),('Condiments and Sauces','Pesto',130),('Dairy Alternatives','Almond Milk',131),('Dairy Alternatives','Soy Milk',132),('Dairy Alternatives','Coconut Milk',133),('Dairy Alternatives','Oat Milk',134),('Dairy Alternatives','Cashew Milk',135),('Dairy Alternatives','Rice Milk',136),('Dairy Alternatives','Hemp Milk',137),('Dairy Alternatives','Flax Milk',138),('Dairy Alternatives','Pea Milk',139),('Dairy Alternatives','Quinoa Milk',140),('Nuts and Seeds','Almonds',141),('Nuts and Seeds','Walnuts',142),('Nuts and Seeds','Peanuts',143),('Nuts and Seeds','Cashews',144),('Nuts and Seeds','Pistachios',145),('Nuts and Seeds','Sunflower Seeds',146),('Nuts and Seeds','Pumpkin Seeds',147),('Nuts and Seeds','Chia Seeds',148),('Nuts and Seeds','Flaxseeds',149),('Nuts and Seeds','Hemp Seeds',150),('Sweets and Snacks','Chocolate',151),('Sweets and Snacks','Candy',152),('Sweets and Snacks','Chips',153),('Sweets and Snacks','Cookies',154),('Sweets and Snacks','Popcorn',155),('Sweets and Snacks','Ice Cream',156),('Sweets and Snacks','Brownies',157),('Sweets and Snacks','Cake',158),('Sweets and Snacks','Pudding',159),('Sweets and Snacks','Granola Bars',160),('Miscellaneous Ingredients','Canned Goods',161),('Miscellaneous Ingredients','Olives',162),('Miscellaneous Ingredients','Pickles',163),('Miscellaneous Ingredients','Tortillas',164),('Miscellaneous Ingredients','Ramen Noodles',165),('Miscellaneous Ingredients','Soy Products',166),('Miscellaneous Ingredients','Protein Powder',167),('Miscellaneous Ingredients','Seaweed',168),('Miscellaneous Ingredients','Tahini',169),('Miscellaneous Ingredients','Nutritional Yeast',170),('Plant-Based Proteins','lettuce',171),('Fruits and Vegetables','Kiwi',172),('Fruits and Vegetables','cucumber',173),('Fruits and Vegetables','Corn Oil',174),('Plant-Based Proteins','curry powder',175),('Herbs and Spices','garlic',176),('Fruits and Vegetables','Mango',177),('Fruits and Vegetables','Blueberry',178),('Liquid Ingredients','orange juice',179),('Liquid Ingredients','honey',180),('Plant-Based Proteins','Coco powder',193);
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_comments`
--

DROP TABLE IF EXISTS `recipe_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `comment` text,
  `rating` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `recipe_id` (`recipe_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `recipe_comments_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`),
  CONSTRAINT `recipe_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `recipe_comments_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_comments`
--

LOCK TABLES `recipe_comments` WRITE;
/*!40000 ALTER TABLE `recipe_comments` DISABLE KEYS */;
INSERT INTO `recipe_comments` VALUES (12,11,2,'Delicious and easy to make!',5),(13,11,3,'Loved it, but a bit too salty.',4),(14,12,1,'Great flavor, but took longer to cook.',4),(15,13,4,'Perfect for a quick meal.',5),(16,17,5,'Simple and tasty.',5),(17,15,1,'Very rich and creamy.',5),(18,16,2,'Best pancakes ever!',5),(19,17,3,'Healthy and tasty.',4),(20,18,4,'A bit too time-consuming.',3),(21,21,5,'Fresh and delicious.',5),(22,17,1,'Absolutely loved these brownies!',5),(23,NULL,NULL,NULL,NULL),(24,NULL,NULL,NULL,NULL),(25,NULL,NULL,NULL,NULL),(26,NULL,NULL,NULL,NULL),(27,NULL,NULL,NULL,NULL),(28,NULL,NULL,NULL,NULL),(29,NULL,NULL,NULL,NULL),(30,NULL,NULL,NULL,NULL),(31,NULL,NULL,NULL,NULL),(32,NULL,NULL,NULL,NULL),(33,NULL,NULL,NULL,NULL),(34,15,5,'wondurful dish',4),(35,21,1,'REALLY GOOD',3),(36,21,3,'REALLY AWESOME',3),(37,NULL,NULL,NULL,NULL),(38,NULL,NULL,NULL,NULL),(39,NULL,NULL,NULL,NULL),(40,NULL,NULL,NULL,NULL),(41,21,1,'really good',3),(42,21,6,'must try',3),(43,61,1,'easy And tasty',4),(44,23,8,'easy and juicy',3),(45,63,5,'awesome pasta , must try or die',4),(46,60,5,'COOL AND FANTASTIC',3),(47,64,5,'beef is really good for health',4),(48,23,5,'awsomesause',3),(49,62,5,'good',3),(50,60,1,'must try, but it could have be even spicy',3),(51,22,1,'this is the real chicken',4),(52,66,9,'really it is good milkshake but dairy free (wow)',3),(53,64,5,'don\'t miss',4);
/*!40000 ALTER TABLE `recipe_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_ingredients`
--

DROP TABLE IF EXISTS `recipe_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_ingredients` (
  `recipe_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  PRIMARY KEY (`recipe_id`,`ingredient_id`),
  KEY `ingredient_id` (`ingredient_id`),
  CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`),
  CONSTRAINT `recipe_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredients_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_ingredients`
--

LOCK TABLES `recipe_ingredients` WRITE;
/*!40000 ALTER TABLE `recipe_ingredients` DISABLE KEYS */;
INSERT INTO `recipe_ingredients` VALUES (22,1),(63,1),(64,2),(60,8),(65,9),(68,11),(11,12),(63,12),(62,13),(11,22),(69,25),(68,31),(68,35),(23,72),(11,75),(21,75),(22,75),(64,75),(62,77),(65,77),(61,79),(23,80),(11,81),(61,82),(66,89),(11,91),(21,91),(60,91),(70,93),(69,94),(67,101),(67,113),(65,118),(63,125),(23,130),(66,134),(67,143),(70,151),(64,164),(21,171),(11,172),(21,173),(62,173),(11,174),(22,175),(69,175),(11,176),(22,176),(60,176),(61,177),(66,178),(23,179),(70,180);
/*!40000 ALTER TABLE `recipe_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `author_id` int DEFAULT NULL,
  `steps` text NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `cuisine` varchar(255) DEFAULT NULL,
  `preparation_time` int DEFAULT NULL,
  `diet_type_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  KEY `diet_type_id` (`diet_type_id`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `recipes_ibfk_2` FOREIGN KEY (`diet_type_id`) REFERENCES `dietary_restrictions` (`restriction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (11,'Spaghetti Carbonara',1,'1. Boil pasta\n2. Cook pancetta\n3. Mix with eggs and cheese\n4. Combine and serve','/images/spaghetti_carbonara.jpg','Italian',30,1),(12,'Chicken Curry',2,'1. Cook chicken\n2. Prepare curry sauce\n3. Combine and simmer\n4. Serve with rice','/images/chicken_curry.jpg','Indian',45,16),(13,'Vegan Tacos',3,'1. Prepare vegetables\n2. Cook beans\n3. Assemble tacos\n4. Serve','/images/vegan_tacos.jpg','Mexican',20,2),(14,'Caesar Salad',4,'1. Prepare lettuce\n2. Make dressing\n3. Toss with croutons and parmesan\n4. Serve','/images/caesar_salad.jpg','Italian',15,1),(15,'Beef Stroganoff',5,'1. Cook beef\n2. Prepare sauce\n3. Combine and simmer\n4. Serve with noodles','/images/beef_stroganoff.jpg','Russian',40,4),(16,'Gluten-Free Pancakes',1,'1. Mix ingredients\n2. Cook pancakes\n3. Serve with syrup','/images/gluten_free_pancakes.jpg','American',20,5),(17,'Keto Avocado Toast',2,'1. Prepare avocado\n2. Toast bread\n3. Assemble and serve','/images/keto_avocado_toast.jpg','American',10,3),(18,'Vegetarian Lasagna',3,'1. Prepare vegetables\n2. Assemble lasagna\n3. Bake\n4. Serve','/images/vegetarian_lasagna.jpg','Italian',60,1),(19,'Paleo Chicken Salad',4,'1. Cook chicken\n2. Prepare vegetables\n3. Toss and serve','/images/paleo_chicken_salad.jpg','American',25,4),(20,'Vegan Brownies',5,'1. Mix ingredients\n2. Bake\n3. Serve','/images/vegan_brownies.jpg','Dessert',30,2),(21,'Vegan Salad',1,'Step 1: Pick a green Lettuce makes a great base for a traditional salad. Try romaine, red or green leaf, or the soft bibb, boston, and butter varieties. Kale, spinach and arugula are also wonderful options, each with their own distinct flavor and nutritional benefits. Garnish with endive, escarole, frisee, mesclun, or watercress for additional texture, flavor and nutrition. Step 2: Add some veggies Tons of options here – throw in as many as you like! Try raw broccoli, bell peppers, red onion, radishes, carrots, beets, tomatoes, snow peas, mushrooms, jicama, celery, cucumber, and cauliflower. Step 3: Add a protein Add one or more protein sources for a more filling, satisfying salad. Tofu, tempeh, shelled edamame, chickpeas, black beans, and kidney beans are great options. Try topping your greens with an eggless salad, tempeh tuna salad, or mock chicken salad made with tofu or tempeh for a real treat! Step 4: Add a healthy fat Adding a little fat in your salad goes a long way. It adds flavor, helps you feel satisfied, and even helps you absorb the nutrients from all those greens and veggies. Avocado slices, vegan cheese shreds, nuts, seeds, and olives are great add-ins.Step 5: Whip up a dressing There are tons of amazing vegan dressing options! Balsamic vinaigrette and Italian are often the only safe restaurant choices, but the sky’s the limit at home! Use avocado or tahini for a creamy dressing base, and add Braggs, soy sauce, nutritional yeast, lemon, and/or garlic for extra flavor. Or try an oil-based dressing using olive, canola, grapeseed or safflower oil mixed with vinegar and spices. Salsa is awesome on taco salad, and hummus or vegan tzatziki sauce make a killer greek salad!.Extras:Salads are so versatile! Throw in some raisins, dried cranberries, baked tortilla or pita chips, rice noodles, pine nuts, or whatever else you like for a new flavor combination each time','/images/vegan_salad.jpg','Mediterranean',15,1),(22,'Chicken Curry masala',2,'Prepare Ingredients:\n\nChop the onion, garlic, and ginger.\nCut the chicken into bite-sized pieces.\nChop the tomatoes.\nSauté Aromatics:\n\nHeat the vegetable oil in a large pan or pot over medium heat.\nAdd the chopped onions and sauté until they turn golden brown (about 5-7 minutes).\nAdd the minced garlic and ginger, and sauté for another 1-2 minutes until fragrant.\nCook the Tomatoes:\n\nAdd the chopped tomatoes to the pan.\nCook until the tomatoes break down and become soft, stirring occasionally (about 5 minutes).\nAdd Spices:\n\nAdd the curry powder, turmeric powder, cumin powder, coriander powder, and chili powder (if using).\nStir well to coat the onion and tomato mixture with the spices.\nCook the Chicken:\n\nAdd the chicken pieces to the pan.\nStir well to coat the chicken with the spice mixture.\nCook until the chicken is no longer pink on the outside (about 5 minutes).\nSimmer with Liquid:\n\nAdd the coconut milk or yogurt to the pan.\nStir well to combine.\nBring the mixture to a gentle simmer.\nCover and let it cook for about 15-20 minutes, or until the chicken is cooked through and tender.\nFinish with Garam Masala:\n\nAdd the garam masala to the curry.\nStir well and let it simmer for another 2-3 minutes.\nSeason and Garnish:\n\nTaste the curry and add salt as needed.\nGarnish with fresh cilantro.\nServe:\n\nServe the chicken curry hot with rice, naan, or roti.\nEnjoy your homemade chicken curry!','/images/chickencurry.jpg','Indian',40,16),(23,'Fruit Smoothie',3,'Prepare Ingredients:\n\nIf using fresh berries, wash and hull them if necessary.\nPeel the banana.\nWash the spinach leaves if using.\nAdd Ingredients to Blender:\n\nAdd the berries, banana, and spinach leaves (if using) to the blender.\nPour in the milk.\nAdd the Greek yogurt, honey or maple syrup, and vanilla extract, if using.\nBlend:\n\nBlend on high speed until the mixture is smooth and creamy.\nIf the smoothie is too thick, add more milk a little at a time until the desired consistency is reached.\nIf using fresh fruit and you want a colder smoothie, add a few ice cubes and blend again until smooth.\nServe:\n\nPour the smoothie into glasses.\nServe immediately.','/images/fruitsmoothie.jpg','American',10,6),(60,'Garlic Shrimp',1,'Procedure:\r\nHeat olive oil in a pan over medium heat.\r\nAdd minced garlic and sauté until fragrant.\r\nAdd shrimp and cook until pink and opaque.\r\nServe hot with a sprinkle of parsley if desired.','/images/1719465466795.jpg','Spanish',20,12),(61,'Mango Salsa',4,'Procedure:\r\nDice mango, bell pepper, and finely chop cilantro.\r\nMix all ingredients in a bowl.\r\nServe chilled with tortilla chips or as a topping for grilled meats.','/images/1719465742500.jpg','Mexican',30,6),(62,'Quinoa Salad',6,'1.Cook quinoa according to package instructions and let it cool.\r\n2.Dice cucumber and chop spinach.\r\n3.Mix quinoa, cucumber, and spinach in a bowl.\r\n4.Dress with olive oil, lemon juice, salt, and pepper.','/images/1719466318938.jpg','Mediterranean',30,1),(63,'chicken alfredo',7,'1.Cook pasta according to package instructions.\r\n2.Sauté chicken in a pan until fully cooked.\r\n3.Add Alfredo sauce to the pan and heat through.\r\n4.Toss pasta with the sauce and chicken.\r\n5.Serve hot, garnished with grated Parmesan cheese.','/images/1719466893895.jpg','Italian',30,16),(64,'Beef Tacos',5,'1.Cook ground beef in a pan until browned.\r\n\r\n2.Dice tomatoes.\r\n\r\n3.Warm tortillas in a pan or microwave.\r\n\r\n4.Assemble tacos with beef, tomatoes, and any other \r\ndesired toppings.\r\n\r\n5.Serve hot.','/images/1719493338045.jpg','Mexican',30,16),(65,'Vegan Stir-Fry',5,'1.Press and cube tofu.\r\n2.Heat oil in a wok or large pan over medium-high heat.\r\n3.Add tofu and stir-fry until golden brown.\r\n4.Add spinach and soy sauce, and cook until spinach wilts.\r\n5.Serve hot over rice or noodles.','/images/1719588917167.jpg','Chinese',30,2),(66,'Berry Smoothie',9,'1.Add blueberries, oat milk, and a pinch of cinnamon to a blender.\r\n2.Blend until smooth.\r\n3.Serve chilled.','/images/1719589209044.jpg','French',10,4),(67,'Peanut Butter Cookies',9,'1.Preheat oven to 350°F (175°C).\r\n2.Mix peanuts (as peanut butter), flour, and butter to form a dough.\r\n3.Scoop dough onto a baking sheet.\r\n3.Flatten with a fork and bake for 10-12 minutes.\r\n4.Let cool before serving.','/images/1719589546948.jpg','Greek',30,15),(68,'Seafood Paella',4,'1.Heat oil in a large pan and sauté onions and garlic.\r\n\r\n2.Add rice and cook for a few minutes.\r\n\r\n3.Add broth and bring to a simmer.\r\n\r\n4.Add seafood and cook until rice is done and seafood is cooked through.\r\n\r\n5.Serve hot, garnished with lemon wedges.','/images/1719589870459.jpg','Spanish',50,12),(69,'Spicy Lamb Curry',4,'1.Heat oil in a pan and sauté onions until golden.\r\n\r\n2.Add lamb and brown all sides.\r\n\r\n3.Add curry powder and cook for a minute.\r\n\r\n4.Add water or broth and simmer until lamb is tender.\r\n\r\n5.Stir in ricotta and cook until the sauce thickens.\r\n\r\n6.Serve hot with rice or naan.','/images/1719590094275.jpg','Indian',40,16),(70,'chocolate lava',4,'Melt the Coconut Oil: In a saucepan, melt the coconut oil over low heat.\r\nMix Ingredients:\r\nOnce the coconut oil is melted, remove the saucepan from the heat.\r\nAdd the cocoa powder, honey (or maple syrup), and vanilla extract (if using) to the melted coconut oil.\r\nStir well until all ingredients are thoroughly combined and the mixture is smooth.\r\nPour into Molds:\r\nPour the chocolate mixture into silicone molds or a lined baking dish.\r\nChill:\r\nPlace the molds or dish in the refrigerator or freezer.\r\nLet it chill for about 30 minutes or until the chocolate is firm.\r\nServe:\r\nOnce the chocolate is set, remove it from the molds or cut it into pieces if using a baking dish.\r\nStore in an airtight container in the refrigerator to prevent melting.','/images/1719591297349.webp','Mediterranean',10,1);
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_recipes`
--

DROP TABLE IF EXISTS `saved_recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_recipes` (
  `save_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `recipe_id` int DEFAULT NULL,
  `saved_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`save_id`),
  UNIQUE KEY `user_id` (`user_id`,`recipe_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `saved_recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `saved_recipes_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_recipes`
--

LOCK TABLES `saved_recipes` WRITE;
/*!40000 ALTER TABLE `saved_recipes` DISABLE KEYS */;
INSERT INTO `saved_recipes` VALUES (1,1,21,'2024-06-26 13:21:02'),(3,3,23,'2024-06-26 15:06:51'),(4,3,22,'2024-06-26 15:07:09'),(5,5,22,'2024-06-26 15:57:50'),(9,1,11,'2024-06-26 18:00:25'),(36,1,61,'2024-06-27 07:17:54'),(39,1,60,'2024-06-27 09:25:56'),(40,8,23,'2024-06-27 11:24:14'),(41,11,22,'2024-06-27 11:47:28'),(42,5,61,'2024-06-27 11:54:42'),(43,5,62,'2024-06-27 12:50:14'),(44,5,23,'2024-06-27 12:50:54'),(45,5,64,'2024-06-27 13:04:57'),(46,5,21,'2024-06-27 13:20:44'),(49,5,60,'2024-06-28 06:14:45'),(50,11,23,'2024-06-28 06:26:19'),(51,1,23,'2024-06-28 07:26:53'),(52,4,68,'2024-06-28 15:51:33'),(53,4,23,'2024-06-28 16:21:41'),(54,5,68,'2024-06-28 17:56:45'),(57,5,11,'2024-06-28 18:10:41'),(59,1,22,'2024-06-29 05:28:13');
/*!40000 ALTER TABLE `saved_recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'titusshachinrex','$2a$10$/VuVAK4GcN0ShquF5U1Z5.EKaSsNyRAlaUV74ygDr6gN5cDdRbRq6'),(2,'raja','$2a$10$j.pHXqP1WMAsz6oL8cy9Qeg0lWnwkvDvLPZ7x9y90IJcDCWXwsW6u'),(3,'arul','$2a$10$fTiy01M5Wt1eTprJ.qPmHOYo1Z4OO.eExbpcUDizbwkfRSuNKdqae'),(4,'rex','$2a$10$5OHLzmAVDGQslZC.qUNE5u9C5D.t3wvcNZm771GVDjWNQ8a/rUm02'),(5,'jaya','$2a$10$CjqWZVRRuf4L52hm6T2.veaXesKYwFf7Rt0.LG7KVQ.S7cVD6Y.Y6'),(6,'brad','$2a$10$Nu3ihQNnuS7VacjUohjhZOFunzmfWNqfkXdC2wnbAzrpDaiShs5i2'),(7,'sam','$2a$10$0YB.SmYITDerbuvABDewAul4fgjBuCnlWoG5cyNynXSMjOk69AULu'),(8,'elon','$2a$10$Lu1zqR3vB.qAW5Qg128xO.0Tyw.lbEuI9FwLak0rqcFDfPtFlmGeu'),(9,'jason','$2a$10$BQ2wgsHiyeYI5ok2i58RFew9o1kItxEjvGiZp3kBtPDdIbNR6KlOC'),(10,'jaya','$2a$10$SRPAaMOSwzTOCyNLorw0GOedSwKvbFVW5.FsyHtDxuKGiyHVobbc6'),(11,'tina','$2a$10$HI.YhPzAYlQwKFzovC1UoeWGb1uKMLBeXQaE.GhNAoE3KP87XN.CO');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-29 12:57:37
