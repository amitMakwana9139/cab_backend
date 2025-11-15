import { Router } from "express";
import { validateRequest, validateRequestForQuery } from "../middelware/validation.js";
import { verifytoken } from "../utills/jwt.helper.js";
import { createUserValidation, editUserValidation, forgotPasswordValidation, sendOtpValidation, verifyOtpValidation } from "../validation/user.js";
import { createCustomer, deleteCustomer, editCustomer, forgotPassword, getCustomerList, getUserList, getUserProfile, sendOtp, verifyOtp } from "../controllers/user.js";
import { commonIdValidation, paginationValidation } from "../validation/common.js";

const router = new Router();

/* Create user API */
router.post("/createCustomer", verifytoken, validateRequest(createUserValidation), createCustomer);
router.get("/getCustomerList", verifytoken, validateRequestForQuery(paginationValidation), getCustomerList);
router.put("/editUser", verifytoken, validateRequest(editUserValidation), editCustomer);
router.delete("/deleteCustomer", verifytoken, validateRequestForQuery(commonIdValidation), deleteCustomer);

/* get all user details */
router.get("/getUserList", verifytoken, validateRequestForQuery(paginationValidation), getUserList);

/* Forgot password */
router.post("/sendOtp", validateRequest(sendOtpValidation), sendOtp);
router.post("/verifyOtp", validateRequest(verifyOtpValidation), verifyOtp);
router.put("/forgotPassword", validateRequest(forgotPasswordValidation), forgotPassword);

/* Get login user details */
router.get("/userProfile", verifytoken, getUserProfile);

export default router;  