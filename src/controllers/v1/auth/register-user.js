import { registerUserService } from "../../../services/user/register.service.js";

export const registerUser = async (req, res) => {
    try {

        const { firstName, lastName, email, password } = req.body;

        // Call the service to register the user
        const newUser = await registerUserService(firstName, lastName, email, password);

        res.status(201).json({
            user: newUser
        })
        
    } catch (err) {

        if(err.message === "USER_ALREADY_EXISTS") {
            return res.status(400).json({
                message: "User with this email already exists"
            })
        }

        res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

// 0114472872