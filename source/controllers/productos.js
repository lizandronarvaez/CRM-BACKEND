import express from "express";
import { isValidToken } from "../middlewares/isValidToken.js";
import {
    actualizarProducto,
    agregarProducto,
    buscarProductos,
    eliminarProducto,
    mostarProductos,
    mostrarPoducto,
    subirArchivo
} from "../services/productosControllers.js";
// instancia de express.router
const route = express.Router();
route

    // Agregar un nuevo producto
    .post("/productos", isValidToken, subirArchivo, agregarProducto)
    // Muestra todos los productos disponibles
    .get("/productos", isValidToken, mostarProductos)
    // Muestra solo un producto
    .get("/productos/:_id", isValidToken, mostrarPoducto)
    // Actualiza un producto
    .put("/productos/:_id", isValidToken, subirArchivo, actualizarProducto)
    // Eliminar un producto
    .delete("/productos/:_id", isValidToken, eliminarProducto)
    // Buscar todos los productos por un query
    .get("/productos/clientes/:query", isValidToken, buscarProductos);

export default route;
