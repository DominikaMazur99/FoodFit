const { Schema, model } = require("mongoose");

const calculatorSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    caloric_demand: {
        type: Number,
        required: true,
    },
});

const Calculator = model("calculator", calculatorSchema);

module.exports = Calculator;
