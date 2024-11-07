import 'dotenv/config'
import express from 'express'
import router from './route.js'
import KnexSessionStore from 'connect-session-knex'
import morgan from 'morgan'
import knex from "knex";
import config from "./knexfile.js";
import cors from "cors";



import session from 'express-session'

import exceptionMiddleware from './middleware/exception-middleware.js'
// KnexSessionStore(session)

let db = knex(config[process.env.NODE_ENV || 'development']);

const knexSession = KnexSessionStore(session);
const store = new knexSession({
    tablename: 'sessions',
    sidfieldname: 'session_id',
    knex: db,
    createtable: true,
    clearInterval: 30000,

})

const app = express()

app.use(cors());

// middleware to parse json from req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// session
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1800000 //30 minutes
        },
        store
    })
)
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))

// your solution triggers the db tables during the health check, health should always be here, consider making the change
app.get('/health', async (req, res) => {
    res.send('ok');
})

// finding a way to do migration, prod ready
app.get('/migrate', async (req, res) => {
    try {
        await db.migrate.latest();
    } catch (e) {
        console.error('migration err', e);
    } finally {
        console.log('Migrations completed');
        res.send('Migrations completed');
    }
})
if (process.env.NODE_ENV === 'development') {
    app.use('/api/v1', router)
} else {
    app.use('/v1', router)
}
app.use(exceptionMiddleware)

export default app;