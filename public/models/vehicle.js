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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "user",
        default: null
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