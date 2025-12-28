import { prisma } from "../../lib/prisma.js";
import { hashPassword } from "../../utils/hash-password.js";
import { logger } from "../../utils/logger.js";

export const registerUserService = async (
  firstName,
  lastName,
  email,
  password
) => {
  try {

    const user = await prisma.user.findUnique({where: {
        email: email
    }})

    if(user) {
        throw new Error("USER_ALREADY_EXISTS");
    }


    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return newUser;
  } catch (err) {
    if(err === 'P2002') {
        throw new Error("USER_ALREADY_EXISTS");
    }
    //logger.error("error registering user:", err);
    throw err
  }
};
