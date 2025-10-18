import mongoose from "mongoose";

const userDetails = new mongoose.Schema({
    customerId: {
        type: String,
        required: false,
        default: ""
    },
    customerName: {
        type: String,
        required: false,
        default: ""
    },
    country: {
        type: String,
        required: false,
        default: ""
    },
    tripStartDate: {
        type: String,
        required: false,
        default: ""
    },
    tripEndDate: {
        type: String,
        required: false,
        default: ""
    },
    time: {
        type: String,
        required: false,
        default: ""
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