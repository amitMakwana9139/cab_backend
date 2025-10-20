import { bookCab } from "../services/booking.js";

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
}