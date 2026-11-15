const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Solicitud = require("./models/Solicitud");

const app = express();
const PORT = 3000;

// Configuración de CORS para permitir la conexión con React
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
};
// Diagnóstico de solicitudes
app.use((req, res, next) => {
    console.log("PETICIÓN RECIBIDA:", req.method, req.url);
    console.log("ORIGEN:", req.headers.origin);
    next();
});

// Configuración de CORS
app.use(cors(corsOptions));
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

// Ruta para recibir solicitudes del formulario
app.post("/api/solicitudes", async (req, res) => {
    try {
        const nuevaSolicitud = new Solicitud({
            nombre: req.body.nombre,
            correo: req.body.correo,
            mensaje: req.body.mensaje
        });

        await nuevaSolicitud.save();

        res.status(201).json({
            mensaje: "Solicitud guardada correctamente"
        });

    } catch (error) {
        console.error("Error al guardar la solicitud:", error);

        res.status(500).json({
            mensaje: "No se pudo guardar la solicitud"
        });
    }
});