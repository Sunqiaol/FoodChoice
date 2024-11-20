const express = require('express');
const router = express.Router();
const Food = require('../models/food');

// Get all foods
router.get('/getAllFoods', async (req, res) => {
    try {
        const foods = await Food.findAll();
        res.status(200).json(foods);
    } catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).json({ error: 'An error occurred while fetching foods' });
    }
});

// Update the `type` field
router.post('/updateType', async (req, res) => {
    const { id, type } = req.body;

    try {
        if (!id || !Array.isArray(type)) {
            return res.status(400).json({ error: 'Food ID and valid type array are required' });
        }

        const foodItem = await Food.findByPk(id);
        if (!foodItem) {
            return res.status(404).json({ error: 'Food item not found' });
        }

        foodItem.type = type;
        await foodItem.save();

        res.status(200).json({ message: 'Type updated successfully', food: foodItem });
    } catch (error) {
        console.error('Error updating type:', error);
        res.status(500).json({ error: 'An error occurred while updating the type' });
    }
});

// Update the `ingredients` field
router.post('/updateIngredients', async (req, res) => {
    const { id, ingredients } = req.body;

    try {
        if (!id || !Array.isArray(ingredients)) {
            return res.status(400).json({ error: 'Food ID and valid ingredients array are required' });
        }

        const foodItem = await Food.findByPk(id);
        if (!foodItem) {
            return res.status(404).json({ error: 'Food item not found' });
        }

        foodItem.ingredients = ingredients;
        await foodItem.save();

        res.status(200).json({ message: 'Ingredients updated successfully', food: foodItem });
    } catch (error) {
        console.error('Error updating ingredients:', error);
        res.status(500).json({ error: 'An error occurred while updating the ingredients' });
    }
});



module.exports = router;
