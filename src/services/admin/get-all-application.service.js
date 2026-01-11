import { prisma } from '../../lib/prisma.js'

export const getAllApplicationService = async () => { 
    try {

        const applications = await prisma.authorApplication.findMany()

        return applications
        
    } catch (error) {
        throw error
    }
}