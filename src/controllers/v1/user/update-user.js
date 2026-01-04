import { updateUserService } from "../../../services/user/update-user.service.js"
import { logger } from "../../../utils/logger.js"

export const updateUser = async (req, res) => {
    const userId = req.user.id
    try {

        const {firstName, lastName, email} = req.body

        const updatedUser = await updateUserService(userId, {firstName, lastName, email})

        return res.status(200).json({
            user: updatedUser
        })
        
    } catch (error) {
        if(error.message === 'USER_NOT_FOUND') {
            logger.warn("Updating user error: User not found", {userId})
            return res.status(400).json({
                message: "User not found"
            })
        }

        logger.error("An error occurred while updating user", {error})
        res.status(500).json({
            message: "Internal server error"
        })
    }
}