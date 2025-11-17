import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    booking: {
        create: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
    },
    user: {
        view: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
    },
    // you can extend with more modules later (reports, settings, etc.)
}, { _id: false });

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
    drivingLicense: {
        type: Array,
        required: false,
        default: []
    },
    aadharImage: {
        type: Array,
        required: false,
        default: []
    },
    profileImage: {
        type: String,
        required: false,
        default: ""
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User",
        default: null
    },
    theme: {
        type: String,
        required: false,
        default: ""
    },
    otp: {
        type: Number,
        required: false,
        default: null
    },
    meta: {
        type: String,
        required: false,
        default: ""
    },
    role: {
        type: String,
        enum: ["customer", "superAdmin", "subAdmin", "admin", "driver"],   // 0 - customer, 1 - superAdmin, 2 - subAdmin, 3 - admin, 4 - driver
        required: true,
        default: "customer"
    },
    permissions: permissionSchema,
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
    blockReason: {
        type: String,
        required: false,
        default: ""
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