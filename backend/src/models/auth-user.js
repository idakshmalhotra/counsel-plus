import mongoose from "mongoose";
import { Schema,model} from "mongoose";

const authUserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

 export const AuthUser = model("AuthUser", authUserSchema);

