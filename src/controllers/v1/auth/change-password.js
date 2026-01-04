import { logger } from "../../../utils/logger.js";
import { changePasswordService } from "../../../services/user/change-password.service.js";

export const changePassword = async (req, res) => {
  try {
    const userId  = req.user.id;
    const { password, newPassword, confirmPassword } = req.body;
    
    const message = await changePasswordService(
      userId,
      password,
      newPassword,
      confirmPassword
    );

    logger.info("Change Password Success: Password changed successfully");
    return res.status(200).json({ message: message });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      logger.warn("Change Password Warning: User not found");
      return res.status(404).json({ message: "User not found" });
    } else if (error.message === "WRONG_PASSWORD") {
      logger.warn("Change Password Warning: Current password is incorrect");
      return res.status(400).json({ message: "Current password is incorrect" });
    } else if (error.message === "PASSWORD_NOT_MATCH") {
      logger.warn(
        "Change Password Warning: New password and confirm password do not match"
      );
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }
    logger.error("Change Password Error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
