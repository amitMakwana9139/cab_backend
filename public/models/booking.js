import mongoose from "mongoose";

const bookingDetails = new mongoose.Schema({
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
    mobile: {
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
    tripType: {
        type: String,
        required: false,
        default: ""
    },
    carType: {
        type: String,
        required: false,
        default: ""
    },
    pickupLocation: {
        type: String,
        required: false,
        default: ""
    },
    multipleStop: {
        type: Array,
        required: false,
        default: []
    },
    dropLocation: {
        type: String,
        required: false,
        default: ""
    },
    totalPassenger: {
        type: Number,
        required: false,
        default: 0
    },
    totalLuggage: {
        type: Number,
        required: false,
        default: ""
    },
    vendorName: {
        type: String,
        required: false,
        default: ""
    },
    vendorPrice: {
        type: Number,
        required: false,
        default: 0
    },
    bookingPrice: {
        type: Number,
        required: false,
        default: ""
    },
    advancePaid: {
        type: Number,
        required: false,
        default: ""
    },
    commission: {
        type: Number,
        required: false,
        default: ""
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "vehicle",
        default: null
    },
    vehicleNumber: {
        type: String,
        required: false,
        default: ""
    },
    vehicleName: {
        type: String,
        required: false,
        default: ""
    },
    vehicleType: {
        type: String,
        required: false,
        default: ""
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User",
        default: null
    },
    driverNumber: {
        type: String,
        required: false,
        default: ""
    },
    driverName: {
        type: String,
        required: false,
        default: ""
    },
    bookingStatus: {    // 0 - pending , 1 - completed, 2 - cancelled
        type: Number,
        required: false,
        default: 0
    },
    driverExpense: {
        type: String,
        required: false,
        default: ""
    },
    driverExpensePhotos: {
        type: Array,
        required: false,
        default: ""
    },
    driverExpenseRemarks: {
        type: String,
        required: false,
        default: ""
    },
    cancelReason: {
        type: String,
        required: false,
        default: ""
    },
    cancelBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "user",
        default: null
    },
    remarks: {
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
const Booking = new mongoose.model("Booking", bookingDetails)
export default Booking;