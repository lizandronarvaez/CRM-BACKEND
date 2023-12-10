import express from "express";
import { isValidToken } from "../middlewares/isValidToken";
import {
    productsCreate,
    productsGetAll,
    productGetBy,
    productUpdate,
    productDelete,
    getAllsProductQuery,
    uploadFile
} from "../services/productService";
// instancia de express.router
const route = express.Router();
route

    .post("/productos", isValidToken, uploadFile, productsCreate)
    .get("/productos", isValidToken, productsGetAll)

    .get("/productos/:_id", isValidToken, productGetBy)
    .put("/productos/:_id", isValidToken, uploadFile, productUpdate)

    .get("/productos/clientes/:query", isValidToken, getAllsProductQuery)
    .delete("/productos/:_id", isValidToken, productDelete);

export default route;
