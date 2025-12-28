import { logger } from "../utils/logger.js"


export const authorize = (roles) => {
    return (req, res, next) => {
        const user = req.user

        console.log('user', user)

        try {

            if(!user) {
                return res.status(403).json({
                    message: "Access denied. Authorization needed"
                })
            }

            if(!roles.includes(user.role)) {
                logger.warn("User trying to access unauthorized resources")
                return res.status(403).json({
                    message: "You are not authorized to access this resource"
                })
            }

            next()


            
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            })
            logger.error("An error occurred while authorizing a user", {error})
        }
    }
}