import { Router } from "express";
import { validateRequestForQuery } from "../middelware/validation.js";
import { getBookings, getSingleBooking } from "../controllers/booking.js";
import { verifytoken } from "../utills/jwt.helper.js";
import { commonIdValidation, paginationValidation } from "../validation/common.js";
import { getDrivers, removeDriver } from "../controllers/driver.js";

const router = new Router();

/* CRUD of driver API */
router.get("/getDriverDetails", verifytoken, validateRequestForQuery(paginationValidation), getDrivers);
router.delete("/deleteDriver", verifytoken, validateRequestForQuery(commonIdValidation), removeDriver);

export default router;  