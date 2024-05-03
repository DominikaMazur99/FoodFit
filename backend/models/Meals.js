const { Schema, model } = require("mongoose");

const mealsSchema = new Schema({
    calories: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

const Meals = model("meals", mealsSchema);

module.exports = Meals;
