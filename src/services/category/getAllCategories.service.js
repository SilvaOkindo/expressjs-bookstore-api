import { prisma } from "../../lib/prisma.js"

export const getAllCategoriesServices = async () => {
    try {

        const categories = await prisma.category.findMany()

        return categories
        
    } catch (error) {
        throw error
    }
}