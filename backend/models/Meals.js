const mongoose = require("mongoose");

const mealsSchema = new mongoose.Schema({
    calories: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

//const Product = mongoose.model('Product', productSchema);

module.exports = mongoose.models.Meals || mongoose.model("Meals", mealsSchema);
