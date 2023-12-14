import { Clients } from "../models/index.js";
import { handleDuplicateEmailError, handleExceptionErrors } from "../utils/index.js";

export const clientCreate = async (req, res) => {
    const client = new Clients(req.body);
    try {
        await client.save();
        res.status(201).json({ ok: true, message: "¡Cliente creado con éxito!" });
    } catch (error) {
        handleDuplicateEmailError(error, res);
    }
};

export const getAllClients = async (req, res) => {
    try {
        const clients = await Clients.find();
        res.status(200).json(clients);
    } catch (error) {
        handleExceptionErrors(error, res);
    }
};

export const getClientBy = async (req, res) => {
    const { _id } = req.params;
    try {
        const client = await Clients.findById(_id);
        if (!client) {
            res.status(400).json({ message: "¡No existe el cliente!" });
            return;
        }
        res.status(200).json(client);
    } catch (error) {
        handleExceptionErrors(error, res);
    }
};

export const clientUpdate = async (req, res) => {
    const { params: { _id }, body } = req;
    try {
        await Clients.findByIdAndUpdate({ _id }, body, { new: true });
        res.status(200).json({ message: "¡Cliente actualizado con éxito!" });
    } catch (error) {
        handleExceptionErrors(error, res);
    }
};

export const clientDelete = async (req, res) => {
    const { _id } = req.params;
    try {
        const client = await Clients.findByIdAndDelete(_id);
        if (!client) {
            res.status(404).json({ message: "¡No existe el cliente!" });
            return;
        }
        res.status(200).json({ message: "¡Cliente eliminado con éxito!" });
    } catch (error) {
        handleExceptionErrors(error, res);
    }
};
