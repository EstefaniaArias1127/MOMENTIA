
const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("¡Bienvenido al servidor de MOMENTIA!");
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
