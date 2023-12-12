import mongoose from "mongoose";
import { getEnv } from "../helpers/getEnv.js";
mongoose.Promise = global.Promise;
const { DATABASE } = getEnv();

export const connectionDB = () => {
    mongoose.set("strictQuery", true);
    try {
        mongoose.connect(DATABASE);
        console.log("Conectado ala base de datos");
    } catch (error) {
        console.log("Error en la conexion");
        throw new Error(error);
    }
};
