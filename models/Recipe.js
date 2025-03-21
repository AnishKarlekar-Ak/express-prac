const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['veg', 'non-veg', 'vegan', 'keto', 'gluten-free'], // Add other types as needed
    required: true
  },
  tags: [String], // Array of tags for categorization
  ingredients: [{
    name: String,
    quantity: String
  }],
  cholesterolLevel: {
    type: String, // Can store as a string (e.g., "low", "medium", "high") or a number
    required: true
  },
  fatLevel: {
    type: String, // Can store as a string (e.g., "low", "medium", "high") or a number
    required: true
  },
  calories: {
    type: Number, // Total calorie count per serving or recipe
    required: false
  },
  cuisine: {
    type: String, // e.g., Italian, Indian, etc.
    required: false
  },
  difficultyLevel: {
    type: String, // e.g., Easy, Medium, Hard
    enum: ['Easy', 'Medium', 'Hard'],
    required: false
  },
  image: {
    type: String, // URL or file path to recipe image
    required: false
  },
  prepMethod: {
    type: String, // e.g., baked, fried, etc.
    required: false
  },
  storageInstructions: {
    type: String, // Guidelines for storing the recipe
    required: false
  },
  allergens: [String], // Array of allergens
  author: {
    type: String, // Recipe creator or author
    required: false
  },
  instructions: [{
    step: Number,
    description: String
  }],
  prepTime: {
    type: Number, // Time in minutes
    required: true
  },
  cookTime: {
    type: Number, // Time in minutes
    required: true
  },
  totalTime: {
    type: Number, // Total time in minutes (prepTime + cookTime)
    required: false
  },
  servings: {
    type: Number,
    required: true
  },
  dietaryRestrictions: [String], // Array for any dietary restrictions
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'recipes');


module.exports = Recipe;
