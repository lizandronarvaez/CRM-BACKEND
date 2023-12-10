import express from "express";
import {
    clientCreate,
    getAllClients,
    getClientBy,
    clientUpdate,
    clientDelete
} from "../services/clientService.js";
// Verifiacion de token
import { isValidToken } from "../middlewares/isValidToken.js";
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
