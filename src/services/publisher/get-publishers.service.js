import { prisma } from '../../lib/prisma.js'

export const getPublishersService = async (publisherId) => {
    try {

        // if(publisherId) {
        //     const publisher = await prisma.publisher.findUnique({
        //         where: {
        //             id: publisherId
        //         }
        //     })

        //     if(!publisher) {
        //         throw new Error('PUBLISHER_NOT_FOUND')
        //     }

        //     return publisher
        // }

        const publishers = await prisma.publisher.findMany()

        return publishers
        
    } catch (error) {
        throw error
    }
}