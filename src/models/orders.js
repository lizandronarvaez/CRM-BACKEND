import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    client: {
        type: Schema.ObjectId,
        ref: "Clientes"
    },
    order: [{
        producto: {
            type: Schema.ObjectId,
            ref: "Productos"
        },
        cantidad: Number
    }],
    total: {
        type: Number
    }
});

export default mongoose.model("Pedidos", ordersSchema);
