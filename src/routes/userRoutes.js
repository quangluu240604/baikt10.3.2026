import { Router } from "express";

import { asyncHandler } from "../middlewares/asyncHandler.js";
import {
  createUserController,
  deleteUserController,
  disableUserController,
  enableUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controllers/userController.js";

const router = Router();

router.post("/users", asyncHandler(createUserController));
router.get("/users", asyncHandler(getAllUsersController));
router.get("/users/:id", asyncHandler(getUserByIdController));
router.put("/users/:id", asyncHandler(updateUserController));
router.delete("/users/:id", asyncHandler(deleteUserController));
router.post("/enable", asyncHandler(enableUserController));
router.post("/disable", asyncHandler(disableUserController));

export default router;
