import { getCurrentUserService } from "../../../services/user/get-current-user.service";
import { logger } from "../../../utils/logger"

export const getCurrentUser = async (req, res) => {
    const {id} = req.user 

    try {

        const user = await getCurrentUserService(id)

        return res.status(200).json({
            user
        })
        
    } catch (err) {
        if(err.message === "USER_NOT_FOUND") {
            logger.warn(`User not found: ${user.id}`);
            return res.status(404).json({
                message: "User not found"
            })
        }

        logger.error('Error fetching current user:', err)
        res.status(500).json({
            message: "Internal server error",
        })
    }
}