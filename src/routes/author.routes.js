import express from "express";
import { authenticate } from "../middleware/authentication.js";
import { authorize } from "../middleware/authorize.js";
import { body } from "express-validator";
import { applyToBeAuthor} from '../controllers/v1/author/apply-to-be-author.js'
import { validateError } from "../middleware/error-validation.js";
import { checkApplicationStatus } from '../controllers/v1/author/check-application-status.js'

const router = express.Router();

router.post(
  "/apply",
  body("motivation")
    .optional()
    .isString()
    .withMessage("Motivation must be a string"),
  authenticate,
  authorize(["USER"]),
  validateError,
  applyToBeAuthor
);

router.get('/check-application-status', authenticate, authorize(['USER']), checkApplicationStatus)

export default router;
