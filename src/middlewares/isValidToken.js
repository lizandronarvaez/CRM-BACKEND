import { verifyToken } from "../helpers/Token_JWT.js";

export const isValidToken = async (req, res, next) => {
    const token = await req.headers.authorization?.split(" ")[1];
    const tokenIsValid = verifyToken(token);

    if (!token) {
        res.status(401).json({ message: "¡No estás autorizado!" });
        return;
    }
    if (!tokenIsValid) {
        res.status(401).json({ message: "¡Se agotó el tiempo de la sesión!" });
        return;
    }
    next();
};
