import { Router } from "express";
import { validateRequest } from "../middelware/validation.js";
import { createSuperAdminValidation, signinSuperAdminValidation } from "../validation/superAdmin.js";
import { registerSuperAdmin, userLogin } from "../controllers/superAdmin.js";

const router = new Router();

/* Create super admin API */
router.post("/createSuperAdmin", validateRequest(createSuperAdminValidation), registerSuperAdmin);
router.post("/loginSuperAdmin", validateRequest(signinSuperAdminValidation), userLogin);

export default router;  