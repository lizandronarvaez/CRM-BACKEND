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
    .post("/", isValidToken, clientCreate)
    .get("/", isValidToken, getAllClients)
    .get("/:_id", isValidToken, getClientBy)
    .put("/:_id", isValidToken, clientUpdate)
    .delete("/:_id", clientDelete);

export default route;
