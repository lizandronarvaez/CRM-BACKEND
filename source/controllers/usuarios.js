import express from "express";
import { autenticarUsuario, registrarUsuario } from "../services/usuarios";
// instancia de express.router
const route = express.Router();
// Rutas usuarios
route
    // Ruta crear usuario
    .post("/registrar-usuario", registrarUsuario)
    .post("/iniciar-sesion", autenticarUsuario);

export default route;
