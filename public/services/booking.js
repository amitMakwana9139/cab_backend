import Booking from "../models/booking.js";

export const bookCab = async (obj) => {
    try {
        const response = await Booking.create(obj);
        return response;
    } catch (error) {
        throw new Error("Failed to add booking!");
    }
};

export const editCabBooking = async (obj) => {
    try {
        const response = await Booking.findByIdAndUpdate({ _id: obj.id, isDeleted: 0 }, obj);
        return response;
    } catch (error) {
        throw new Error("Failed to edit booking details!");
    }
}

export const bookingList = async (pageLimit, skip, search, startDate, endDate, date, user) => {
    try {
        const query = { isDeleted: 0 };
        if (startDate && endDate) {
            const start = new Date(`${startDate}T00:00:00Z`);
            const end = new Date(`${endDate}T23:59:59Z`);
            query.createdAt = { $gte: start, $lte: end };
        }
        if (search) {
            query.customerName = { $regex: search, $options: "i" }
        }
        if (user.role !== "superAdmin") {
            query.parentAdmin = user._id;
        }

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

        const getCabBookingList = await Booking.find(query).populate({ path: "createdBy", select: "name email mobile" })
            .limit(pageLimit)
            .skip(skip)
            .sort({ createdAt: -1 })
            .select({ isBlock: 0, isDeleted: 0, __v: 0, meta: 0 })
            .lean();
        const totalCount = await Booking.countDocuments(query);
        return { getCabBookingList, totalCount };
    } catch (error) {
        throw new Error("Failed to get booking details!");
    }
};

export const singleBooking = async (id, userId) => {
    try {
        const response = await Booking.findById({ _id: id, createdBy: userId, isDeleted: 0 })
            .populate({ path: "createdBy", select: "name email mobile" })
            .select({ isBlock: 0, isDeleted: 0, __v: 0, meta: 0 });
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
};

export const findBookingById = async (id) => {
    try {
        const response = await Booking.findOne({ _id: id });
        return response;
    } catch (error) {
        throw new Error("Failed to find booking details!");
    }
};

