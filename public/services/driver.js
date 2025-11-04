import User from "../models/user.js";

/* Driver details delete succesfully */
export const deleteDriver = async (id) => {
    try {
        const response = await User.findByIdAndUpdate({ _id: id }, { isDeleted: 1 });
        return response;
    } catch (error) {
        throw new Error("Failed to delete driver details!");
    }
};

export const driverList = async (pageLimit, skip, search) => {
    try {
        const getDriverList = await User.find({ role: "driver", isDeleted: 0 })
            .limit(pageLimit)
            .skip(skip)
            .sort({ createdAt: -1 })
            .select({ name: 1, email: 1, mobile: 1, profileImage: 1, createdAt: 1 })
            .lean();
        const totalCount = await User.countDocuments({ role: "driver", isDeleted: 0 });
        return { getDriverList, totalCount };
    } catch (error) {
        throw new Error("Failed to get booking details!");
    }
};