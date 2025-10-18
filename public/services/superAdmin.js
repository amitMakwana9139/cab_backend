import User from "../models/user.js";

export const getUser = async (obj) => {
    try {
        const response = await User.findOne(obj);
        return response;
    } catch (error) {
        throw new Error("Failed to get user!");
    }
}

export const createSuperAdmin = async (body) => {
    try {
        const response = await User.create(body);
        return response;
    } catch (error) {
        throw new Error("Failed to create super admin");
    }
}