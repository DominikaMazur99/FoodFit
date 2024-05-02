const express = require("express");
const router = express.Router();
const Meals = require("../models/Meals");

// GET /api/products
router.get("/api/meals", async (req, res) => {
    try {
        const meals = await Meals.find();
        res.json(meals);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            error: "An error occurred while fetching products",
        });
    }
});

// POST /api/products
router.post("/api/meals", async (req, res) => {
    try {
        const newMeals = new Meals({
            date: req.body.date,
            calories: req.body.calories,
        });

        await newMeals.save();
        res.json(newMeals);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            error: "An error occurred while adding the product",
        });
    }
});

// DELETE /api/products/:id
router.delete("/api/meals/:id", async (req, res) => {
    try {
        await Meals.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            error: "An error occurred while deleting the product",
        });
    }
});

// Update a product

// PUT /api/products/:idr
router.put("/api/meals/:id", async (req, res) => {
    try {
        const mealId = req.params.id;
        const updatedMealsData = {
            calories: req.body.calories,
            date: req.body.date,
            // You can add other properties that you want to update
        };

        const updatedMeal = await Meals.findByIdAndUpdate(
            mealId,
            updatedMealsData,
            {
                new: true, // Return the updated product
            }
        );

        if (!updatedMeal) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(updatedMeal);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            error: "An error occurred while updating the product",
        });
    }
});

module.exports = router;
