import express from "express";
import { registerUser, loginUser } from "../services/userService";
// instancia de express.router
const route = express.Router();
// Rutas usuarios
route
    // Ruta crear usuario
    .post("/register", registerUser)
    .post("/login", loginUser);

export default route;
