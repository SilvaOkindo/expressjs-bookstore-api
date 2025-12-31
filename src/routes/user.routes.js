import express from "express";
import { getCurrentUser } from "../controllers/v1/user/get-current-user.js";
import { authenticate } from "../middleware/authentication.js";
import { authorize } from "../middleware/authorize.js";
import { deleteCurrentUser } from "../controllers/v1/user/delete-current-user.js";

const router = express.Router();

router.get(
  "/profile",
  authenticate,
  authorize(["ADMIN", "AUTHOR", "USER", "PUBLISHER"]),
  getCurrentUser
);

router.delete(
  "/delete",
  authenticate,
  authorize(["ADMIN", "AUTHOR", "USER", "PUBLISHER"]),
  deleteCurrentUser
);

export default router;
