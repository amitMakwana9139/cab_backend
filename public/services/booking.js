import Booking from "../models/booking.js";

export const bookCab = async (obj) => {
    try {
        const response = await Booking.create(obj);
        return response;
    } catch (error) {
        throw new Error("Failed to add booking!");
    }
};

export const bookingList = async (pageLimit, skip, search, userId) => {
    try {
        const getCabBookingList = await Booking.find({ createdBy: userId, isDeleted: 0 })
            .limit(pageLimit)
            .skip(skip)
            .sort({ createdAt: -1 })
            .select({ isBlock: 0, isDeleted: 0, __v: 0, meta: 0, createdBy: 0 })
            .lean();
        const totalCount = await Booking.countDocuments({ createdBy: userId, isDeleted: 0 });
        return { getCabBookingList, totalCount };
    } catch (error) {
        throw new Error("Failed to get booking details!");
    }
};

export const singleBooking = async (id, userId) => {
    try {
        const response = await Booking.findById({ _id: id, createdBy: userId, isDeleted: 0 }).select({ isBlock: 0, isDeleted: 0, __v: 0, meta: 0, createdBy: 0 });
        return response;
    } catch (error) {
        throw new Error("Failed to get single booking details!");
    }
};

export const deleteBooking = async (id, userId) => {
    try {
        const response = await Booking.findByIdAndUpdate({ _id: id, createdBy: userId }, { isDeleted: 1 });
        return response;
    } catch (error) {
        throw new Error("Failed to delete single booking details!");
    }
}

