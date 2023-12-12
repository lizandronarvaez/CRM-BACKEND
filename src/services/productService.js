import { Products } from "../models/index.js";
import upload from "../middlewares/multer.js";

export const uploadFile = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json(error.message);
        } else {
            next();
        }
    });
};

export const productsCreate = async (req, res, next) => {
    const { body, file } = req;
    const product = new Products(body);
    try {
        if (file) product.productImage = file.filename;
        // Guardamos el producto
        await product.save();
        // Devolvemos con un stado de que se ha creado correctamente
        res.status(201).json({ message: "Se agrego un nuevo producto correctamente", ok: true });
    } catch (error) {
        res.status(400).json(error.message);
    }
    next();
};

export const productsGetAll = async (req, res, next) => {
    try {
        // Buscar todos los productos
        const products = await Products.find();
        // Mostrar todos los productos
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json(error.message);
        next();
    }
};

export const productGetBy = async (req, res, next) => {
    const { _id } = req.params;
    const product = await Products.findById(_id);
    try {
        if (!product) {
            res.status(400).json({ message: "No existe el producto" });
        }
        res.status(200).json(product);
    } catch (error) {
        throw new Error(error);
    }
};

export const productUpdate = async (req, res, next) => {
    // Buscamos el producto con el id
    const { body, params: { _id }, file } = req;
    const newProduct = body;
    try {
        // TODO: verificar porque no actualiza
        // Verificamos si hay una imagen nueva
        if (file) newProduct.productImage = file.filename;

        const productNow = await Products.findById(_id);
        newProduct.productImage = productNow.productImage;

        await Products.findByIdAndUpdate(_id, newProduct, { new: true });
        res.status(200).json({ ok: true, message: "Producto actualizado correctamente" });
    } catch (error) {
        res.status(400).json(error.message);
        next();
    }
};

export const productDelete = async (req, res, next) => {
    const { _id } = req.params;

    try {
        // BUscamos el producto por su id en la base de datos
        const product = await Products.findByIdAndDelete(_id);

        if (product) res.status(204).json({ mensaje: "Producto eliminado correctamente" });
        // Si el producto ya fue eliminado nos devolvera un mensaje
        res.status(400).json({ mensaje: "El producto no existe o ya fue eliminado" });
    } catch (error) {
        if (error) {
            // SI existe un error nos devovlera este mensaje y realizara un next()
            res.status(400).json({ mensaje: "Hubo un error al eliminar el producto" });
            next();
        }
    }
};
// consultar todos los productos por un query
export const getAllsProductQuery = async (req, res, next) => {
    // Obtener el parametro de la ruta
    const { query } = req.params;
    try {
        // Consulta con un query hacia la base de datos para buscar un producto por un nombre
        const product = await Products.find({ name: new RegExp(query, "i") });
        // Si existe el producto le enviamos un status OK
        res.status(200).json(product);
    } catch (error) {
        // Si no encuentra el producto devuelve un error
        res.status(404).json({ message: "El producto que busca no existe" });
        next();
    }
};
