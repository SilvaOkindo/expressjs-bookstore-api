import bcrypt from 'bcrypt'

export const comparePasswords = async (plainPassword, hashedPassword) => {

    return  await bcrypt.compare(plainPassword, hashedPassword)
}