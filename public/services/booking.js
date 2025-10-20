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
        const getCabBookingList = await Booking.find({ createdBy: userId }).limit(pageLimit).skip(skip).sort({ createdAt: -1 }).lean();
        const totalCount = await Booking.countDocuments({ createdBy: userId });
        return { getCabBookingList, totalCount };
    } catch (error) {
        throw new Error("Failed to get booking details!");
    }
}
