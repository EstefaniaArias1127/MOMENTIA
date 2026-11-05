const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.json());

// Conectar MOMENTIA con MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/momentia")
    .then(() => {
        console.log("MongoDB conectado correctamente");

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al conectar con MongoDB:", error);
    });

// Ruta principal
app.get("/", (req, res) => {
    res.send("¡Bienvenido al servidor de MOMENTIA!");
});
