const express = require("express");
const router = express.Router();
const Calculator = require("../models/Calculator");

// GET /api/products
router.get("/", async (req, res) => {
    try {
        const calculator = await Calculator.find();
        res.json(calculator);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            error: "An error occurred while fetching products",
        });
    }
});

// POST /api/products
router.post("/", async (req, res) => {
    const newCalculator = new Calculator(req.body);
    try {
        const calculator = await newCalculator.save();
        if (!calculator)
            throw new Error("Something went wrong saving the Todo");
        res.status(200).json(calculator);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
