import express from "express";
// Database
import _conecctionDatabase from "./source/db/db_connection.js";
// importacion de las rutas de express
import {
    routeClientes,
    routePedidos,
    routeProductos,
    routeUsuarios
} from "./source/controllers/index.js";

// Utilidades
import { config } from "dotenv";
import cors from "cors";
// Documentacion
import swaggerUi from "swagger-ui-express";
import swaggerJSDOC from "./source/docs/api-docs.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// env
config({ path: "config.env" });

// Conection ala base de datos
_conecctionDatabase();
// instancia express
const app = express();
// Archivos estaticos
app.use(express.static(__dirname + "/uploads"));
// configuracion de cors
const whiteList = [process.env.URL_FRONTEND, process.env.URL_TESTING];
const corsOptions = {
    origin: (origin, callback) => {
        const urls = whiteList.some(url => url === origin);
        if (urls) {
            callback(null, true);
        } else {
            callback(new Error("Solicitud no permitida por cors"));
        }
    }
};
// Uso de utilidades de expres
app.use(cors(corsOptions));
app.use(express.json());
// leer datos de envio de formulario
app.use(express.urlencoded({ extended: true }));

// Rutas que utiliremos
app.use("/users", routeUsuarios);
app.use("/", routeClientes);
app.use("/", routeProductos);
app.use("/", routePedidos);
app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerJSDOC));
// Configuracion para el servidor en produccion
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 5000;
// // instancia del puerto y escucha

app.listen(PORT, HOST, () => {
    console.log(`Servidor funcionando en el puerto ${process.env.PORT}`);
});
