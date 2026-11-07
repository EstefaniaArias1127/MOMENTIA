const mongoose = require("mongoose");

// Creamos la estructura de una solicitud
const solicitudSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    correo: {
        type: String,
        required: true
    },

    mensaje: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

// Creamos el modelo
const Solicitud = mongoose.model("Solicitud", solicitudSchema);

// Exportamos el modelo para utilizarlo en server.js
module.exports = Solicitud;