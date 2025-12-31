import { logger } from "../../../utils/logger.js";
import { getAllUsersService } from "../../../services/user/get-all-users.service.js";
import { prisma } from "../../../lib/prisma.js";

export const getAllUsers = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;

    const [totalUsers, users] = await Promise.all([
      await prisma.user.count(),
      await getAllUsersService(limit, offset),
    ]);

    const pages = Math.ceil(totalUsers / limit);
    const page = Math.floor(offset / limit) + 1;

    res.status(200).json({
      success: true,
      users,
      meta: {
        limit: limit,
        page: page,
        total: totalUsers,
        pages: pages,
      },
    });
  } catch (err) {
    logger.error(`Error in getAllUsers controller: ${err.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
