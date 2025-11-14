import {
    addVehicleData,
    checkVehicle,
    deleteVehicleById,
    editVehicleData,
    getVehicleById,
    vehicleList
} from "../services/vehicle.js";

/* Add vehicle by sub admin */
export const addVehicle = async (req, res) => {
    const body = req.body;
    try {
        body.createdBy = req.user.id;
        const isVehicleExist = await checkVehicle(body);
        if (isVehicleExist && Object.keys(isVehicleExist).length > 0) {
            return res.status(409).json({ status: 409, success: false, message: "This vehicle already exist!", data: {} });
        }

        const response = await addVehicleData(body);
        if (response && Object.keys(response).length > 0) {
            return res.status(200).json({ status: 200, success: true, message: "Vehicle add succesfully.", data: {} });
        } else {
            return res.status(400).json({ status: 400, success: false, message: "Vehicle not add!", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
};

/* Get vehicle by sub admin */
export const getVehicle = async (req, res) => {
    const { page, limit, search } = req.query;
    try {
        const pageNumber = Number(page ?? 1);
        const pageLimit = Number(limit ?? 1);
        const skip = (pageNumber - 1) * pageLimit;

        const response = await vehicleList(pageLimit, skip, search, req.user);
        if (response && response.getVehicleList?.length > 0) {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Vehicle list get succesfully.",
                data: {
                    data: response.getVehicleList,
                    count: response.totalCount,
                    page: Math.ceil((response.totalCount / pageLimit))
                }
            });
        } else {
            res.status(200).json({
                status: 200,
                success: false,
                message: "Vehicle list not get!",
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
}

/* Edit vehicle by id */
export const editVehicle = async (req, res) => {
    const body = req.body;
    try {
        const isVehicleExist = await getVehicleById(body.id);
        if (!isVehicleExist) {
            return res.status(404).json({ status: 404, success: false, message: "Vehicle details not found!", data: {} });
        }
        const response = await editVehicleData(body);
        if (response && Object.keys(response).length > 0) {
            return res.status(200).json({ status: 200, success: true, message: "Vehicle details edit succesfully.", data: {} });
        } else {
            return res.status(500).json({ status: 500, success: false, message: "Vehicle details not edit!", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
}

/* Delete vehicle by id */
export const deleteVehicle = async (req, res) => {
    const { id } = req.query;
    try {
        const response = await deleteVehicleById(id, req.user.id);
        if (response && Object.keys(response).length > 0) {
            return res.status(200).json({ status: 200, success: true, message: "Vehicle details delete succesfully.", data: {} });
        } else {
            return res.status(500).json({ status: 500, success: false, message: "Vehicle details not delete!", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
}