const express = require("express");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");

// post /api/meals
router.get("/", async (req, res) => {
    const { userName, date } = req.query;

    try {
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({ data: "uztykownik nie istnieje" });
        }

        console.log(user, date);

        const matchingMeals = user.meals.filter((meal) => {
            return (
                new Date(meal.date).toDateString() ===
                new Date(date).toDateString()
            );
        });

        console.log("matchingMeals", matchingMeals);

        res.status(201).json({ meals: matchingMeals });
    } catch (error) {
        console.error("Error post meals:", error);
        res.status(500).json({
            error: "An error occurred while fetching meals",
        });
    }
});

router.post("/", async (req, res) => {
    const { userName, name, calories, gram, date, type } = req.body;

    try {
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({ data: "Użytkownik nie istnieje" });
        }

        const newMeal = {
            name: name,
            calories: calories,
            gram: gram,
            date: date,
            type: type,
        };

        user.meals.push(newMeal);
        await user.save();

        res.status(201).json({
            message: "Aktywność została dodana pomyślnie",
            meal: newMeal,
        });
    } catch (error) {
        console.error("Błąd dodawania aktywności:", error);
        res.status(500).json({
            error: "Wystąpił błąd podczas dodawania aktywności",
        });
    }
});

module.exports = router;
