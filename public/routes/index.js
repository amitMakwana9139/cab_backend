// import userRouter from "./user.js"
import taskRouter from "./task.js"
import superAdminRounter from "./superAdmin.js"
import bookingRounter from "./booking.js"
import { Router } from "express";

const router = new Router();

// router.use("/user", userRouter)
router.use("/taskAssign", taskRouter);
router.use("/superAdmin", superAdminRounter);
router.use("/booking", bookingRounter);

export default router;