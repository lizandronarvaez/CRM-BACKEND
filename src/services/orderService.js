import { Orders } from "../models/index.js";

/** Crear pedido */
export const orderCreate = async (req, res, next) => {
    const { body } = req;
    try {
        // Si no existen datos para crear el pedido
        if (Object.entries(body).length === 0) res.status(400).send("Error al crear el pedido");
        // Si existe Creamos el pedido
        const order = new Orders(body);
        // Guardamos el pedidos
        await order.save();
        // Devolvermos un mensaje al cliente
        res.status(201).json({ mensaje: "Pedido Creado Corretamente" });
    } catch (error) {
        res.status(400).json(error.message);
        next(error);
    }
};

/** Mostrar todos los pedidos */
export const getAllOrders = async (req, res, next) => {
    try {
        // Buscamos todos los pedidos
        const orders = await Orders.find()
            // Populate busca lo relacionado con un cliente
            .populate("cliente")
            // Busca por el id haciendo referencia al objecto que queremos mostrar
            .populate({
                path: "pedido.producto",
                model: "Productos"
            });

        // Devolvemos un mensaje al cliente
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json(error.mensaje);
        next();
    }
};

/** BUscar solo un pedido  */
export const getOrderBy = async (req, res, next) => {
    const { _id } = req.params;

    try {
        // BUscamos el pedido por el id
        const order = await Orders.findById(_id)
            .populate("cliente")
            .populate({
                path: "pedido.producto",
                models: "Productos"
            });
        // Comprueba que existe el pedido
        if (order) res.status(200).json(order);
        res.status(400).json({ mensaje: "No se encontro ningun pedido" });
        return next();
    } catch (error) {
        res.status(400).json(error.message);
        next();
    }
};

// Actualizar un pedido
export const orderUpdate = async (req, res, next) => {
    const { params: { _id }, body } = req;

    try {
        // Buscamos el pedido
        const updatedProduct = await Orders
            .findByIdAndUpdate(_id, body, { new: true })
            .populate("cliente")
            .populate({
                path: "pedido.producto",
                models: "Productos"
            });

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json(error.message);
        next();
    }
};

// Eliminar un pedido
export const orderDelete = async (req, res, next) => {
    const { _id } = req.params;

    try {
        // Buscamos el pedido y lo eliminamos
        const order = await Orders.findByIdAndDelete(_id);
        // Si todo va bien
        if (order) res.status(201).json("Pedido Eliminado Correctamente");

        res.status(400).json("El pedido no existe o ya fue eliminado");
        return next();
    } catch (error) {
        // Si hubiese un error al eliminar el pedido
        res.status(400).json("Hubo un error");
    }
};
