import { Router } from "express";
import { validateRequest, validateRequestForQuery } from "../middelware/validation.js";
import { createBookingValidation, getBookingsValidation } from "../validation/booking.js";
import { cabBooking, getBookings, getSingleBooking, removeSingleBooking } from "../controllers/booking.js";
import { verifytoken } from "../utills/jwt.helper.js";
import { checkPermission } from "../utills/permission.js";
import { commonIdValidation, paginationValidation } from "../validation/common.js";

const router = new Router();

/* Create booking API */
router.post("/booking", verifytoken, checkPermission("booking", "create"), validateRequest(createBookingValidation), cabBooking);
router.get("/getBookings", verifytoken, validateRequestForQuery(getBookingsValidation), getBookings);
router.get("/getSingleBookingDetails", verifytoken, validateRequestForQuery(commonIdValidation), getSingleBooking);
router.delete("/deleteBooking", verifytoken, validateRequestForQuery(commonIdValidation), removeSingleBooking);

export default router;  