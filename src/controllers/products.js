import express from "express";
import { isValidToken } from "../middlewares/isValidToken.js";
import {
    productsCreate,
    productsGetAll,
    productGetBy,
    productUpdate,
    productDelete,
    getAllsProductQuery
} from "../services/productService.js";
import { uploadFile } from "../middlewares/multer.js";
const route = express.Router();
route
    .post("/", isValidToken, uploadFile, productsCreate)
    .get("/", isValidToken, productsGetAll)

    .get("/:_id", isValidToken, productGetBy)
    .put("/:_id", isValidToken, uploadFile, productUpdate)
    .delete("/:_id", isValidToken, productDelete)

    .get("/clientes/:query", isValidToken, getAllsProductQuery);

export default route;
