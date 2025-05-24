const express = require("express");
const router = express.Router();
const { supabase } = require("../services/supabase");
const authMiddleware = require("../middleware/authMiddleware");

// Obtener todos los apuntes del usuario
router.get("/", authMiddleware, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("apuntes")
            .select("*")
            .eq("user_uuid", req.user.id);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Obtener un apunte por ID
router.get("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("apuntes")
            .select("*")
            .eq("id", id)
            .eq("user_uuid", req.user.id);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Crear un nuevo apunte
router.post("/", authMiddleware, async (req, res) => {
    const { materia_id, contenido, titulo } = req.body; // Agregar "titulo"
    try {
        const { data, error } = await supabase.from("apuntes").insert([
            {
                materia_id,
                contenido,
                titulo, // Incluir "titulo"
                user_uuid: req.user.id,
            },
        ]);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Actualizar un apunte por ID
router.put("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { contenido, titulo } = req.body; // Agregar "titulo"
    try {
        const { data, error } = await supabase
            .from("apuntes")
            .update({ contenido, titulo }) // Incluir "titulo"
            .eq("id", id)
            .eq("user_uuid", req.user.id);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Eliminar un apunte por ID
router.delete("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("apuntes")
            .delete()
            .eq("id", id)
            .eq("user_uuid", req.user.id);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;