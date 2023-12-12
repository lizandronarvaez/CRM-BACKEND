import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productsSchemas = new Schema({
    fullname: {
        type: String,
        trim: true
    },
    brand: {
        type: String,
        trim: true
    },
    price: {
        type: Number
    },
    productImage: {
        type: String
    },
    stock: {
        type: Number
    }
});

export default mongoose.model("Productos", productsSchemas);
