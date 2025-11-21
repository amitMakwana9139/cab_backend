import Booking from "../models/booking.js";

export const settingBookingList = async (pageLimit, skip, startDate, endDate, user) => {
    try {
        const query = { isDeleted: 0 };

        if (user.role === "admin") {
            query.parentAdmin = user._id;
        }

        if (user.role === "subAdmin") {
            query.parentAdmin = user.parentAdmin;
        }

        if (user.role === "driver") {
            query.driverId = user._id;
        }
        // ✅ Apply date filter if provided
        if (startDate && endDate) {
            const start = new Date(`${startDate}T00:00:00Z`);
            const end = new Date(`${endDate}T23:59:59Z`);
            query.createdAt = { $gte: start, $lte: end };
        }

        // ✅ Use aggregation to get sums directly
        const summary = await Booking.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    totalBookings: { $sum: 1 },
                    totalBookingPrice: { $sum: "$bookingPrice" },
                    totalVendorPrice: { $sum: "$vendorPrice" },
                    totalCommission: { $sum: "$commission" },
                },
            },
        ]);

        // ✅ Handle empty result (no bookings found)
        const totals = summary.length
            ? summary[0]
            : {
                totalBookings: 0,
                totalBookingPrice: 0,
                totalVendorPrice: 0,
                totalCommission: 0,
            };

        // ✅ Return only totals
        return totals;

    } catch (error) {
        throw new Error("Failed to get booking summary!");
    }
};
