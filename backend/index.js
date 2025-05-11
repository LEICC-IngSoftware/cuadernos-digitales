const express = require("express");
const cors = require("cors");

//2. Cargar variables de entorno
require("dotenv").config();

// 1. Levantar express
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

// 3. Cargar rutas
const authRoutes = require("./routes/auth.js");
app.use("/auth", authRoutes);

const materiasRoutes = require("./routes/materias.js");
app.use("/materias", materiasRoutes);

const apuntesRoutes = require("./routes/apuntes.js");
app.use("/apuntes", apuntesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
