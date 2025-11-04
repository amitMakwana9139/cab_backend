import { deleteDriver, driverList } from "../services/driver.js";
import { getUser } from "../services/superAdmin.js";

/* Delete single booking details list */
export const removeDriver = async (req, res) => {
    const { id } = req.query;
    try {
        const isDriverExist = await getUser({ _id: id, role: "driver", isDeleted: 0 });
        if (!isDriverExist) {
            return res.status(404).json({ status: 404, success: false, message: "Driver details not found!", data: {} });
        }
        const response = await deleteDriver(id);
        if (response && Object.keys(response).length > 0) {
            return res.status(200).json({ status: 200, success: true, message: "Driver details delete succesfully.", data: {} });
        } else {
            return res.status(500).json({ status: 500, success: false, message: "Driver details not delete!", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
};

/* Get cab booking details by subAdmin id  */
export const getDrivers = async (req, res) => {
    const { page, limit, search } = req.query;
    try {
        const pageNumber = Number(page ?? 1);
        const pageLimit = Number(limit ?? 1);
        const skip = (pageNumber - 1) * pageLimit;
        const response = await driverList(pageLimit, skip, search, req.user.id);
        if (response && response.getDriverList?.length > 0) {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Driver list get succesfully.",
                data: {
                    data: response.getDriverList,
                    count: response.totalCount,
                    page: Math.ceil((response.totalCount / pageLimit))
                }
            });
        } else {
            res.status(200).json({
                status: 200,
                success: false,
                message: "Driver list not get!",
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