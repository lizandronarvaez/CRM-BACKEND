import { tokenSign } from "../helpers/Token_JWT";
import { Users } from "../models";
// CONTROLADOR registrar usuario
export const registerUser = async (req, res) => {
    const user = new Users(req.body);
    try {
        const data = await user.save();
        res.status(200).json({ message: "Usuario creado correctamente", data });
    } catch (error) {
        res.status(401).json({ message: "Hubo un error en el registro" });
    }
};

// CONTROLADOR autenticar usuario
export const loginUser = async (req, res, next) => {
    const { body: { email, password } } = req;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "El correo no existe" });
            return;
        }
        if (!user.comparePassword(password, user.password)) {
            res.status(401).json({ message: "Password incorrecto,intentelo de nuevo" });
            return;
        }
        const token = tokenSign(user);
        res.status(200).json({
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                token,
                ok: true
            }
        });
    } catch (error) {
        res.status(400).json(error);
    }
};
