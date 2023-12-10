import express from "express";
// Controladores de rutas

import {
    clientCreate,
    getAllClients,
    getClientBy,
    clientUpdate,
    clientDelete
} from "../services/clientService";
// Verifiacion de token
import { isValidToken } from "../middlewares/isValidToken";
// instancia de express.router
const route = express.Router();
// rutas
route
    .post("/clientes", isValidToken, clientCreate)
    .get("/clientes", isValidToken, getAllClients)
    .get("/clientes/:_id", isValidToken, getClientBy)
    .put("/clientes/:_id", isValidToken, clientUpdate)
    .delete("/clientes/:_id", clientDelete);

export default route;
