import { Router } from "express";
import { validateRequest } from "../middelware/validation.js";
import { createBookingValidation } from "../validation/booking.js";
import { cabBooking } from "../controllers/booking.js";
import { verifytoken } from "../utills/jwt.helper.js";
import { checkPermission } from "../utills/permission.js";

const router = new Router();

/* Create booking API */
router.post("/booking", verifytoken, checkPermission("booking", "create"), validateRequest(createBookingValidation), cabBooking);

export default router;  