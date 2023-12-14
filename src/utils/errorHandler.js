// funcion para manejar que un email ya este eregistrado
export const handleDuplicateEmailError = (error, res) => {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        res.status(400).json({ error: "¡Email ya registrado!" });
    } else {
        res.status(500).json({ error: "Error al crear el cliente" });
    }
};

// Funcion para comprobar el objectId
export const handleExceptionErrors = (error, res) => {
    const idIsValid = error.name === "CastError" && error.kind === "ObjectId";

    if (idIsValid) {
        res.status(400).json({ message: "¡Formato de ObjectId no válido!" });
    } else {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
