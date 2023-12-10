import Clientes from "../models/clientes.js";

export const crearCliente = async (req, res, next) => {
    const { body } = req;
    const cliente = new Clientes(body);
    try {
        // Almacena el registro
        await cliente.save();
        res.status(201).json({ mensaje: "Cliente creado correctamente" });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            res.status(400).json({ error: "El correo electrónico ya existe en la base de datos" });
        } else {
            res.status(500).json({ error: "Error al crear el cliente" });
        }
        next();
    }
};

// Mostrar todos los clientes
export const mostrarClientes = async (req, res, next) => {
    try {
        // Busca todos los clientes
        const clientes = await Clientes.find();
        res.status(200).json(clientes);
    } catch (error) {
        next();
    }
};

// Mostrar un solo cliente
export const mostrarUnCliente = async (req, res, next) => {
    const { _id } = req.params;
    try {
        // BUsca el cliente en la base de datos
        const cliente = await Clientes.findById(_id);
        // Comprueba que el cliente existe
        if (!cliente) {
            // Si no existe el cliente envia un json
            res.json({ mensaje: "Ese cliente no existe" });
            // Sigue al siguente middleware
            return next();
        }
        // Si el cliente existe, lo muestra
        res.status(200).json(cliente);
    } catch (error) {
        res.status(400).json(error.message);
        next();
    }
};

// Actualizar un cliente
export const actualizarCliente = async (req, res, next) => {
    // Leer el id para buscar el cliente
    const { params: { _id }, body } = req;

    try {
        const cliente = await Clientes.findByIdAndUpdate({ _id }, body, { new: true });
        res.status(200).json(cliente);
    } catch (error) {
        res.status(400).json(error.message);
        next();
    }
};

// Eliminar un cliente
export const eliminarCLiente = async (req, res, next) => {
    const { _id } = req.params;

    try {
        await Clientes.findByIdAndDelete(_id);
        res.status(204).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ message: "Hubo un error" });
    }
};
