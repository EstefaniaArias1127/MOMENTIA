// Cargar variables de entorno
require("dotenv").config();

// Importar dependencias
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Importar modelo
const Solicitud = require("./models/Solicitud");

// Crear aplicación
const app = express();
const PORT = process.env.PORT || 3000;

// CONFIGURACIÓN CORS
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204
};

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());

// DIAGNÓSTICO DE SOLICITUDES
app.use((req, res, next) => {
    console.log("PETICIÓN RECIBIDA:", req.method, req.url);
    console.log("ORIGEN:", req.headers.origin);
    next();
});

// RUTA PRINCIPAL
app.get("/", (req, res) => {
    res.send("¡Bienvenido al servidor de MOMENTIA!");
});

// INICIO DE SESIÓN DEL ADMINISTRADOR
app.post("/api/admin/login", async (req, res) => {
    try {
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({
                mensaje: "Debes ingresar usuario y contraseña"
            });
        }

        if (
            !process.env.ADMIN_USER ||
            !process.env.ADMIN_PASSWORD ||
            !process.env.JWT_SECRET
        ) {
            return res.status(500).json({
                mensaje: "La configuración del administrador está incompleta"
            });
        }

        if (
            usuario !== process.env.ADMIN_USER ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({
                mensaje: "Usuario o contraseña incorrectos"
            });
        }

        const token = jwt.sign(
            { usuario: usuario },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        return res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            token: token
        });

    } catch (error) {
        console.error("Error en el inicio de sesión:", error);

        return res.status(500).json({
            mensaje: "Error al iniciar sesión"
        });
    }
});

// RECIBIR SOLICITUDES DEL FORMULARIO
app.post("/api/solicitudes", async (req, res) => {
    try {
        const { nombre, correo, mensaje } = req.body;

        if (!nombre || !correo || !mensaje) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const nuevaSolicitud = new Solicitud({
            nombre: nombre,
            correo: correo,
            mensaje: mensaje
        });

        await nuevaSolicitud.save();

        return res.status(201).json({
            mensaje: "Solicitud guardada correctamente"
        });

    } catch (error) {
        console.error("Error al guardar la solicitud:", error);

        return res.status(500).json({
            mensaje: "No se pudo guardar la solicitud"
        });
    }
});

// VERIFICAR AUTENTICACIÓN DEL ADMINISTRADOR
function verificarToken(req, res, next) {
    const autorizacion = req.headers.authorization;

    if (!autorizacion || !autorizacion.startsWith("Bearer ")) {
        return res.status(401).json({
            mensaje: "Debes iniciar sesión para acceder"
        });
    }

    const token = autorizacion.split(" ")[1];

    try {
        const verificado = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.administrador = verificado;
        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: "Sesión inválida o expirada"
        });
    }
}

// CONSULTAR SOLICITUDES RECIBIDAS
app.get("/api/solicitudes", verificarToken, async (req, res) => {
    try {
        const solicitudes = await Solicitud.find().sort({
            createdAt: -1
        });

        return res.status(200).json(solicitudes);

    } catch (error) {
        console.error("Error al consultar las solicitudes:", error);

        return res.status(500).json({
            mensaje: "No se pudieron consultar las solicitudes"
        });
    }
});

// CONECTAR CON MONGODB
mongoose.connect(
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/momentia"
)
.then(() => {
    console.log("MongoDB conectado correctamente");

    app.listen(PORT, () => {
        console.log("Servidor corriendo en http://localhost:" + PORT);
    });
})
.catch((error) => {
    console.error("Error al conectar con MongoDB:", error);
});