import { fileURLToPath } from "url";
import path, { dirname } from "path";
import multer from "multer";
const __dirname = dirname(fileURLToPath(import.meta.url));
const uploads = path.resolve(__dirname, "../uploads");
const mimetypes = ["image/jpeg", "image/png", "image/webp"];
const multerConfig = {
    limits: { fileSize: 1000000 },
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, uploads),
        filename: (req, file, cb) => {
            const nameImage = file.originalname.split(".")[0];
            const extImage = file.originalname.split(".")[1];
            cb(null, `${nameImage + Date.now()}.${extImage}`);
        }
    }),
    fileFilter(req, file, cb) {
        !mimetypes.includes(file.mimetype)
            ? cb(new Error("El formato no es valido"), false)
            : cb(null, true);
    }
};

export const uploadFile = (req, res, next) => {
    const uploadMiddleware = multer(multerConfig).single("productImage");
    uploadMiddleware(req, res, function (error) {
        if (error instanceof multer.MulterError) {
            return res.status(400).json({ message: "Error al subir la imagen: Tamaño excede el límite permitido." });
        }
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        next();
    });
};
