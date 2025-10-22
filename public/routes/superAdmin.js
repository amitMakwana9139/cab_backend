import { Router } from "express";
import { validateRequest } from "../middelware/validation.js";
import { createAdminValidation, createSuperAdminValidation, signinSuperAdminValidation } from "../validation/superAdmin.js";
import { createUser, registerSuperAdmin, userLogin } from "../controllers/superAdmin.js";
import { verifytoken } from "../utills/jwt.helper.js";

const router = new Router();

/* Create super admin API */
router.post("/createSuperAdmin", validateRequest(createSuperAdminValidation), registerSuperAdmin);
router.post("/loginSuperAdmin", validateRequest(signinSuperAdminValidation), userLogin);
router.post("/createUser", verifytoken, validateRequest(createAdminValidation), createUser);

export default router;  