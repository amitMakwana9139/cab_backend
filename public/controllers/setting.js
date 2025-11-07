import { settingBookingList } from "../services/setting.js";

/* Get cab booking details by subAdmin id  */
export const getSummaryOfSetting = async (req, res) => {
    const { page, limit, startDate, endDate } = req.query;
    try {
        const pageNumber = Number(page ?? 1);
        const pageLimit = Number(limit ?? 1);
        const skip = (pageNumber - 1) * pageLimit;
        const response = await settingBookingList(pageLimit, skip, startDate, endDate, req.user.id);
        if (response) {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Booking data get succesfully.",
                data: response
            });
        } else {
            res.status(200).json({
                status: 200,
                success: false,
                message: "Booking list not get!",
                data: []
            });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
};