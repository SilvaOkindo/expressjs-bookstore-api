import { prisma } from '../../lib/prisma.js'
export const addPublisherService = (publisherData) => {
    try {
        
        const newPublisher = prisma.publisher.create({
            data: {
                ...publisherData
            }
        })

        return newPublisher
    } catch (error) {
        throw error
    }
}