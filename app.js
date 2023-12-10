import express from "express";
// importacion de las rutas de express
import {
    routeClients,
    routeOrders,
    routeProducts,
    routeUsers
} from "./src/controllers/index";

// Utilidades
import { config } from "dotenv";
import cors from "cors";
// Documentacion
import { dirname } from "path";
import { fileURLToPath } from "url";
import { conecctionDB } from "./src/db/connectionDB";

import swaggerUi from "swagger-ui-express";
import swaggerJSDOC from "./src/docs/api-docs.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
// env
config({ path: "config.env" });

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
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 5000;
// // instancia del puerto y escucha

app.listen(PORT, HOST, () => {
    // La base de datos se levanta cuando el servidor se levante
    conecctionDB();
    console.log(`Servidor funcionando en el puerto ${process.env.PORT}`);
});
