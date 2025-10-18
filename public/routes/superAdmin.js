import { Router } from "express";
import { validateRequest } from "../middelware/validation.js";
import { createAdminValidation, createSuperAdminValidation, signinSuperAdminValidation } from "../validation/superAdmin.js";
import { createAdmin, registerSuperAdmin, userLogin } from "../controllers/superAdmin.js";
import { verifytoken } from "../utills/jwt.helper.js";

const router = new Router();

/* Creaet super admin API */
router.post("/createSuperAdmin", validateRequest(createSuperAdminValidation), registerSuperAdmin);
router.post("/loginSuperAdmin", validateRequest(signinSuperAdminValidation), userLogin);
router.post("/createAdmin", verifytoken, validateRequest(createAdminValidation), createAdmin);

export default router;  