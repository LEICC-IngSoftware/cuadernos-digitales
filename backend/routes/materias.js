const express = require("express");
const router = express.Router();
const { supabase } = require("../services/supabase");
const authMiddleware = require("../middleware/authMiddleware");

// Obtener todas las materias del usuario autenticado
router.get("/", authMiddleware, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("materias")
            .select("*")
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

// Obtener una materia por ID
router.get("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("materias")
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

// Crear una nueva materia
router.post("/", authMiddleware, async (req, res) => {
    const { materia } = req.body;
    try {
        const { data, error } = await supabase.from("materias").insert([
            {
                nombre: materia,
                user_uuid: req.user.id,
            },
        ]);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Actualizar una materia por ID
router.put("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { materia } = req.body;
    try {
        const { data, error } = await supabase
            .from("materias")
            .update({ nombre: materia })
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

// Eliminar una materia por ID
router.delete("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("materias")
            .delete()
            .eq("id", id)
            .eq("user_uuid", req.user.id);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;