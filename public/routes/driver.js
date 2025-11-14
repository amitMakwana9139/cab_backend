import { Router } from "express";
import { validateRequest, validateRequestForQuery } from "../middelware/validation.js";
import { verifytoken } from "../utills/jwt.helper.js";
import { commonIdValidation, paginationValidation } from "../validation/common.js";
import { editBookingStatus, getAssignBooking, getDrivers, removeDriver } from "../controllers/driver.js";
import { bookingStatusChangeValidation } from "../validation/driver.js";

const router = new Router();

/* CRUD of driver API */
router.get("/getDriverDetails", verifytoken, validateRequestForQuery(paginationValidation), getDrivers);
router.delete("/deleteDriver", verifytoken, validateRequestForQuery(commonIdValidation), removeDriver);

/* Get assign booking details of driver */
router.get("/getAssignBookings", verifytoken, validateRequestForQuery(paginationValidation), getAssignBooking);

/* Edit booking status by driver */
router.put("/editBookingStatus", verifytoken, validateRequest(bookingStatusChangeValidation), editBookingStatus);

export default router;  