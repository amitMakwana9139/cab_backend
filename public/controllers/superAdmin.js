import { decryptData, encryptData } from "../common/randomPassword.js";
import { createSuperAdmin, editDriver, getDashboardDetails, getUser } from "../services/superAdmin.js";
import { authToken } from "../utills/jwt.helper.js";

/* Register super admin API  */
export const registerSuperAdmin = async (req, res) => {
    const body = req.body;
    let randomePassword = '123456';
    try {
        const isUserExist = await getUser({ mobile: body.body });
        if (isUserExist) {
            return res.status(409).json({ status: 409, success: false, message: "User already exist!", data: {} });
        }
        body.role = "superAdmin";
        body.password = await encryptData(randomePassword)
        const response = await createSuperAdmin(body);
        if (response) {
            return res.status(200).json({ status: 200, success: true, message: "Super admin create succesfully!", data: {} });
        } else {
            return res.status(500).json({ status: 500, success: false, message: "Super admin not create!", data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
}

/* Common user login API */
export const userLogin = async (req, res) => {
    const { email, mobile, password } = req.body;
    try {
        let isUserExist = await getUser({ mobile: mobile });
        if (!isUserExist) {
            return res.status(400).json({ status: 400, success: false, message: "User does not exist!", data: {} });
        } else {
            // let decryptPassword = "123456";
            let decryptPassword = await decryptData(isUserExist.password);
            if (decryptPassword !== password) {
                return res.status(500).json({ status: 500, success: false, message: "Invalid login credintial!", data: {} });
            } else {
                let token = await authToken({ _id: isUserExist._id });
                isUserExist = JSON.parse(JSON.stringify(isUserExist));
                isUserExist.token = token;
                return res.status(200).json({ status: 200, success: true, message: "Login successfull!", data: isUserExist });
            }
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
};

/* Create admin by super admin */
export const createUser = async (req, res) => {
    const body = req.body;
    let randomePassword = '123456';
    try {
        const isUserExist = await getUser({ mobile: body.mobile });
        if (isUserExist) {
            return res.status(409).json({ status: 409, success: false, message: "User already exist!", data: {} });
        }
        body.role = +body.role === 2 ? "subAdmin" : +body.role === 0 ? "user" : +body.role === 4 ? "driver" : "admin";
        body.createdBy = req.user._id;
        body.theme = req.user.theme;
        body.password = await encryptData(randomePassword);
        const response = await createSuperAdmin(body);
        if (response) {
            return res.status(200).json({ status: 200, success: true, message: `${+body.role === 2 ? "subAdmin" : +body.role === 0 ? "user" : +body.role === 4 ? "driver" : "admin"} create succesfully!`, data: {} });
        } else {
            return res.status(500).json({ status: 500, success: false, message: `${+body.role === 2 ? "subAdmin" : +body.role === 0 ? "user" : +body.role === 4 ? "driver" : "admin"} not create!`, data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
};


/* Add driver in blacklist */
export const blacklistDriver = async (req, res) => {
    const body = req.body;
    try {
        const isUserExist = await getUser({ _id: body.id, role: "driver" });
        if (!isUserExist) {
            return res.status(404).json({ status: 404, success: false, message: "User not exist!", data: {} });
        }
        const response = await editDriver(body);
        if (response) {
            return res.status(200).json({ status: 200, success: true, message: `Driver ${body.isBlock === 1 ? "block" : "unBlock"} succesfully!`, data: {} });
        } else {
            return res.status(500).json({ status: 500, success: false, message: `Driver not ${body.isBlock === 1 ? "block" : "unBlock"}!`, data: {} });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
};

/* Get dashboard details of superAdmin */
export const getDashboard = async (req, res) => {
    try {
        if (req.user.role !== "superAdmin") {
            return res.status(401).json({ status: 401, success: false, message: "You have no rights to get data!", data: {} });
        }

        const { totalBooking, totalUser, userList, carList } = await getDashboardDetails();
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Dashboard data get succesfully!",
            data: {
                totalBooking,
                totalUser,
                userList,
                carList
            }
        })
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error", data: {} });
    }
}