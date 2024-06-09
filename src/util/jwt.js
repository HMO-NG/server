import { config as env }from 'dotenv'
env({path: '../../.env'})

import jwt from 'jsonwebtoken'

export function signJWT(data, expire) {
    return jwt.sign({payload: data}, process.env.JWT_TOKEN_SECRET, {expiresIn: expire})
}

export  async function verifyJWT(token, secretKey){
    return jwt.verify(token,secretKey)
}