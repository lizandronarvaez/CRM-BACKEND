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
import { getEnv } from "./src/helpers/getEnv.js";
import { connectionDB } from "./src/db/connectionDB.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const { HOST: HOST_ENV, PORT: PORT_ENV } = getEnv();

app.use("/uploads", express.static(__dirname + "/src/uploads"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", routeUsers);
app.use("/clients", routeClients);
app.use("/products", routeProducts);
app.use("/orders", routeOrders);
app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerJSDOC));

const HOST = HOST_ENV || "0.0.0.0";
const PORT = PORT_ENV || 5000;
app.listen(PORT, HOST, () => {
    connectionDB();
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
