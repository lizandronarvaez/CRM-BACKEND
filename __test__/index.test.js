/* eslint-disable no-undef */
import axios from "axios";
import { config } from "dotenv";
config({ path: "config.env" });
const url = `${process.env.URL_TESTING}/clientes`;

describe("Ruta Clientes", () => {

    test("Devolver un 200 y mostrar datos", async () => {
        const res = await axios.get(url);
        expect(res.status).toBe(200);
    });

    test("Crea un cliente y devolver que ha sido creado correcamente", async () => {
        const res = await axios.post(url, {
            nombre: "Lizandro",
            apellido: "Narváez",
            empresa: "Desarollo Company",
            email: "c@example.com",
            telefono: "612545888"
        });
        expect(res.status).toBe(201);
        expect(res.data).toEqual({ mensaje: "Cliente creado correctamente" });
    });

    // test("Debe enviar un error si el correo ya existe", async () => {
    //     try {
    //         await axios.post(url, {
    //             nombre: "prueba2",
    //             apellido: "prueba2",
    //             empresa: "desarrollo web node-mmongodb",
    //             email: "c@example.com",
    //             telefono: "612545888"
    //         });
    //     } catch (error) {
    //         expect(error.response.status).toBe(400);
    //         expect(error.response.data).toEqual({ error: "El correo electrónico ya existe en la base de datos" });
    //     }
    // });

    // eliminar un cliente
    // test("Debe eliminar un cliente", async () => {
    //     const idCliente = "65597de69a89f36dc03f874f";
    //     const res = await axios.delete(`${url}/${idCliente}`);

    //     expect(res.data).toEqual("");
    //     expect(res.status).toBe(204);
    // });
});
