const express = require("express");
const router = express.Router();
const Activities = require("../models/Activities");

// GET /api/activities
router.get("/", async (req, res) => {
    try {
        console.log("hej z endpointu");
        const activities = await Activities.find();
        res.json(activities);
    } catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({
            error: "An error occurred while fetching activities",
        });
    }
});

module.exports = router;
