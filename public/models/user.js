import mongoose from "mongoose";

const userDetails = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: ""
    },
    email: {
        type: String,
        required: false,
        default: ""
    },
    mobile: {
        type: String,
        required: false,
        default: ""
    },
    password: {
        type: String,
        required: false,
        default: ""
    },
    image: {
        type: Array,
        required: false,
        default: []
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "user",
        default: null
    },
    theme: {
        type: String,
        required: false,
        default: ""
    },
    meta: {
        type: String,
        required: false,
        default: ""
    },
    role: {
        type: String,
        required: true,  // [User,superAdmin,Admin,subAdmin]
        default: "user"
    },
    isGoogleLogin: {
        type: Number,
        required: false,
        default: 0
    },
    isBlock: {
        type: Number,
        required: false,
        default: 0
    },
    isDeleted: {
        type: Number,
        required: false,
        default: 0
    }
},
    {
        timestamps: true
    }
)
const User = new mongoose.model("User", userDetails)
export default User;