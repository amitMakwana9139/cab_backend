import User from "../models/user.js";

/* Create customer */
export const addCustomer = async (body) => {
    try {
        const response = await User.create(body);
        return response;
    } catch (error) {
        throw new Error("Failed to create customer!");
    }
}

/* Get customer list */
export const customerList = async (pageLimit, skip, search, user) => {
    try {
        const query = { isDeleted: 0, role: "customer" };

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

        const getCustomerList = await User.find(query)
            .limit(pageLimit)
            .skip(skip)
            .sort({ createdAt: -1 })
            .select({ name: 1, mobile: 1, profileImage: 1, createdAt: 1 })
            .lean();
        const totalCount = await User.countDocuments(query);
        return { getCustomerList, totalCount };
    } catch (error) {
        throw new Error("Failed to get customer details!");
    }
};

/* Edit customer details by id */
export const editCustomerById = async (body) => {
    try {
        const response = await User.findByIdAndUpdate({ _id: body.id }, body, { new: true });
        return response;
    } catch (error) {
        throw new Error("Failed to edit customer!");
    }
};

/* Delete customer by id soft delete */
export const deleteCustomerById = async (id) => {
    try {
        const response = await User.findByIdAndUpdate({ _id: id }, { isDeleted: 1 }, { new: true });
        return response;
    } catch (error) {
        throw new Error("Failed to delete customer!");
    }
};

/* Get all user list */
export const userList = async (pageLimit, skip, search, user) => {
    try {
        // Build the base query
        const query = { isDeleted: 0 };

        // Add search filter if search term exists
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

        const getUserList = await User.find(query).populate({
            path: "createdBy",
            select: "name email mobile"
        })
            .limit(pageLimit)
            .skip(skip)
            .sort({ createdAt: -1 })
            .select({ name: 1, mobile: 1, email: 1, role: 1, image: 1, profileImage: 1, theme: 1, createdAt: 1, permissions: 1 })
            .lean();
        const totalCount = await User.countDocuments(query);
        return { getUserList, totalCount };
    } catch (error) {
        throw new Error("Failed to get customer details!");
    }
};