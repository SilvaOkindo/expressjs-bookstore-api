import { logger } from '../../../utils/logger.js'
import { checkApplicationStatusService } from '../../../services/author/check-application-status.service.js'

export const checkApplicationStatus = async (req, res) => {

    const userId = req.user.id

    try {

        const applicationStatus = await checkApplicationStatusService(userId)

        res.status(200).json({
            status: applicationStatus
        })

        
    } catch (error) {
        if(error.message === 'USER_NOT_FOUND') {
            logger.warn("Check application status error: user not found")
            return res.status(400).json({
                message: 'User not found'
            })
        }

        if(error.message === 'APPLICATION_NOT_FOUND') {
            logger.warn('Check application status error: application not found')
            return res.status(400).json({
                message: 'Application not found'
            })
        }

        logger.error('Check applicaton status error: ', {error})
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}