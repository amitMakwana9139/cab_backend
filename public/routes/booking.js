import { Router } from "express";
import { validateRequest, validateRequestForQuery } from "../middelware/validation.js";
import { createBookingValidation } from "../validation/booking.js";
import { cabBooking, getBookings } from "../controllers/booking.js";
import { verifytoken } from "../utills/jwt.helper.js";
import { checkPermission } from "../utills/permission.js";
import { paginationValidation } from "../validation/common.js";

const router = new Router();

/* Create booking API */
router.post("/booking", verifytoken, checkPermission("booking", "create"), validateRequest(createBookingValidation), cabBooking);
router.get("/getBookings", verifytoken, validateRequestForQuery(paginationValidation), getBookings);

export default router;  