import Productos from "../models/productos.js";
import upload from "../middlewares/multer.js";
// Subir imagen para crear un archivo
export const subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) res.json(error.message);
        next();
    });
};

export const agregarProducto = async (req, res, next) => {
    const { body, file } = req;
    const producto = new Productos(body);
    try {
        if (file) producto.imagenProducto = file.filename;
        // Guardamos el producto
        await producto.save();
        // Devolvemos con un stado de que se ha creado correctamente
        res.status(201).json({ mensaje: "Se agrego un nuevo producto correctamente" });
    } catch (error) {
        res.status(400).json(error.message);
        next();
    }
};

export const mostarProductos = async (req, res, next) => {
    try {
        // Buscar todos los productos
        const productos = await Productos.find();
        // Mostrar todos los productos
        res.status(200).json(productos);
    } catch (error) {
        res.status(400).json(error.message);
        next();
    }
};

export const mostrarPoducto = async (req, res, next) => {
    const { _id } = req.params;
    // Busca el producto con el id que pasaremos por parametro
    const producto = await Productos.findById(_id);

    // Si existe el producto lo mostrara
    if (producto) res.status(200).json(producto);

    res.status(400).json({ mensaje: "No existe el producto" });
    return next();
};

export const actualizarProducto = async (req, res, next) => {
    // Buscamos el producto con el id
    const { body, params: { _id }, file } = req;
    const productoNuevo = body;
    try {
        //TODO: verificar porque no actualiza
        // Verificamos si hay una imagen nueva
        if (file) productoNuevo.imagenProducto = file.filename;

        const productoActual = await Productos.findById(_id);
        console.log(productoActual)
        productoNuevo.imagenProducto = productoActual.imagenProducto;

        const actualizarProducto = await Productos.findByIdAndUpdate(_id, productoNuevo, { new: true });
        res.status(200).json({ actualizarProducto, message: "Producto actualizado correctamente" });
    } catch (error) {
        res.status(400).json(error.message);
        next();
    }
};

export const eliminarProducto = async (req, res, next) => {
    const { _id } = req.params;

    try {
        // BUscamos el producto por su id en la base de datos
        const producto = await Productos.findByIdAndDelete(_id);

        if (producto) res.status(204).json({ mensaje: "Producto eliminado correctamente" });
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
export const buscarProductos = async (req, res, next) => {
    // Obtener el parametro de la ruta
    const { query } = req.params;
    try {
        // Consulta con un query hacia la base de datos para buscar un producto por un nombre
        const producto = await Productos.find({ nombre: new RegExp(query, "i") });
        // Si existe el producto le enviamos un status OK
        res.status(200).json(producto);
    } catch (error) {
        // Si no encuentra el producto devuelve un error
        res.status(404).json({ message: "El producto que busca no existe" });
        next();
    }
};
