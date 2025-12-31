import { prisma } from '../../lib/prisma.js'

export const getAllUsersService = async (limit, offset) => {
    try {

        const users = await prisma.user.findMany({select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
        },
        skip: offset,
        take: limit,
        orderBy: {
            createdAt: 'desc'
        }
    })
        return users
        
    } catch (err) {
        throw err
    }
}