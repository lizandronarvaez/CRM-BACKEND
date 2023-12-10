import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const usersSchema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true
    },
    fullname: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
});
// Encriptar la contraseña
usersSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// comprobar la contraseña
usersSchema.methods = {
    comparePassword: function (password) {
        return bcrypt.compareSync(password, this.password);
    }
};
export default mongoose.model("Usuarios", usersSchema);
