import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clientsSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    }
});

export default mongoose.model("Clientes", clientsSchema);
