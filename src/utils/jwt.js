import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'

export const generateToken = (data) => {
    const token = jwt.sign(data, config.JSON_SECRET_KEY, {expiresIn: '1h'})
    return token
}

export const generateRefreshToken = (data) => {
    const refreshToken = jwt.sign(data, config.REFRESH_TOKEN_KEY, {expiresIn: '7d'})

    return refreshToken
}

export const verifyToken = (token) => {
    const decoded = jwt.verify(token, config.JSON_SECRET_KEY)

    return decoded
}

export const verifyRefreshToken = (token) => {
    const decoded = jwt.verify(token, config.REFRESH_TOKEN_KEY)
    return decoded
}