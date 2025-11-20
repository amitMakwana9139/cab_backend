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

/* Check vehicle exist by id */
export const getVehicleById = async (id) => {
    try {
        const response = await Vehicle.findById(id).select({ _id: 1, vehicleNumber: 1 }).lean();
        return response;
    } catch (error) {
        throw new Error("Failed to get vehicle details!");
    }
}

/* Edit vehicle details by id */
export const editVehicleData = async (body) => {
    try {
        const response = await Vehicle.findByIdAndUpdate(body.id, body, { new: true });
        return response;
    } catch (error) {
        throw new Error("Failed to edit vehicle details!");
    }
}

/* Get vehicle details */
export const vehicleList = async (pageLimit, skip, search, user) => {
    try {
        const query = { isDeleted: 0 };

        if (search && search.trim() !== "") {
            query.vehicleName = { $regex: search, $options: "i" }
        }
        if (user.role !== "superAdmin") {
            query.parentAdmin = user._id;
        }

        const getVehicleList = await Vehicle.find(query)
            .limit(pageLimit)
            .skip(skip)
            .sort({ createdAt: -1 })
            .select({ isDeleted: 0, __v: 0, meta: 0, createdBy: 0 })
            .lean();
        const totalCount = await Vehicle.countDocuments(query);
        return { getVehicleList, totalCount };
    } catch (error) {
        throw new Error("Failed to get vehicle details!");
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
};

/* Add vehicle in blacklist */
export const addVehicleInBlacklist = async (body) => {
    try {
        const response = await Vehicle.findOneAndUpdate(
            { _id: body.id },
            {
                isBlock: body.isBlock,
                blockReason: +body.isBlock === 1 ? body.blockReason : ""
            },
            { new: true }
        );
        return response;
    } catch (error) {
        throw new Error("Failed to send otp in mobile number!");
    }
};
