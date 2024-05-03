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

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const calculator = await Calculator.findById(id);
        if (!calculator) {
            return res.status(404).json({ error: "Calculator not found" });
        }
        res.json(calculator);
    } catch (error) {
        console.error("Error fetching calculator:", error);
        res.status(500).json({
            error: "An error occurred while fetching the calculator",
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

router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body; // Assuming req.body contains the fields to update

    try {
        const calculator = await Calculator.findByIdAndUpdate(id, updates, {
            new: true,
        });

        if (!calculator) {
            return res.status(404).json({ message: "Calculator not found" });
        }

        res.status(200).json(calculator);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
