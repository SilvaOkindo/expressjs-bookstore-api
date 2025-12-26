import express from "express";
import { registerUser } from "../controllers/v1/auth/register-user.js";
import { body } from "express-validator";
import { validationError } from "../middleware/validation-error.js";
import { loginUser } from "../controllers/v1/auth/login.js";

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

export default router;
