const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3010;

// Import Meals model and routes

const mealsRoutes = require("./routes/mealsRoutes"); // Adjust the path as needed

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

const CONNECTION_STRING =
    "mongodb+srv://admin:admin123@cluster0.lyyxbjg.mongodb.net/";

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Use bodyParser middleware
app.use(bodyParser.json());

// Use mealsRoutes for /api/meals endpoints
app.use("/api/meals", mealsRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
