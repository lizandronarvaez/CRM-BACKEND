import express from "express";
import {
    clientCreate,
    getAllClients,
    getClientBy,
    clientUpdate,
    clientDelete
} from "../services/clientService.js";
import { isValidToken } from "../middlewares/isValidToken.js";
const route = express.Router();
route
    .post("/", isValidToken, clientCreate)
    .get("/", isValidToken, getAllClients)
    .get("/:_id", isValidToken, getClientBy)
    .put("/:_id", isValidToken, clientUpdate)
    .delete("/:_id", isValidToken, clientDelete);

export default route;
