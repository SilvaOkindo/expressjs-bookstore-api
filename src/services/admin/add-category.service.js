import { prisma } from "../../lib/prisma.js";

export const addCategoryService = async (data) => {
    const { name, description } = data
  try {
    const category = await prisma.category.findUnique({
      where: { name: data.name },
    });

    if (category) {
      throw new Error("CATEGORY_ALREADY_EXISTS");
    }

    const newCategory = await prisma.category.create({
      data: {
        name: name,
        description: description,
      },
    });

    return newCategory;
  } catch (error) {
    throw error;
  }
};
