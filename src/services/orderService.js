import { Orders } from "../models/index.js";

export const orderCreate = async (req, res) => {
    try {
        // Si no existen datos para crear el pedido
        if (Object.entries(req.body).length === 0) {
            res.status(404).json({ message: "Error al crear el pedido" });
            return;
        }
        const order = new Orders(req.body);
        // Guardamos el pedidos
        await order.save();
        res.status(201).json({ ok: true, message: "Pedido Creado Corretamente" });
    } catch (error) {
        res.status(500).json({ message: "Error interno servidor" });
    }
};

/** Mostrar todos los pedidos */
export const getAllOrders = async (req, res) => {
    try {
        // Buscamos todos los pedidos
        const orders = await Orders.find()
            // Populate busca lo relacionado con un cliente
            .populate("client")
            // Busca por el id haciendo referencia al objecto que queremos mostrar
            .populate({
                path: "order.product",
                model: "Productos"
            });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error interno servidor" });
    }
};

/** BUscar solo un pedido  */
export const getOrderBy = async (req, res) => {
    const { _id } = req.params;

    try {
        const order = await Orders.findById(_id)
            .populate("client")
            .populate({
                path: "order.product",
                models: "Productos"
            });
        if (!order) {
            res.status(404).json({ message: "¡Pedido no existe!" });
            return;
        }
        res.status(200).json(order);
    } catch (error) {
        // ! TODO: solucionar si el pedido no se euncuentra o tiene un id no valido
        res.status(400).json(error.message);
    }
};

export const orderUpdate = async (req, res) => {
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
    }
};

// Eliminar un pedido
export const orderDelete = async (req, res) => {
    const { _id } = req.params;
    try {
        // !Solucionar esto!
        // Buscamos el pedido y lo eliminamos
        const order = await Orders.findByIdAndDelete(_id);
        // Si todo va bien
        if (!order) {
            res.status(400).json("El pedido no existe o ya fue eliminado");
            return;
        }
        res.status(201).json("Pedido Eliminado Correctamente");
    } catch (error) {
        // Si hubiese un error al eliminar el pedido
        res.status(400).json("Hubo un error");
    }
};
