const { supabase } = require("../services/supabase");

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }

        // Agregar el usuario autenticado al objeto de la solicitud
        req.user = data.user;
        next();
    } catch (error) {
        console.error("Error validating token:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = authMiddleware;