import { getEnv } from "../helpers/getEnv";

const { URL_FRONTEND, URL_TESTING } = getEnv();
const whiteList = [URL_FRONTEND, URL_TESTING];

export const corsOptions = {
    origin: (origin, callback) => {
        const urls = whiteList.some(url => url === origin);
        if (urls) {
            callback(null, true);
        } else {
            callback(new Error("Solicitud no permitida por cors"));
        }
    }
};
