const mongoose = require("mongoose");

// Estructura de los datos del administrador
const administradorSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Administrador = mongoose.model("Administrador", administradorSchema);

module.exports = Administrador;