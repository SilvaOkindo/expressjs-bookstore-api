import { prisma } from '../../lib/prisma.js'

export const checkApplicationStatusService = async (userId) => {
    try {

        const user = await prisma.user.findUnique({where: {id: userId}, select: {id: true}})

        if(!user) throw new Error("USER_NOT_FOUND")

        const application = await prisma.authorApplication.findUnique({where: {userId: userId}})

        if(!application) throw new Error("APPLICATION_NOT_FOUND")
        

        return application.status
        
    } catch (error) {
        throw error
    }
}