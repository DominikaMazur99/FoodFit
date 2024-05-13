const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/users dodawanie użytkownika do bazy - rejestracja
router.post("/", async (req, res) => {
    const newUser = new User(req.body);
    try {
        const user = await newUser.save();
        if (!user) throw new Error("Something went wrong saving the Todo");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// router.get("/", async (req, res) => {
//     const { userName } = req.query;
//     try {
//         let users;
//         if (userName) {
//             users = await User.findOne({ userName: userName });
//         } else {
//             users = await User.find();
//         }
//         res.json(users);
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         res.status(500).json({
//             error: "An error occurred while fetching users",
//         });
//     }
// });

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            error: "An error occurred while fetching products",
        });
    }
});

module.exports = router;
