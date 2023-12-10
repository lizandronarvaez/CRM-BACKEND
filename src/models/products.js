import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productsSchemas = new Schema({
    name: {
        type: String,
        trim: true
    },
    price: {
        type: Number
    },
    productImage: {
        type: String
    }
});

export default mongoose.model("Productos", productsSchemas);
