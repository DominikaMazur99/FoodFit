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

// GET /api/users pobieranie uzytkownika z bazy - logowanie
router.get("/", async (req, res) => {
    const { userName } = req.query; //w body musi byc i login i haslo, zmienic
    console.log("server userName", userName);
    try {
        const user = await User.findOne({ userName });

        // Jeśli użytkownik o podanym loginie nie istnieje error
        if (!user) {
            return res
                .status(404)
                .json({
                    message:
                        "Użytkownik o podanym loginie nie został znaleziony.",
                });
        }
        // Jeśli użytkownik został znaleziony, zwróć go w odpowiedzi haslo id itd.
        res.status(200).json(user); //na froncie sprawdzic czy haslo tego usera jest rowne haslowi podanemu
    } catch (error) {
        // Jeśli wystąpił błąd podczas wyszukiwania użytkownika, zwróć błąd serwera
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
