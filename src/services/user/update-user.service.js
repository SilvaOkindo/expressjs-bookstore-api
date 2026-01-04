import { prisma } from "../../lib/prisma.js";
import { Prisma } from "@prisma/client";

const ALLOWED_FIELDS = ["firstName", "email", "lastName"];

export const updateUserService = async (userId, userData) => {
  const safeData = {};

  for (const key of ALLOWED_FIELDS) {
    if (userData[key] !== undefined) {
      safeData[key] = userData[key];
    }
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: safeData,
      select: {
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!updatedUser) {
      throw new Error("USER_NOT_FOUND");
    }

    return updatedUser;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("USER_NOT_FOUND");
    }
    throw error;
  }
};
