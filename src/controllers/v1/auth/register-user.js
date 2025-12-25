import { registerUserService } from "../../../services/user/register.service.js";
import { logger } from "../../../utils/logger.js";

export const registerUser = async (req, res) => {
    try {

        const { firstName, lastName, email, password } = req.body;

        // Call the service to register the user
        const newUser = await registerUserService(firstName, lastName, email, password);

        logger.info('New user registered', { email: newUser.email, userId: newUser.id })
        
        res.status(201).json({
            user: newUser
        })
        
    } catch (err) {

        if(err.message === "USER_ALREADY_EXISTS") {
            logger.warn(`Registration attempt with existing email: ${req.body.email}`);
            return res.status(400).json({
                message: "User with this email already exists"
            })
        }

        logger.error('Error registering user:', err)
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        })

    }
}

