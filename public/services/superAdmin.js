import Booking from "../models/booking.js";
import User from "../models/user.js";
import Vehicle from "../models/vehicle.js";

export const getUser = async (obj) => {
    try {
        const response = await User.findOne(obj);
        return response;
    } catch (error) {
        throw new Error("Failed to get user!");
    }
};

export const createSuperAdmin = async (body) => {
    try {
        const response = await User.create(body);
        return response;
    } catch (error) {
        throw new Error("Failed to create super admin");
    }
};

export const editOtp = async (mobile, otp) => {
    try {
        const response = await User.findOneAndUpdate({ mobile: mobile }, { otp: otp }, { new: true });
        return response;
    } catch (error) {
        throw new Error("Failed to send otp in mobile number!");
    }
};

export const editDriver = async (body) => {
    try {
        const response = await User.findOneAndUpdate({ _id: body.id }, { isBlock: body.isBlock, blockReason: +body.isBlock === 1 ? body.blockReason : "" }, { new: true });
        return response;
    } catch (error) {
        throw new Error("Failed to add driver in blacklist!");
    }
};

/* Get dashobard details for superAdmin */
export const getDashboardDetails = async (user) => {
    try {
        const totalBooking = await Booking.countDocuments({ isDeleted: 0 });
        const totalUser = await User.countDocuments({ isDeleted: 0, role: { $ne: "superAdmin" } });
        const userList = await User.find({ isDeleted: 0, role: { $ne: "superAdmin" } }).select({ name: 1, email: 1, mobile: 1, profileImage: 1, createdAt: 1 }).sort({ createdAt: -1 }).limit(5);
        const carList = await Vehicle.find({ isDeleted: 0 }).select({ vehicleImage: 1, vehicleName: 1, vehicleNumber: 1, vehicleType: 1, createdAt: 1 }).sort({ createdAt: -1 }).limit(5);

        return { totalBooking, totalUser, userList, carList };
    } catch (error) {
        throw new Error("Failed to get dashbaord details!");
    }
}