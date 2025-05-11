const router = require("express").Router();
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
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const { session } = data;
        return res.status(200).json({ token: session.access_token, user: session.user });
    } catch (error) {
        console.error(error);
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
    console.log(req.headers.authorization);
    try {
        const { data } = await supabase.auth.getUser(req.headers.authorization);
        const user = data.user;
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