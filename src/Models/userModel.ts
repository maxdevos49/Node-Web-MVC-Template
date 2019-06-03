import mongoose from "mongoose";

const Schema = mongoose.Schema;

// export interface IUser {
//     id: string;
//     firstname: string;
//     lastname: string;
//     email: string;
//     role?: string[];
//     isActive?: Boolean;
//     createdOn?: Date;
//     updatedOn?: Date;
//     updatedBy?: String;
// }

const UserSchema = new Schema({
    oktaId: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    role: {
        type: [String],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Number
    }
});

export default mongoose.model("user", UserSchema);
