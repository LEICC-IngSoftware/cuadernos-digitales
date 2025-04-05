const express = require("express");
const router = express.Router();
const {supabase} = require("../services/supabase");

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, error } = await supabase.auth.signIn({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/logout", async (req, res) => {
    try {
        await supabase.auth.signOut();
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/user", async (req, res) => {
    try {
        const { user } = await supabase.auth.getUser();
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/reset-password", async (req, res) => {
    const { email } = req.body;

    try {
        await supabase.auth.api.resetPasswordForEmail(email);
        return res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}); 

module.exports = router;