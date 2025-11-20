import mongoose from "mongoose";

const vehicleDetails = new mongoose.Schema({
    vehicleImage: {
        type: Array,
        required: false,
        default: []
    },
    vehicleId: {
        type: String,
        required: false,
        default: ""
    },
    vehicleName: {
        type: String,
        required: true,
        default: ""
    },
    vehicleNumber: {
        type: String,
        required: true,
        default: ""
    },
    vehicleType: {
        type: String,
        required: false,
        default: ""
    },
    remarks: {
        type: String,
        required: false,
        default: ""
    },
    // Newly added features
    insuranceExpiryDate: {
        type: String,
        required: false,
        default: ""
    },
    serviceStartKms: {
        type: Number,
        required: false,
        default: 0
    },
    fitnessExpiryDate: {
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
    parentAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    meta: {
        type: String,
        required: false,
        default: ""
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
const Vehicle = new mongoose.model("Vehicle", vehicleDetails)
export default Vehicle;