import { config as env } from 'dotenv'
env({ path: '../../.env' })

import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

export async function signJWT(data, expire) {
    return awaitjwt.sign({ payload: data }, process.env.JWT_TOKEN_SECRET, { expiresIn: expire })
}

export async function verifyJWT(token, secretKey) {

    return jwt.verify(token, secretKey)

}