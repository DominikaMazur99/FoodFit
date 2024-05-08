const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
    calories: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
});

const Ingredient = model("ingredient", ingredientSchema);

module.exports = Ingredient;
