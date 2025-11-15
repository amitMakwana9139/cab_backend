import { decryptData, encryptData } from "../common/randomPassword.js";
import { editOtp, getUser } from "../services/superAdmin.js";
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
        const response = await customerList(pageLimit, skip, search, req.user);
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
};

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
};

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
};

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
};

/* Send otp by mobile number */
export const sendOtp = async (req, res) => {
    const body = req.body;
    let otp = 456789; //generateOtp();
    try {
        const isUserExist = await getUser({ mobile: body.mobile, isDeleted: 0 });
        if (!isUserExist || Object.keys(isUserExist).length === 0) {
            return res.status(404).json({ status: 404, success: false, message: "User not found!", data: {} });
        }

        const response = await editOtp(body.mobile, otp);
        if (response) {
            return res.status(200).json({ status: 200, success: true, message: "OTP sent successfully!", data: response });
        } else {
            return res.status(500).json({ status: 500, success: false, message: "OTP not sent!", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
};

/* Otp verify by mobile number and otp */
export const verifyOtp = async (req, res) => {
    const body = req.body;
    try {
        const isUserExist = await getUser({ mobile: body.mobile, isDeleted: 0 });
        if (!isUserExist || Object.keys(isUserExist).length === 0) {
            return res.status(404).json({ status: 404, success: false, message: "User not found!", data: {} });
        }

        if (isUserExist.otp !== body.otp) {
            return res.status(409).json({ status: 409, success: false, message: "Invalid otp!", data: {} });
        } else {
            return res.status(200).json({ status: 200, success: true, message: "Otp verify succesfully!", data: {} });
        }

    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
};

/* Forgot password API with validation  */
export const forgotPassword = async (req, res) => {
    const body = req.body;
    try {
        const isUserExist = await getUser({ mobile: body.mobile, isDeleted: 0 });
        if (!isUserExist || Object.keys(isUserExist).length === 0) {
            return res.status(404).json({ status: 404, success: false, message: "User not found!", data: {} });
        }

        if (body.newPassword !== body.confirmPassword) {
            return res.status(409).json({ status: 409, success: false, message: "Please enter valid password!", data: {} });
        }
        const encryptPassword = await encryptData(body.newPassword);
        const response = await editCustomerById({ id: isUserExist._id, password: encryptPassword });
        if (response) {
            return res.status(200).json({ status: 200, success: true, message: "Password edit succesfully.", data: {} });
        } else {
            return res.status(404).json({ status: 404, success: false, message: "Password not edit!", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
};

/* Get user profile  */
export const getUserProfile = async (req, res) => {
    try {
        const response = await getUser({ _id: req.user._id }, { name: 1, email: 1, mobile: 1, image: 1, password: 1, permissions: 1 });
        if (response && Object.keys(response).length > 0) {
            return res.status(200).json({ status: 200, success: true, message: "User profile get succesfully!", data: response });
        } else {
            return res.status(404).json({ status: 404, success: false, message: "Internal server error", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
}
