import jwt from "jsonwebtoken";
import { getEnv } from "./getEnv";
const { TOKEN_SECRET } = getEnv();

// Firmar y generar el token
export const tokenSign = (user) => {
    const { _id, nombre, email } = user;
    const data = { _id, nombre, email };
    return jwt.sign(data, TOKEN_SECRET, { expiresIn: "1hr" });
};
// Verificar el token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        return null;
    }
};
