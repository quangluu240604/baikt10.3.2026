import { Router } from "express";

import { asyncHandler } from "../middlewares/asyncHandler.js";
import {
  createRoleController,
  deleteRoleController,
  getAllRolesController,
  getRoleByIdController,
  getUsersByRoleController,
  updateRoleController,
} from "../controllers/roleController.js";

const router = Router();

router.post("/", asyncHandler(createRoleController));
router.get("/", asyncHandler(getAllRolesController));
router.get("/:id", asyncHandler(getRoleByIdController));
router.put("/:id", asyncHandler(updateRoleController));
router.delete("/:id", asyncHandler(deleteRoleController));
router.get("/:id/users", asyncHandler(getUsersByRoleController));

export default router;
