import express from "express";
import { registerUser } from "../controllers/v1/auth/register-user.js";
import { body } from "express-validator";
import { validationError } from "../middleware/validation-error.js";
import { loginUser } from "../controllers/v1/auth/login.js";
import { authenticate } from "../middleware/authentication.js";
import { checkAuth } from "../controllers/v1/auth/check-auth.js";
import { authorize } from "../middleware/authorize.js";
import { changePassword } from "../controllers/v1/auth/change-password.js";

const router = express.Router();

router.post(
  "/register",
  body("firstName")
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isString()
    .withMessage("First name must be a string"),
  body("lastName")
    .notEmpty()
    .withMessage("Last name is cannot be empty")
    .isString()
    .withMessage("Last name must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Email is cannot be empty")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .notEmpty()
    .withMessage("Password is cannot be empty")
    .isString()
    .withMessage("First name must be a string"),
  validationError,
  registerUser
);

router.post(
  "/login",
  body("email").notEmpty().withMessage("Email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validationError,
  loginUser
);

router.patch(
  "/change-password",
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password cannot be less than 6 characters"),
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("new password cannot be empty")
    .isString()
    .withMessage("new password must be a string")
    .isLength({ min: 6 })
    .withMessage("new password cannot be less than 6 characters"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("confim password cannot be empty")
    .isString()
    .withMessage("confirm password must be a string")
    .isLength({ min: 6 })
    .withMessage("confirm password cannot be less than 6 characters"),
  authenticate,
  authorize(["ADMIN", "AUTHOR", "USER", "PUBLISHER"]),
  validationError,
  changePassword
);

router.get(
  "/check-auth",
  authenticate,
  authorize(["ADMIN", "AUTHOR", "USER", "PUBLISHER"]),
  checkAuth
);

export default router;
