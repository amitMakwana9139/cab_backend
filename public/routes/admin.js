import { Router } from "express";
import { validateRequest } from "../middelware/validation";

const router = new Router();

/* Create subAdmin by admin API */
// router.post("/createAdmin", validateRequest(createSuperAdminValidation),);

export default router;  