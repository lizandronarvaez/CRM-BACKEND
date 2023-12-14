import jwt from "jsonwebtoken";
import { getEnv } from "./getEnv.js";
const { TOKEN_SECRET } = getEnv();

// Firmar y generar el token
const options = { expiresIn: "1d" };
export const tokenSign = (user) => {
    const { _id, nombre, email } = user;
    const data = { _id, nombre, email };
    return jwt.sign(data, TOKEN_SECRET, options);
};
// Verificar el token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        return null;
    }
};
