import { Router } from "express";
import { validateRequest } from "../middelware/validation.js";
import { createSuperAdminValidation } from "../validation/superAdmin.js";
import { registerSuperAdmin } from "../controllers/superAdmin.js";
import { verifytoken } from "../utills/jwt.helper.js";

const router = new Router();

/* Create user API */
router.post("/addUser", verifytoken, validateRequest(createSuperAdminValidation), registerSuperAdmin);

export default router;  