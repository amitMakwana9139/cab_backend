import { Router } from "express";
import superAdminRounter from "./superAdmin.js"
import bookingRounter from "./booking.js"
import vehicleRounter from "./vehicle.js"
import userRouter from "./user.js"

const router = new Router();

// router.use("/user", userRouter)
router.use("/superAdmin", superAdminRounter);
router.use("/booking", bookingRounter);
router.use("/vehicle", vehicleRounter);
router.use("/user", userRouter);
export default router;