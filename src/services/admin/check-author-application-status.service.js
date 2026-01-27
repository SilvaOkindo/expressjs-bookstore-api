import { prisma} from '../../lib/prisma.js'

export const checkAuthorApplicationStatusService = async (authorId) => {
    try {
        const application = await prisma.authorApplication.findUnique({
            where: { userId: authorId }
        })

        return application
    } catch (error) {
        throw error
    }
}