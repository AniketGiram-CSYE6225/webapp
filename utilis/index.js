import bcrypt from 'bcrypt'
const saltRounds = 10

export const generateHash = async (password) => { 
    return await bcrypt.hash(password, saltRounds)
}

export const checkHashedPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

export const decodeBase64 = (data) => {
    return Buffer.from(data, 'base64').toString().split(":")
}
