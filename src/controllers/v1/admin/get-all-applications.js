import { getAllApplicationService } from "../../../services/admin/get-all-application.service.js"
import { logger } from "../../../utils/logger.js"

export const getAllApplications = async (req, res) => {
    try {

        const applications = await getAllApplicationService()

        res.status(200).json({
            applications
        })
        
    } catch (error) {
        logger.error('Error fetching author applications:', {error})
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}