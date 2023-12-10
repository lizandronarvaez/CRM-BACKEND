import express from "express";
import {
    routeClients,
    routeProducts,
    routeOrders,
    routeUsers
} from "./src/controllers/index.js";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";

import swaggerUi from "swagger-ui-express";
import swaggerJSDOC from "./src/docs/api-docs.js";
import { getEnv } from "./src/helpers/getEnv";
import { connectionDB } from "./src/db/connectionDB.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
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
app.use(cors());
app.use(express.json());
// leer datos de envio de formulario
app.use(express.urlencoded({ extended: true }));
// Rutas que utiliremos
app.use("/auth", routeUsers);
app.use("/clients", routeClients);
app.use("/products", routeProducts);
app.use("/orders", routeOrders);
app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerJSDOC));
// Configuracion para el servidor en produccion
const { HOST: HOST_ENV, PORT: PORT_ENV } = getEnv();
const HOST = HOST_ENV || "0.0.0.0";
const PORT = PORT_ENV || 5000;
app.listen(PORT, HOST, () => {
    // Conectar la base de datos
    connectionDB();
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
