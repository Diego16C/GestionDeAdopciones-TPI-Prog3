import express from "express";
import petRoutes from "./routes/pet.routes.js";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import "./models/indexModels.js";

const app = express();

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});


app.use(petRoutes);

const startServer = async () => {
  try {
    //  Se sincroniza base de datos antes de levantar el server
    await sequelize.sync({ alter: true }); // actualiza tablas si cambian columnas
    console.log("Base de datos sincronizada correctamente.");

    // Levanta el server
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });

  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); // salir del proceso si falla la inicialización
  }
};

// ejecuta la función
startServer();
