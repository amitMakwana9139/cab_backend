import { Router } from "express";
import { validateRequest, validateRequestForQuery } from "../middelware/validation.js";
import { createBookingValidation, editBookingValidation, getBookingsValidation } from "../validation/booking.js";
import { cabBooking, editBooking, getBookings, getSingleBooking, removeSingleBooking } from "../controllers/booking.js";
import { verifytoken } from "../utills/jwt.helper.js";
import { checkPermission } from "../utills/permission.js";
import { commonIdValidation } from "../validation/common.js";

const router = new Router();

/* checkPermission("booking", "edit") */
/* Create booking API */
router.post("/booking", verifytoken, validateRequest(createBookingValidation), cabBooking);
router.patch("/editBooking", verifytoken, validateRequest(editBookingValidation), editBooking);
router.get("/getBookings", verifytoken, validateRequestForQuery(getBookingsValidation), getBookings);
router.get("/getSingleBookingDetails", verifytoken, validateRequestForQuery(commonIdValidation), getSingleBooking);
router.delete("/deleteBooking", verifytoken, validateRequestForQuery(commonIdValidation), removeSingleBooking);

export default router;  