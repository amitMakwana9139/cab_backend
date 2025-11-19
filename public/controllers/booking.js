import { bookCab, bookingList, deleteBooking, editCabBooking, singleBooking } from "../services/booking.js";

/* Create booking by subAdmin */
export const cabBooking = async (req, res) => {
    const body = req.body;
    try {
        body.createdBy = req.user._id;
        const response = await bookCab(body);
        if (response && Object.keys(response).length > 0) {
            return res.status(200).json({ status: 200, success: true, message: "Cab book succesfully.", data: {} });
        } else {
            return res.status(400).json({ status: 400, success: false, message: "Cab not book!", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
};

/* Edit cab booking details */
export const editBooking = async (req, res) => {
    const body = req.body;
    try {
        const response = await editCabBooking(body);
        if (response) {
            return res.status(200).json({ status: 200, success: true, message: "Cab booking details edited succesfully.", data: {} });
        } else {
            return res.status(400).json({ status: 400, success: false, message: "Cab booking details not edited!", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
}

/* Get cab booking details by subAdmin id  */
export const getBookings = async (req, res) => {
    const { page, limit, search, startDate, endDate, date } = req.query;
    try {
        const pageNumber = Number(page ?? 1);
        const pageLimit = Number(limit ?? 1);
        const skip = (pageNumber - 1) * pageLimit;
        const response = await bookingList(pageLimit, skip, search, startDate, endDate, date, req.user);
        if (response && response.getCabBookingList?.length > 0) {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Cab booking list get succesfully.",
                data: {
                    data: response.getCabBookingList,
                    count: response.totalCount,
                    page: Math.ceil((response.totalCount / pageLimit))
                }
            });
        } else {
            res.status(200).json({
                status: 200,
                success: false,
                message: "Cab booking list not get!",
                data: {
                    data: [],
                    count: 0,
                    page: 0
                }
            });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
};

/* Get single booking details list */
export const getSingleBooking = async (req, res) => {
    const { id } = req.query;
    try {
        const response = await singleBooking(id, req.user.id);
        if (response && Object.keys(response).length > 0) {
            return res.status(200).json({ status: 200, success: true, message: "single booking details get succesfully.", data: response });
        } else {
            return res.status(200).json({ status: 200, success: true, message: "single booking details not found!", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
}

/* Delete single booking details list */
export const removeSingleBooking = async (req, res) => {
    const { id } = req.query;
    try {
        const response = await deleteBooking(id, req.user.id);
        if (response && Object.keys(response).length > 0) {
            return res.status(200).json({ status: 200, success: true, message: "single booking details delete succesfully.", data: {} });
        } else {
            return res.status(500).json({ status: 500, success: false, message: "single booking details not delete!", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
}