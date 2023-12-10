import express from "express";
import { isValidToken } from "../middlewares/isValidToken.js";
import {
    orderCreate,
    getAllOrders,
    getOrderBy,
    orderUpdate,
    orderDelete
} from "../services/orderService.js";
// instancia de express.router
const route = express.Router();
route
    .post("/pedidos/nuevo/:_id", isValidToken, orderCreate)
    .get("/pedidos", isValidToken, getAllOrders)
    .get("/pedidos/:_id", isValidToken, getOrderBy)
    .put("/pedidos/:_id", isValidToken, orderUpdate)
    .delete("/pedidos/:_id", isValidToken, orderDelete);

export default route;
