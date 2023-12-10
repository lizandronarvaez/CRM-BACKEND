import { config } from "dotenv";
config({ path: ".env" });

export const getEnv = () => {
    return {
        ...process.env
    };
};
