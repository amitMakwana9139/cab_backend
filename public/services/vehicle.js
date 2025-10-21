import Vehicle from "../models/vehicle.js";

/* Check vehicle exist in database or not */
export const checkVehicle = async (body) => {
    try {
        const response = await Vehicle.findOne({ vehicleNumber: body.vehicleNumber, isDeleted: 0 }).select({ _id: 1, vehicleNumber: 1 }).lean();
        return response;
    } catch (error) {
        throw new Error("Failed to check vehicle details!");
    }
}

/* Add vehicle by sub admin */
export const addVehicleData = async (body) => {
    try {
        const response = await Vehicle.create(body);
        return response;
    } catch (error) {
        throw new Error("Failed to add vehicle details!");
    }
}

/* Get vehicle details */
export const vehicleList = async (pageLimit, skip, search, userId) => {
    try {
        const getVehicleList = await Vehicle.find({ /* createdBy: userId, */ isDeleted: 0 })
            .limit(pageLimit)
            .skip(skip)
            .sort({ createdAt: -1 })
            .select({ isBlock: 0, isDeleted: 0, __v: 0, meta: 0, createdBy: 0 })
            .lean();
        const totalCount = await Vehicle.countDocuments({ /* createdBy: userId */ });
        return { getVehicleList, totalCount };
    } catch (error) {
        throw new Error("Failed to get booking details!");
    }
};

/* Delete vehicle details */
export const deleteVehicleById = async (id, userId) => {
    try {
        const response = await Vehicle.findByIdAndUpdate({ _id: id, createdBy: userId }, { isDeleted: 1 });
        return response;
    } catch (error) {
        throw new Error("Failed to delete single booking details!");
    }
}
