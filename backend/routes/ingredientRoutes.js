const express = require("express");
const router = express.Router();
const Ingredients = require("../models/Ingredients");

// GET /api/ingredients
router.get("/", async (req, res) => {
    try {
        const ingredients = await Ingredients.find();
        res.json(ingredients);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            error: "An error occurred while fetching products",
        });
    }
});

module.exports = router; // Ensure you're exporting the router
