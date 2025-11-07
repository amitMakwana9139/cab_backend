import { Router } from "express";
import { validateRequestForQuery } from "../middelware/validation.js";
import { verifytoken } from "../utills/jwt.helper.js";
import { commonIdValidation, paginationValidation } from "../validation/common.js";
import { getAssignBooking, getDrivers, removeDriver } from "../controllers/driver.js";

const router = new Router();

/* CRUD of driver API */
router.get("/getDriverDetails", verifytoken, validateRequestForQuery(paginationValidation), getDrivers);
router.delete("/deleteDriver", verifytoken, validateRequestForQuery(commonIdValidation), removeDriver);

/* Get assign booking details of driver */
router.get("/getAssignBookings", verifytoken, validateRequestForQuery(paginationValidation), getAssignBooking);
export default router;  