import { prisma } from "../../lib/prisma.js";
import {generateRefreshToken, generateToken} from '../../utils/jwt.js'
import {comparePasswords} from '../../utils/compare-passwords.js'

// todo: update imports, save refresh token to db, add cookie handling

export const loginUserService = async (email, password) => {
  try {
    const user = await prisma.user.findUnique({ where: {email: email} });

    if (!user) {
      logger.warn("User tried to login before registration")
      throw new Error("INVALID_CREDENTIALS");
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      logger.warn("Failed login attempt due to incorrect password:", {
        email: email,
      });
        throw new Error("INVALID_CREDENTIALS");
    }

    const tokenData = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(tokenData);
    const refreshToken = generateRefreshToken(tokenData);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id
      }
    })

    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      accessToken: token,
    }
  } catch (error) {
    throw error;
  }
};
