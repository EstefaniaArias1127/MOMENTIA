require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Solicitud = require("./models/Solicitud");
const Administrador = require("./models/Administrador");
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

// Funciones que preparan y controlan las solicitudes que llegan al servidor(Configuración de middlewares)
app.use(cors(corsOptions));
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.send("¡Bienvenido al servidor de MOMENTIA!");
});
// Ruta para iniciar sesión como administrador
app.post("/api/admin/login", async (req, res) => {
    try {
        const { usuario, password } = req.body;

        // Verificar que los datos no estén vacíos
        if (!usuario || !password) {
            return res.status(400).json({
                mensaje: "Debes ingresar usuario y contraseña"
            });
        }

        // Verificar las credenciales configuradas
        if (
            usuario !== process.env.ADMIN_USER ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({
                mensaje: "Usuario o contraseña incorrectos"
            });
        }

        // Generar un token de acceso
        const token = jwt.sign(
            { usuario },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            token
        });

    } catch (error) {
        console.error("Error en el inicio de sesión:", error);

        res.status(500).json({
            mensaje: "Error al iniciar sesión"
        });
    }
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
// Verificar que el administrador esté autenticado
function verificarToken(req, res, next) {
    const autorizacion = req.headers.authorization;

    if (!autorizacion) {
        return res.status(401).json({
            mensaje: "Debes iniciar sesión para acceder"
        });
    }

    const token = autorizacion.split(" ")[1];

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);

        req.administrador = verificado;

        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: "Sesión inválida o expirada"
        });
    }
}
// Ruta para consultar las solicitudes recibidas
app.get("/api/solicitudes", async (req, res) => {
    try {
        const solicitudes = await Solicitud.find().sort({ createdAt: -1 });

        res.status(200).json(solicitudes);

    } catch (error) {
        console.error("Error al consultar las solicitudes:", error);

        res.status(500).json({
            mensaje: "No se pudieron consultar las solicitudes"
        });
    }
});

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