// import userRouter from "./user.js"
import taskRouter from "./task.js"
import superAdminRounter from "./superAdmin.js"
import { Router } from "express";

const router = new Router();

// router.use("/user", userRouter)
router.use("/taskAssign", taskRouter);
router.use("/superAdmin", superAdminRounter);

export default router;