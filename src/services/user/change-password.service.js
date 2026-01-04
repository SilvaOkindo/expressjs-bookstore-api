import { prisma } from '../../lib/prisma.js'
import { comparePasswords } from '../../utils/compare-passwords.js'
import { hashPassword } from '../../utils/hash-password.js'

export const changePasswordService = async (userId, password, newPassword , confirmPassword) => {
    try {

        const user = await prisma.user.findUnique({where: {id: userId}})

        if(!user) {
            throw new Error('USER_NOT_FOUND')
        }

        const isMatch = await comparePasswords(password, user.password)

        if(!isMatch) {
            throw new Error('WRONG_PASSWORD')
        }

        if(newPassword !== confirmPassword) {
            throw new Error('PASSWORD_NOT_MATCH')
        }

        await prisma.user.update({where: {id: user.id}, data: {
            password: await hashPassword(newPassword)
        }})

        return 'Password changed successfully'
    } catch (error) {
            throw error;
    }
}