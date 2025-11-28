import User from "../models/user.js";
import Booking from "../models/booking.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;


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
export const driverList = async (pageLimit, skip, search, user) => {
    try {
        const query = { role: "driver", isDeleted: 0 };

        if (search && search.trim() !== "") {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { mobile: { $regex: search, $options: "i" } },
            ];
        }

        if (user.role === "admin") {
            query.parentAdmin = user._id;
        }
        if (user.role === "subAdmin") {
            query.parentAdmin = user.parentAdmin;
        }

        const getDriverList = await User.find(query)
            .populate({ path: "createdBy", select: "name email mobile" })
            .limit(pageLimit)
            .skip(skip)
            .sort({ createdAt: -1 })
            .select({ name: 1, email: 1, mobile: 1, profileImage: 1, createdAt: 1, isBlock: 1 })
            .lean();
        const totalCount = await User.countDocuments(query);
        return { getDriverList, totalCount };
    } catch (error) {
        throw new Error("Failed to get booking details!");
    }
};

/* Get assign booking details for driver */
export const driverVehicleBookingList = async (pageLimit, skip, search, userId, date) => {
    try {

        const query = { driverId: userId, isDeleted: 0 };

        if (search) {
            query.customerName = { $regex: search, $options: "i" }
        }

        // if (startDate && endDate) {
        //     const start = new Date(`${startDate}T00:00:00Z`);
        //     const end = new Date(`${endDate}T23:59:59Z`);
        //     query.createdAt = { $gte: start, $lte: end };
        // }

        if (date) {
            query.$or = [
                // Case 1: date between tripStartDate and tripEndDate
                {
                    $and: [
                        { tripEndDate: { $nin: [null, ""] } },
                        { tripStartDate: { $lte: date } },
                        { tripEndDate: { $gte: date } }
                    ]
                },

                // Case 2: tripEndDate is null AND exact match
                {
                    $and: [
                        { tripEndDate: { $in: [null, ""] } },
                        { tripStartDate: date }
                    ]
                }
            ];
        }

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
        // 3️⃣ Calculate SUM of bookingPrice and vendorPrice
        const totals = await Booking.aggregate([
            { $match: { driverId: new ObjectId(userId), isDeleted: 0 } },
            {
                $group: {
                    _id: null,
                    totalBookingPrice: { $sum: "$bookingPrice" },
                    totalVendorPrice: { $sum: "$vendorPrice" }
                }
            }
        ]);
        return { response: getAssignBookingList, totalCount, totals };
    } catch (error) {
        throw new Error("Failed to get booking details!");
    }
};

/* Edit booking status by driver */
export const updateBookingStatus = async (id, status, reason, userId) => {
    try {
        const response = await Booking.findByIdAndUpdate(id, { bookingStatus: status, cancelBy: userId, cancelReason: reason }, { new: true });
        return response;
    } catch (error) {
        throw new Error("Failed to update booking status!");
    }
};


/* Get driver list for Admin */
export const driverData = async (user) => {
    try {
        const query = { role: "driver", isDeleted: 0 };

        if (user.role === "admin") {
            query.parentAdmin = user._id;
        }
        if (user.role === "subAdmin") {
            query.parentAdmin = user.parentAdmin;
        }

        const response = await User.find(query)
            .sort({ createdAt: -1 })
            .select({ name: 1, createdAt: 1 })
            .lean();
        return response;
    } catch (error) {
        throw new Error("Failed to get booking details!");
    }
};