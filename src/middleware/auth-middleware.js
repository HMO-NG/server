import { config as env } from 'dotenv'
env({ path: '../../.env' })
import { verifyJWT } from '../util/jwt.js'
import { getUserById } from '../model/user-model.js'
import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

export function auth(req, res, next) {
    //protected route should only be accessed when user is signin

    if (!req.session.remember_me) {
        res.status(401).json({
            message: "access denied, please loggin again!"
        })
        return
    }

    next()
}

/*
verify user token
is unverified users allowed to access the endpoint?
*/
export async function verifyUserToken(req, res, next) {

    try {
        const authorizationToken = req.headers.authorization;

        const token = authorizationToken?.split("Bearer ")[1];

        if (!token) {
            return res.status(401).json({
                message: "no token available"
            });
        }

        const result = await verifyJWT(token, process.env.JWT_TOKEN_SECRET)

        const user = await getUserById(result.payload.id);

        if (!user) {
            return res.status(401).json({ error: "invalid user" });
        }

        // set the role to the req obj
        req.role = result.payload.role;

        return next()

    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            res.status(401).json({ message: "token either incorrect/tempered with or has expired" });
        } else {
            res.status(500).json({ error: "Something went wrong!" });
        }
    }
};


// check roles and permissions
export function verifyPermission(roles) {
    return async function (req, res, next) {

        if (roles.includes(req.role)) {
            // User has one of the allowed roles, proceed to the next middleware
            return next()
        }
        // User does not have an allowed role, send a 403 response
        return res.status(403).json({ error: "You don't have the right to view this" });
    }
}

// retricted route for unverified users (email)
export function unverified(roles) {
    return async function (req, res, next) {
        // TODO routes this middlewares will not be accessable by users who haven't verified their email
    }
}




