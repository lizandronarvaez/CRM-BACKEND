import express from "express";
import { isValidToken } from "../middlewares/isValidToken.js";
import {
    actualizarPedido,
    crearPedido,
    eliminarPedido,
    mostrarPedido,
    mostrarPedidos
} from "../services/pedidosControllers.js";
// instancia de express.router
const route = express.Router();
route
    // Crear un nuevo pedido
    .post("/pedidos/nuevo/:_id", isValidToken, crearPedido)
    // Mostrar todos los pedidos
    .get("/pedidos", isValidToken, mostrarPedidos)
    // Muestra los pedidos por su id
    .get("/pedidos/:_id", isValidToken, mostrarPedido)
    // Actualizar un pedido
    .put("/pedidos/:_id", isValidToken, actualizarPedido)
    // ELiminar un pedido
    .delete("/pedidos/:_id", isValidToken, eliminarPedido);

export default route;
