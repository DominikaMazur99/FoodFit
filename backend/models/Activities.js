const { Schema, model } = require("mongoose");

const activitiesSchema = new Schema({
    calories: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const Activities = model("activities", activitiesSchema);

module.exports = Activities;
