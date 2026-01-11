import { prisma } from '../../lib/prisma.js'

// todo check if there is no motivation and don't approve


export const approveAuthorService = async (userId) => {
    try {

        const user = await prisma.user.findUnique({where: {id: userId}})

        if(!user) {
            throw new Error('USER_NOT_FOUND')
        }

        const application = await prisma.$transaction(async (prisma) => {
            const application = await prisma.authorApplication.update({where: {userId: userId}, data: {
                status: "APPROVED",
                reviewed_at: new Date()
            }})

            await prisma.user.update({where: {id: userId}, data: {
                role: 'AUTHOR',
            }})

            return application
        })

        return application


        
    } catch (error) {
         if (
      //error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("APPLICATION_NOT_FOUND");
    }
        throw error
    }
}