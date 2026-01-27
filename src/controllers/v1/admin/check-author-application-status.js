import { checkAuthorApplicationStatusService } from '../../../services/admin/check-author-application-status.service.js'
import { logger } from '../../../utils/logger.js'


export const checkAuthorApplicationStatus = async (req, res) => {
    try {

        const {authorId} = req.params

        const application = await checkAuthorApplicationStatusService(authorId)

        res.status(200).json( application )
    } catch(err) {
        logger.error('Error checking author application status:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}