import { uploadToCloudinary } from "../lib/cloudinary.js";
import { logger } from "../utils/logger.js";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const uploadBanner = (method = "post") => {
  return async (req, res, next) => {
    // PUT: file optional
    if (method === "put" && !req.file) {
      return next();
    }

    // POST: file required
    if (!req.file) {
      return res.status(400).json({
        message: "Book cover is required",
      });
    }

    if (req.file.size > MAX_FILE_SIZE) {
      return res.status(413).json({
        message: "File size must be less than 2 MB",
      });
    }

    try {
      const data = await uploadToCloudinary(req.file.buffer);

      if (!data) {
        logger.error("Cloudinary returned no data");
        return res.status(500).json({
          message: "Internal server error",
        });
      }

      req.body.bookCover = {
        url: data.secure_url,
        publicId: data.public_id,
      };

      logger.info("Book cover uploaded successfully");
      next();
    } catch (error) {
      logger.error("Error uploading image to cloudinary", error);

      res.status(error.http_code || 500).json({
        message: error.message || "Upload failed",
      });
    }
  };
};
