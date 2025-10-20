import Booking from "../models/booking.js";

export const bookCab = async (obj) => {
    try {
        const response = await Booking.create(obj);
        return response;
    } catch (error) {
        throw new Error("Failed to add booking!");
    }
}
