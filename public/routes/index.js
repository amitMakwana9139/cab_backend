import { Router } from "express";
import superAdminRounter from "./superAdmin.js"
import bookingRounter from "./booking.js"
import vehicleRounter from "./vehicle.js"

const router = new Router();

// router.use("/user", userRouter)
router.use("/superAdmin", superAdminRounter);
router.use("/booking", bookingRounter);
router.use("/vehicle", vehicleRounter);

export default router;