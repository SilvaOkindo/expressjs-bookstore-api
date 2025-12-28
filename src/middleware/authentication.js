import  JsonWebTokenError  from "jsonwebtoken"
import TokenExpiredError from 'jsonwebtoken'
import { logger } from '../utils/logger.js'
import { verifyToken } from "../utils/jwt.js"

export const authenticate = (req, res, next) => {
    const autheaders = req.headers.authorization

    if(!autheaders.startsWith('Bearer ')) {
        res.status(403).json({
            message: "Access denied. Authorization needed"
        })
        return
    }

    const [_, token] = autheaders.split(' ')

    try {

        const user = verifyToken(token)

        req.user = user
        return next()
        
    } catch (error) {
        if(error.name === "JsonWebTokenError") {
            res.status(401).json({
                message: "Invalid token"
            })
            logger.warn("User tried to login with invalid token")
            return
        } else if(error.message ===  "jwt expired") {
            res.status(401).json({
                message: "Token has expired, login and try again"
            })
            logger.warn("User tried to login with an expired token")
            return
        }

        logger.error("An error occurred while authenticating the user", {error})
        res.status(500).json({
            message: "Internal server"
        })
    }

}