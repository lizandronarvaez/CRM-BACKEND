import express from "express";
import { isValidToken } from "../middlewares/isValidToken.js";
import {
    productsCreate,
    productsGetAll,
    productGetBy,
    productUpdate,
    productDelete,
    getAllsProductQuery,
    uploadFile
} from "../services/productService.js";
// instancia de express.router
const route = express.Router();
route

    .post("/", isValidToken, uploadFile, productsCreate)
    .get("/", isValidToken, productsGetAll)

    .get("/:_id", isValidToken, productGetBy)
    .put("/:_id", isValidToken, uploadFile, productUpdate)

    .get("/clientes/:query", isValidToken, getAllsProductQuery)
    .delete("/:_id", isValidToken, productDelete);

export default route;
