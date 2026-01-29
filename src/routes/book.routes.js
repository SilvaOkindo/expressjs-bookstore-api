import express from "express";
import multer from "multer";

import { uploadBanner } from "../middleware/multer-middleware.js";
import { addBook } from "../controllers/v1/book/add-book.js";
import { authenticate } from "../middleware/authentication.js";
import { authorize } from "../middleware/authorize.js";
import { body } from "express-validator";
import { validateError } from "../middleware/error-validation.js";

const upload = multer();

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(["AUTHOR"]),
  upload.single("bookCover"),

  body("title").notEmpty().withMessage("Book title is required"),
  body("description").notEmpty().withMessage("Book description is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("publisher").notEmpty().withMessage("Publisher is required"),
  body("isbn").notEmpty().withMessage("ISBN is required"),

  validateError,
  uploadBanner("post"),
  addBook
);

export default router;
