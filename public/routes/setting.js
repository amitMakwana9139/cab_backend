import { Router } from "express";
import { validateRequestForQuery } from "../middelware/validation.js";
import { verifytoken } from "../utills/jwt.helper.js";
import { bookingSummaryValidation } from "../validation/setting.js";
import { getSummaryOfSetting } from "../controllers/setting.js";

const router = new Router();

/* Create booking API */
router.get("/getSummaryOfSetting", verifytoken, validateRequestForQuery(bookingSummaryValidation), getSummaryOfSetting);

export default router;  