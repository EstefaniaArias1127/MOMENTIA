const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema(
    {
        cliente: {
            nombre: {
                type: String,
                required: true,
                trim: true
            },
            correo: {
                type: String,
                required: true,
                trim: true,
                lowercase: true
            },
            telefono: {
                type: String,
                required: true,
                trim: true
            }
        },

        experiencias: [
            {
                id: {
                    type: Number,
                    required: true
                },
                nombre: {
                    type: String,
                    required: true
                },
                precio: {
                    type: Number,
                    required: true,
                    min: 0
                },
                cantidad: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],

        total: {
            type: Number,
            required: true,
            min: 0
        },

        estado: {
            type: String,
            enum: ["Pendiente", "Confirmado", "Cancelado"],
            default: "Pendiente"
        }
    },
    {
        timestamps: true
    }
);

const Pedido = mongoose.model("Pedido", pedidoSchema);

module.exports = Pedido;