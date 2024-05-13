const { Schema, model } = require("mongoose");

const UsersMealsSchema = new Schema(
    {
        date: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        gram: {
            type: Number,
            required: true,
        },
        calories: {
            type: Number,
            required: true,
        },
    },

    { collection: false }
);

const UserMeals = model("user-meals", UsersMealsSchema);
module.exports = { UsersMealsSchema, UserMealsModel: UserMeals };
