import { logger } from '../../../utils/logger.js'
import { deleteCurrentUserService } from '../../../services/user/delete-user.service.js'

export const deleteUserById = async (req, res) => {
    const userId = req.params.id
    try {

        const id = parseInt(userId)

        const deletedUser = await deleteCurrentUserService(id)

        logger.info("Deleted user successfully", {deletedUser})

        res.sendStatus(204)
        
    } catch (err) {
        if(err.message === 'USER_NOT_FOUND') { 
            logger.warn(`User with id ${userId} not found`)
            return res.status(400).json({
                message: "User not found"
            })
        }
        logger.error("An error occurred while deleting user" , {err})
        res.status(500).json({
            message: "Internal server error"
        })
    }
}