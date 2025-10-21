import { Router } from "express";
import { validateRequest, validateRequestForQuery } from "../middelware/validation.js";
import { verifytoken } from "../utills/jwt.helper.js";
import { addVehicleValidation, editVehicleValidation } from "../validation/vehicle.js";
import { addVehicle, deleteVehicle, editVehicle, getVehicle } from "../controllers/vehicle.js";
import { commonIdValidation, paginationValidation } from "../validation/common.js";

const router = new Router();

/* Add new vehicle by sub admin */
router.post("/addVehicle", verifytoken, validateRequest(addVehicleValidation), addVehicle);
router.get("/getVehicle", verifytoken, validateRequestForQuery(paginationValidation), getVehicle);
router.put("/editVehicle", verifytoken, validateRequest(editVehicleValidation), editVehicle);
router.delete("/deleteVehicle", verifytoken, validateRequestForQuery(commonIdValidation), deleteVehicle);

export default router;  