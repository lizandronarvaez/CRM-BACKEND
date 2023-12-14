import { Products } from "../models/index.js";
import { handleExceptionErrors } from "../utils/index.js";

export const productsCreate = async (req, res) => {
    const { body, file } = req;
    const product = new Products(body);
    try {
        if (file) product.productImage = file.filename;
        const data = await product.save();
        console.log(data);
        res.status(201).json({ image: "Imagen subida con éxito", message: "¡Producto creado con éxito!", ok: true });
    } catch (error) {
        handleExceptionErrors(error, res);
    }
};

export const productsGetAll = async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (error) {
        handleExceptionErrors(error, res);
    }
};

export const productGetBy = async (req, res) => {
    const { _id } = req.params;
    try {
        const product = await Products.findById(_id);
        if (!product) {
            res.status(400).json({ message: "¡No se encontró el producto!" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        handleExceptionErrors(error, res);
    }
};

export const productUpdate = async (req, res) => {
    const { body, params: { _id }, file } = req;
    const newProduct = body;
    try {
        const productNow = await Products.findById(_id);
        if (!productNow) {
            res.status(400).json({ message: "¡No se encontró el producto!" });
            return;
        }

        if (!file) newProduct.productImage = productNow.productImage;

        newProduct.productImage = file?.filename;
        await Products.findByIdAndUpdate(_id, newProduct, { new: true });
        res.status(200).json({ ok: true, message: "¡Producto actualizado con éxito!" });
    } catch (error) {
        handleExceptionErrors(error, res);
    }
};

export const productDelete = async (req, res) => {
    const { params: { _id } } = req;
    try {
        const product = await Products.findByIdAndDelete(_id);
        if (!product) {
            res.status(400).json({ message: "¡No se encontró el producto para eliminar!" });
            return;
        }
        res.status(200).json({ message: "¡Producto eliminado con éxito!" });
    } catch (error) {
        handleExceptionErrors(error, res);
    }
};
export const getAllsProductQuery = async (req, res) => {
    const { query } = req.params;
    try {
        const product = await Products.find({ name: new RegExp(query, "i") });
        if (!product) {
            res.status(404).json({ message: "¡Producto no encontrado!" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        handleExceptionErrors(error, res);
    }
};
