const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Default MAMP username
  password: "root", // Default MAMP password
  database: "Destinify", // Replace with your database name
  port: 8889, // Default MySQL port for MAMP
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1); // Exit if connection fails
  }
  console.log("Connected to the MySQL database.");

  // Ensure the Users table exists
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      contact VARCHAR(15) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log("Users table is ready.");
    }
  });
});

// API endpoint to handle form submission
app.post("/create-profile", async (req, res) => {
  const { username, email, contact, password, confirmPassword } = req.body;

  // Validation
  if (!username || !email || !contact || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into the database
    const query = `
      INSERT INTO Users (username, email, contact, password_hash)
      VALUES (?, ?, ?, ?)
    `;
    const values = [username, email, contact, hashedPassword];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting data:", err.message);
        return res.status(500).json({ error: "Failed to create profile." });
      }
      res.status(200).json({ message: "Profile created successfully." });
    });
  } catch (err) {
    console.error("Error hashing password:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
