const express = require('express');
const Recipe = require('../models/Recipe'); // Import the Recipe model
const router = express.Router();

console.log("Collection Name:", Recipe.collection.name);


// POST (Create a new Recipe)
router.post('/', async (req, res) => {
  try {
    const recipe = new Recipe(req.body); // Get data from request body
    await recipe.save();
    res.status(201).json(recipe); // Send back the created recipe
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET (Retrieve all Recipes)
router.get('/', async (req, res) => {
    try {
      const recipes = await Recipe.find(); // Fetch all recipes
      if (recipes.length === 0) {
        return res.status(200).json({ message: 'No recipes found' }); // Custom message for empty collection
      }
      res.status(200).json(recipes); // Return all recipes
    } catch (error) {
      console.error("Error fetching recipes", error);
      res.status(400).json({ error: error.message });
    }
  });
  

// GET (Retrieve a single Recipe by recipeId)
router.get('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ recipeId: req.params.recipeId });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH (Update a Recipe)
router.patch('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { recipeId: req.params.recipeId },
      { $set: req.body }, // Update the recipe with the new data
      { new: true } // Return the updated recipe
    );
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE (Remove a Recipe)
router.delete('/:recipeId', async (req, res) => {
  try {
    const result = await Recipe.findOneAndDelete({ recipeId: req.params.recipeId });
    if (!result) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
