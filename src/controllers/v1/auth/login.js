import { loginUserService } from "../../../services/auth/login.service.js";
import { logger } from "../../../utils/logger.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUserService(email, password);

    res.status(200).json(
      user,
    );
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      logger.warn("Attempted login with non-existent email:", { email: email });
      return res.status(404).json({ message: "Invalid credentials" });
    }
    logger.error("An error occurred while logging in", {error: error.message});
    res
      .status(500)
      .json({ message: "Internal server error"});
  }
};
