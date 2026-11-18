// CARGAR VARIABLES DE ENTORNO
require("dotenv").config();

// IMPORTAR DEPENDENCIAS
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// IMPORTAR MODELO
const Solicitud = require("./models/Solicitud");

// CREAR APLICACIÓN
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
        console.error("Error en el inicio de sesión:", error.message);

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
        console.error("Error al guardar la solicitud:", error.message);

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
        console.error("Error al consultar las solicitudes:", error.message);

        return res.status(500).json({
            mensaje: "No se pudieron consultar las solicitudes"
        });
    }
});

// ASISTENTE INTELIGENTE DE RECOMENDACIONES DE MOMENTIA
app.post("/api/ia/chat", (req, res) => {
    try {
        const { mensaje, experiencias } = req.body;

        if (!mensaje || typeof mensaje !== "string") {
            return res.status(400).json({
                mensaje: "Debes escribir un mensaje válido"
            });
        }

        if (!Array.isArray(experiencias)) {
            return res.status(400).json({
                mensaje: "No se recibió el catálogo de experiencias"
            });
        }

        const normalizar = (texto) =>
            String(texto || "")
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

        const textoUsuario = normalizar(mensaje);

        // Detectar presupuesto
        let presupuesto = null;

        const presupuestoMil = textoUsuario.match(
            /(?:hasta|menos de|maximo|presupuesto de)?\s*\$?\s*(\d+(?:[.,]\d+)?)\s*mil/
        );

        const presupuestoNumero = textoUsuario.match(
            /(?:hasta|menos de|maximo|presupuesto de)?\s*\$?\s*(\d{4,7}(?:[.,]\d{3})*)/
        );

        if (presupuestoMil) {
            presupuesto = Number(
                presupuestoMil[1].replace(",", ".")
            ) * 1000;
        } else if (presupuestoNumero) {
            presupuesto = Number(
                presupuestoNumero[1].replace(/[.,]/g, "")
            );
        }

        // Palabras clave para encontrar experiencias
        const palabras = textoUsuario
            .split(/[^a-z0-9]+/)
            .filter(palabra => palabra.length > 2);

        const resultados = experiencias
            .map(experiencia => {
                const contenido = normalizar([
                    experiencia.nombre,
                    experiencia.descripcion,
                    ...(experiencia.ocasiones || []),
                    ...(experiencia.personas || [])
                ].join(" "));

                let puntuacion = 0;

                palabras.forEach(palabra => {
                    if (contenido.includes(palabra)) {
                        puntuacion++;
                    }
                });

                return {
                    ...experiencia,
                    puntuacion
                };
            })
            .filter(experiencia => {
                const precio = Number(experiencia.precio) || 0;

                return presupuesto === null || precio <= presupuesto;
            })
            .sort((a, b) => {
                if (b.puntuacion !== a.puntuacion) {
                    return b.puntuacion - a.puntuacion;
                }

                return a.precio - b.precio;
            });

        if (resultados.length === 0) {
            return res.status(200).json({
                respuesta: presupuesto
                    ? "No encontré experiencias dentro de ese presupuesto. ¿Te gustaría aumentar un poco el valor?"
                    : "No encontré una experiencia relacionada. Cuéntame qué le gusta a esa persona y te ayudaré a elegir."
            });
        }

        const recomendadas = resultados
            .filter(item => item.puntuacion > 0)
            .slice(0, 3);

        const seleccionadas = recomendadas.length > 0
            ? recomendadas
            : resultados.slice(0, 3);

        const lista = seleccionadas.map(experiencia =>
            `• ${experiencia.nombre}: $${Number(experiencia.precio).toLocaleString("es-CO")}`
        ).join("\n");

        const respuesta =
            `¡Tengo algunas ideas para ti! Estas experiencias podrían ser perfectas:\n\n${lista}\n\n` +
            "¿Cuál de estas opciones te llama más la atención?";

        return res.status(200).json({
            respuesta,
            recomendaciones: seleccionadas
        });

    } catch (error) {
        console.error("Error en el asistente de Momentia:", error);

        return res.status(500).json({
            mensaje: "No pudimos procesar tu solicitud. Inténtalo nuevamente."
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