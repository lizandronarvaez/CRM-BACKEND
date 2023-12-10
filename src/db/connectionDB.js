import mongoose from "mongoose";
import { getEnv } from "../helpers/getEnv";
mongoose.Promise = global.Promise;
const { DATABASE } = getEnv();

export const conecctionDB = () => {
    mongoose.set("strictQuery", "false");
    // Conexion ala base de datos
    try {
        mongoose.connect(DATABASE,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log("Conectado ala base de datos");
    } catch (error) {
        console.log("Error en la conexion");
        console.log(error);
    }
};
