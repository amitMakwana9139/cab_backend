import { getUser } from "../services/superAdmin.js";
import { addCustomer, customerList, deleteCustomerById, editCustomerById, userList } from "../services/user.js";

/* Create user API by super admin and admin */
export const createCustomer = async (req, res) => {
    const body = req.body;
    try {
        body.role = "customer";
        const isUserExist = await getUser({ mobile: body.mobile });
        if (isUserExist && Object.keys(isUserExist).length > 0) {
            return res.status(409).json({ status: 409, success: false, message: "User already exist!", data: {} });
        }
        const response = await addCustomer(body);
        if (response) {
            return res.status(200).json({ status: 200, success: true, message: "Customer created successfully!", data: {} });
        } else {
            return res.status(500).json({ status: 500, success: false, message: "Customer not created!", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
};

/* Get customer list API with validation */
export const getCustomerList = async (req, res) => {
    const { page, limit, search } = req.query;
    try {
        const pageNumber = Number(page ?? 1);
        const pageLimit = Number(limit ?? 1);
        const skip = (pageNumber - 1) * pageLimit;
        const response = await customerList(pageLimit, skip, search);
        if (response && response.getCustomerList?.length > 0) {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Customer list get succesfully.",
                data: {
                    data: response.getCustomerList,
                    count: response.totalCount,
                    page: Math.ceil((response.totalCount / pageLimit))
                }
            });
        } else {
            res.status(200).json({
                status: 200,
                success: false,
                message: "Customer list not get!",
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

/* Edit customer details API with validation */
export const editCustomer = async (req, res) => {
    const body = req.body;
    try {
        const isUserExist = await getUser({ _id: body.id, isDeleted: 0 });
        if (!isUserExist || Object.keys(isUserExist).length === 0) {
            return res.status(404).json({ status: 404, success: false, message: "User not found!", data: {} });
        }

        const isMobileExist = await getUser({ mobile: body.mobile, isDeleted: 0, _id: { $ne: body.id } });
        if (isMobileExist && Object.keys(isMobileExist).length > 0) {
            return res.status(409).json({ status: 409, success: false, message: "Mobile number already in use!", data: {} });
        }

        const response = await editCustomerById(body);
        if (response) {
            return res.status(200).json({ status: 200, success: true, message: "Customer details updated successfully!", data: {} });
        } else {
            return res.status(500).json({ status: 500, success: false, message: "Customer details not updated!", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
}

/* Delete customer API with validation */
export const deleteCustomer = async (req, res) => {
    const { id } = req.query;
    try {
        const isUserExist = await getUser({ _id: id, isDeleted: 0 });
        if (!isUserExist || Object.keys(isUserExist).length === 0) {
            return res.status(404).json({ status: 404, success: false, message: "User not found!", data: {} });
        }
        const response = await deleteCustomerById(id);
        if (response) {
            return res.status(200).json({ status: 200, success: true, message: "Customer deleted successfully!", data: {} });
        } else {
            return res.status(500).json({ status: 500, success: false, message: "Customer not deleted!", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
}

/* Get all user list API with validation */
/* Get customer list API with validation */
export const getUserList = async (req, res) => {
    const { page, limit, search } = req.query;
    try {
        const pageNumber = Number(page ?? 1);
        const pageLimit = Number(limit ?? 1);
        const skip = (pageNumber - 1) * pageLimit;
        const response = await userList(pageLimit, skip, search);
        if (response && response.getUserList?.length > 0) {
            res.status(200).json({
                status: 200,
                success: true,
                message: "User list get succesfully.",
                data: {
                    data: response.getUserList,
                    count: response.totalCount,
                    page: Math.ceil((response.totalCount / pageLimit))
                }
            });
        } else {
            res.status(200).json({
                status: 200,
                success: false,
                message: "User list not get!",
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