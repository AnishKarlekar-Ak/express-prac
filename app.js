const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const recipesRoutes = require('./Routes/recipes'); // Import the recipes routes

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors())

// Use the routes defined in recipes.js
app.use('/recipes', recipesRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/RecipeProj', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB!");
}).catch((error) => {
  console.error("Error connecting to MongoDB", error);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
