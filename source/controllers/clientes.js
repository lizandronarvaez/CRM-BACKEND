import express from "express";
// Controladores de rutas
import {
    actualizarCliente,
    crearCliente,
    eliminarCLiente,
    mostrarClientes,
    mostrarUnCliente
} from "../services/clientes.js";
// Verifiacion de token
import { isValidToken } from "../middlewares/isValidToken.js";
// instancia de express.router
const route = express.Router();
// rutas
route
    .post("/clientes", isValidToken, crearCliente)
    // Obetener todos los clientes
    .get("/clientes", isValidToken, mostrarClientes)
    // Obtener solo un cliente
    .get("/clientes/:_id", isValidToken, mostrarUnCliente)
    // Actualizar un cliente
    .put("/clientes/:_id", isValidToken, actualizarCliente)
    // Eliminar un cliente
    .delete("/clientes/:_id", eliminarCLiente);

export default route;
