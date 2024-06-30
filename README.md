# Recipe App Spider

## Introduction
Tasty Tender is a web application for exploring recipes based on ingredients and filter it. This README provides detailed setup instructions and an overview of the application's features.

## Setup Instructions

### Prerequisites
- Node.js
- MySQL Workbench

### Step-by-Step Guide

#### 1. Download and Extract Recipe App

1. **Download the ZIP File**: Obtain the `recipeapp.zip` file.
2. **Extract the ZIP File**:
   - Extract the contents of `recipeapp.zip` to a folder (e.g., `recipeapp`).
   - Inside the extracted folder, you should see a subfolder named `demo`.
3. **Move the Demo Folder**:
   - Cut the `demo` folder and paste it on your desktop as an independent folder.

#### 2. Set Up the Database

1. **Download the SQL Dump File**: Obtain the `recipeappdatabase.sql` file.
2. **Open MySQL Workbench**:
   - Ensure your MySQL server is running.
   - Open MySQL Workbench.
3. **Import the SQL Dump**:
   - Open the SQL file (`recipeappdatabase.sql`) in MySQL Workbench.
   - Run the script to create the database and tables.
   - Note the schema name you created from the dump file.

#### 3. Configure the Application

1. **Open the `demo` Folder in VS Code**:
   - Open Visual Studio Code (VS Code).
   - Open the `demo` folder on your desktop.
2. **Edit the `.env` File**:
   - Locate the `.env` file in the `demo` folder.
   - Update the SQL password to match your MySQL server's password.
   - Update the database name to match the schema name you created from the dump file.

#### 4. Start the Application

1. **Open the Terminal in VS Code**:
   - In VS Code, open the terminal.
2. **Install Dependencies and Start the Server**:
     make sure you already have nodejs installed
   - Run the following commands:
     ```sh
     npm start dev
     ```
   - This will start the server on `localhost:3000`.
   - you will see terminal output like
                       ```sh
                       Server started on port 3000
                       Connected to MySQL as id 14
                      ```

#### 5. Access the Application

1. **Open a Web Browser**:
   - Navigate to `http://localhost:3000/login`.
2. **Register and Login**:
   - Go to the register page and create a new account.
   - After registering, you will be redirected to the login page.
   - Enter your username and password to log in.

#### 6. this is link for demo of the recipe app

