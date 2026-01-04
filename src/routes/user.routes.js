import express from "express";
import { getCurrentUser } from "../controllers/v1/user/get-current-user.js";
import { authenticate } from "../middleware/authentication.js";
import { authorize } from "../middleware/authorize.js";
import { deleteCurrentUser } from "../controllers/v1/user/delete-current-user.js";
import { getUserById } from "../controllers/v1/user/get-user-by-id.js";
import { deleteUserById } from "../controllers/v1/user/delete-user-by-id.js";
import { param, query, body } from "express-validator";
import { validateError } from "../middleware/error-validation.js";
import { getAllUsers } from "../controllers/v1/user/get-all-users.js";
import { updateUser } from "../controllers/v1/user/update-user.js";

const router = express.Router();

router.get(
  "/",
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be an integer between 1 and 100")
    .toInt(),

  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("offset must be a non-negative integer")
    .toInt(),

  authenticate,
  authorize(["ADMIN"]),
  getAllUsers
);

router.get(
  "/profile",
  authenticate,
  authorize(["ADMIN", "AUTHOR", "USER", "PUBLISHER"]),
  getCurrentUser
);

router.get(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("Id is required")
    .isInt()
    .withMessage("id should be an integer"),
  authenticate,
  authorize(["ADMIN", "AUTHOR", "USER", "PUBLISHER"]),
  validateError,
  getUserById
);

router.put(
  "/",
  body("firstName")
    .optional()
    .isString()
    .withMessage("firstName should be a string"),
  body("lastName")
    .optional()
    .isString()
    .withMessage("lastName should be a string"),
  body("email")
    .optional()
    .isString()
    .withMessage("email should be a string")
    .isEmail()
    .withMessage('Invalid email'),
  authenticate,
  authorize(["ADMIN", "AUTHOR", "USER", "PUBLISHER"]),
  validateError,
  updateUser
);

router.delete(
  "/delete",
  authenticate,
  authorize(["ADMIN", "AUTHOR", "USER", "PUBLISHER"]),
  deleteCurrentUser
);

router.delete(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("Id is required")
    .isInt()
    .withMessage("id should be an integer"),
  authenticate,
  authorize(["ADMIN"]),
  validateError,
  deleteUserById
);

export default router;
