import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    client: {
        type: Schema.ObjectId,
        ref: "Clientes"
    },
    order: [{
        product: {
            type: Schema.ObjectId,
            ref: "Productos"
        },
        fullname: String,
        cantidad: Number,
        price: Number
    }],
    total: {
        type: Number
    }
}, { timestamps: true });

export default mongoose.model("Pedidos", ordersSchema);
