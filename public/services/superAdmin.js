import User from "../models/user.js";

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
        const response = await User.findOneAndUpdate({ _id: body.id }, { isBlock: body.isBlock }, { new: true });
        return response;
    } catch (error) {
        throw new Error("Failed to send otp in mobile number!");
    }
};