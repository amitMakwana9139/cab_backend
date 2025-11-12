import User from "../models/user.js";
import Booking from "../models/booking.js";

/* Driver details delete succesfully */
export const deleteDriver = async (id) => {
    try {
        const response = await User.findByIdAndUpdate({ _id: id }, { isDeleted: 1 });
        return response;
    } catch (error) {
        throw new Error("Failed to delete driver details!");
    }
};

/* Get driver list for super Admin */
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

/* Get assign booking details for driver */
export const driverVehicleBookingList = async (pageLimit, skip, userId) => {
    try {

        const query = { driverId: userId, isDeleted: 0 };
        // if (startDate && endDate) {
        //     const start = new Date(`${startDate}T00:00:00Z`);
        //     const end = new Date(`${endDate}T23:59:59Z`);
        //     query.createdAt = { $gte: start, $lte: end };
        // }
        const getAssignBookingList = await Booking.find(query)
            .limit(pageLimit)
            .skip(skip)
            .sort({ createdAt: -1 })
            .select({
                isBlock: 0,
                isDeleted: 0,
                meta: 0,
                driverId: 0,
                driverNumber: 0,
                driverName: 0,
                createdBy: 0,
                vehicleId: 0,
                __v: 0
            })
            .lean();
        const totalCount = await Booking.countDocuments(query);
        return { getAssignBookingList, totalCount };
    } catch (error) {
        throw new Error("Failed to get booking details!");
    }
};

/* Edit booking status by driver */
export const updateBookingStatus = async (id, status) => {
    try {
        const response = await Booking.findByIdAndUpdate(id, { bookingStatus: status }, { new: true });
        return response;
    } catch (error) {
        throw new Error("Failed to update booking status!");
    }
}