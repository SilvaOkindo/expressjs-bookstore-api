import { logger } from '../../../utils/logger.js'
import { getPublishersService } from '../../../services/publisher/get-publishers.service.js'

export const getPublishers = async (req, res) => {
    //const { publisherId } = req.params
    try {

        const publishers = await getPublishersService()

        return res.status(200).json({
            data: publishers
        })
        
    } catch (error) {
        // if(error.message === 'PUBLISHER_NOT_FOUND') {
        //     logger.warn('Publisher not found:', {publisherId})
        //     return res.status(404).json({
        //         message: 'Publisher not found'
        //     })
        // }
        logger.error('Error fetching publishers:', {error})
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}