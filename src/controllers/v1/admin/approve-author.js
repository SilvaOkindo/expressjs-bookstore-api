import { approveAuthorService } from "../../../services/admin/approve-author.service.js"
import { logger } from '../../../utils/logger.js'

export const approveAuthor = async (req, res) => {
    try {

        const userId = parseInt(req.params.id)

        const application = await approveAuthorService(userId)

        return res.status(200).json(
            application
        )
        
    } catch (error) {
        if(error.message === 'USER_NOT_FOUND') {
            return res.status(400).json({
                message: 'User not found'
            })
        } else if(error.message === 'APPLICATION_NOT_FOUND') {
            return res.status(400).json({
                message: 'Application not found'
            })
        }
        logger.error('Approve author error: ', {error})
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// todos test approve endpoint,