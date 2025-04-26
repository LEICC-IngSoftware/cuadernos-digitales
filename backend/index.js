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
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
