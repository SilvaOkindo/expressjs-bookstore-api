import express from "express";
import { registerUser } from "../controllers/v1/auth/register-user.js";
import { body } from "express-validator";
import { validationError } from "../middleware/validation-error.js";

const router = express.Router();

router.post(
  "/register",
  body("firstName")
    .isString()
    .withMessage("First name must be a string")
    .notEmpty()
    .withMessage("First name cannot be empty"),
  body("lastName")
    .isString()
    .withMessage("Last name must be a string")
    .notEmpty()
    .withMessage("Last name is cannot be empty"),
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .notEmpty()
    .withMessage("Email is cannot be empty"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .notEmpty()
    .withMessage("Password is cannot be empty"),
    validationError,
  registerUser
);

export default router;
