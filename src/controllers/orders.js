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
    .post("/:_id", isValidToken, orderCreate)
    .get("/", isValidToken, getAllOrders)
    .get("/:_id", isValidToken, getOrderBy)
    .put("/:_id", isValidToken, orderUpdate)
    .delete("/:_id", isValidToken, orderDelete);

export default route;
