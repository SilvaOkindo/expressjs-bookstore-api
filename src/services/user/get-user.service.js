import { prisma} from '../../lib/prisma.js'

export const getCurrentUserService = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true
            }
        })

        if (!user) {
            throw new Error("USER_NOT_FOUND")
        }

        return user

    } catch (error) {
        throw error
    }
}