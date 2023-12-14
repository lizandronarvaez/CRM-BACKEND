import { tokenSign } from "../helpers/Token_JWT.js";
import { Users } from "../models/index.js";
import { handleDuplicateEmailError, handleExceptionErrors } from "../utils/index.js";
export const registerUser = async (req, res) => {
    const user = new Users(req.body);
    try {
        const data = await user.save();
        res.status(200).json({ message: "Usuario creado correctamente", data });
    } catch (error) {
        handleDuplicateEmailError(error, res);
    }
};

export const loginUser = async (req, res) => {
    const { body } = req;

    try {
        const dbUser = await Users.findOne({ email: body.email });
        const { _id, fullname, email } = dbUser;

        if (!body.email) {
            res.status(404).json({ message: "El correo electrónico introducido no existe en nuestros registros" });
            return;
        }
        if (!dbUser.comparePassword(body.password, dbUser.password)) {
            res.status(401).json({ message: "Contraseña incorrecta. Por favor, inténtelo de nuevo." });
            return;
        }
        const token = tokenSign(dbUser);
        const user = { id: _id, fullname, email, token, ok: true };

        res.status(200).json({ user });
    } catch (error) {
        handleExceptionErrors(error, res);
    }
};
