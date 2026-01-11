import { applyToBeAuthorService} from '../../../services/author/apply-to-be-author.service.js'
import { logger } from '../../../utils/logger.js'
export const applyToBeAuthor = async (req, res) => {
    try {
        const userId = req.user.id;
        const applicationData = req.body;

        const application = await applyToBeAuthorService(userId, applicationData);

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            data: application
        });
    } catch (error) {
        if (error.message === 'USER_NOT_FOUND') {
            return res.status(404).json({ success: false, message: 'User not found' });
        } else if (error.message === 'ALREADY_AN_AUTHOR') {
            return res.status(400).json({ success: false, message: 'User is already an author' });
        } else if (error.message === 'APPLICATION_ALREADY_EXISTS') {
            return res.status(400).json({ success: false, message: 'An application already exists for this user' });
        }      
        logger.error('Error applying to be author:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}